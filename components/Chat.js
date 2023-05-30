import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
    const [messages, setMessages] = useState([]);
    const { name } = route.params; //access name passed from Screen1
    const { color } = route.params;
    const { userID } = route.params;

    const renderBubble = (props) => {
      return <Bubble
      {...props} //fuction starts by inheriting props keyword
      wrapperStyle={{ //new wrapperStyle
        right: {
          backgroundColor: '#000'
        },
        left: {
          backgroundColor: '#FFF'
        }
      }} 
      />
    }

      
    // -----------useEffect starts here ----//
    let unsubMessages;
    useEffect(() => {
        navigation.setOptions({ title: name }); //name at top of Chat screen
        
        if (isConnected === true) {
          if (unsubMessages) unsubMessages();
          unsubMessages = null;

        const q = query(collection(db, "messages"), orderBy("createdAt", "desc")); //creates a Firestore query using the collection function db. 
        
        unsubMessages = onSnapshot(q, (docs) => { //unsubs to snapshot changes. istens for any changes in the "messages" collection and triggers the callback function (docs)
          let newMessages = [];
          docs.forEach(doc => {
            newMessages.push({
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis())
            })
          });
          cacheMessages(newMessages)
          setMessages(newMessages);
        });
      } else loadCachedMessages();

        return () => {
          if (unsubMessages) unsubMessages();
        }
        }, [isConnected]);; // useEffect called whenever isConnected changes


    // -------- Load Cached Messages function  ----------//

    const loadCachedMessages= async () => {
      const cachedMessages = await AsyncStorage.getItem("messages") || []; // logical OR assignment operator. Will assign empty array to cachedLists
      setMessages(JSON.parse(cachedMessages));
  }


    // ------------ CacheMessages ----------------//
    const cacheMessages = async (messagesToCache) => {
      try {
        await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
      } catch (error) {
        console.log(error.message);
      }
    }

    // ------------ Hide InputToolbar if not connected ----------// 

    const renderInputToolbar = (props) => {
      if (isConnected) return <InputToolbar {...props} />;
      else return null;
     }

   
                      // ---------------------- onSend function ----------------------//
  const onSend = (newMessages) => {
     addDoc(collection(db, "messages"), newMessages[0])
  }
                    // ----------- Custom actions function -----------// 

  const renderCustomActions = (props) => {
    if (isConnected) return <CustomActions storage={storage} userID={userID}  {...props} />;
    else return null;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{width: 150,
          height: 100,
          borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

                      // ----------------------- render below ----------------------//
    return (
      <View style={[{flex: 1}, {backgroundColor: color}]}>
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          onSend={messages => onSend(messages)}
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
          user={{
            _id: userID,
            name: name
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    )}

export default Chat;