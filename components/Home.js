import { StyleSheet, View, Text, Button, TextInput, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { getAuth, signInAnonymously } from "firebase/auth";

//const image = {source:"./assets/BackgroundImage.png"};

const Home = ({navigation}) => {
    const auth = getAuth();
    const [name, setName] = useState(''); // set state for name
    const [color, setColor] = useState('#757083')

    const signInUser = () => {
        signInAnonymously(auth) //returns a promise,
        .then(result => {
            navigation.navigate('Chat', { name: name, color: color, userID: result.user.uid });
            Alert.alert("You're ready to chat!");
        })
        .catch((error) => {
            Alert.alert("Oops, looks like something went wrong");
        })
    }
  
  
  return (

    <View style={styles.container}>
        <ImageBackground source={require('../assets/BackgroundImage.png')}  style={[styles.image, styles.container]}>
            <View style={styles.titleWrap}>
                <Text style={styles.titleText}>Hear-Say</Text>
            </View>
            <View style={styles.inputButtonWrap}>
                <TextInput 
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder='Your Name'
                />
                
                <View style={styles.bgColorWrap}>
                    <Text style={styles.bgColorText}>Choose Background Color:</Text>
                        
                    <View style={styles.colorButtonContainer}>
                        <TouchableOpacity
                        style={[styles.colorButton, { backgroundColor: "#132A13" }]}
                        onPress={() => setColor("#132A13")}
                        accessible={true}
                        accessibilityLabel="Set Chat background to Green"
                        accessibilityHint="Lets you choose to set Chat background to Green."
                        accessibilityRole="button"
                        ></TouchableOpacity>
                        <TouchableOpacity
                        style={[styles.colorButton, { backgroundColor: "#49306B" }]}
                        onPress={() => setColor("#49306B")}
                        accessible={true}
                        accessibilityLabel="Set Chat background to Purple"
                        accessibilityHint="Lets you choose to set Chat background to Purple."
                        accessibilityRole="button"
                        ></TouchableOpacity>
                        <TouchableOpacity
                        style={[styles.colorButton, { backgroundColor: "#087E8B" }]}
                        onPress={() => setColor("#087E8B")}
                        accessible={true}
                        accessibilityLabel="Set Chat background to Teal"
                        accessibilityHint="Lets you choose to set Chat background to Teal."
                        accessibilityRole="button"
                        ></TouchableOpacity>
                        <TouchableOpacity
                        style={[styles.colorButton, { backgroundColor: "#757083" }]}
                        onPress={() => setColor("#757083")}
                        accessible={true}
                        accessibilityLabel="Set Chat background to Gray"
                        accessibilityHint="Lets you choose to set Chat background to Gray."
                        accessibilityRole="button"
                        ></TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={signInUser} //added object name as 2nd parameter, this is data for screen2/chat
                    style={[{ backgroundColor: color}, styles.chatButton]}>
                    <Text style={styles.chatText}>Start Chatting</Text>
                </TouchableOpacity>    
            </View>
        </ImageBackground>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
    titleWrap: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',

      },
    inputButtonWrap: {
        backgroundColor: '#FFF',
        height: '44%',
        width: '88%',
        justifyContent: 'center',
        marginBottom: 15,
        alignItems: 'center'
    },
    textInput: {
        width: "88%",
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 50,
        flex: 1,
        justifyContent: 'center',
      },
    bgColorWrap: {
        flex: 3,
        justifyContent: 'space-evenly',
        width: '88%'
    },

    bgColorText: {
        fontSize: 16,
        fontWeight: '300',
    },
    colorButtonContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
      },
    colorButton: {
        backgroundColor: "black",
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 15
      },

    chatButton: {
        width: '88%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    chatText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600'
    }
   });
   
export default Home;