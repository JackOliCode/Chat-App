import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat, Bubble } from "react-native-gifted-chat";


const Chat = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const { name } = route.params; //access name passed from Screen1
    const { color } = route.params;

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

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []); // empty array passed so that useEffect only called once

    useEffect(() => {
      setMessages([
        { // Messages must follow a certain format to work with the Gifted Chat library: ID, a creation date, and a user object //
          _id: 1, 
          text: "Hiya Boss",
          createdAt: new Date(),
          user: { // object likewise, requires a user ID, name, and avatar
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
          sent: true,
          received: true
        },
        {
          _id: 2,
          text: 'This is the start of the chat',
          createdAt: new Date(),
          system: true,
        }
      ]);
    }, []);
                      // ---------------------- onSend function ----------------------//
    const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }
                      // ----------------------- render below ----------------------//
    return (
      <View style={[{flex: 1}, {backgroundColor: color}]}>
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    )}

export default Chat;