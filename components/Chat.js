import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat } from "react-native-gifted-chat";


const Chat = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const { name } = route.params; //access name passed from Screen1
    const { color } = route.params;

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
        },
      ]);
    }, []);
                      // ---------------------- onSend function ----------------------//
    const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }
                      // ----------------------- render below ----------------------//
    return (
      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    )}

export default Chat;