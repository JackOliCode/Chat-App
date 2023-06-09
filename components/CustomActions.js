import { StyleSheet, View, Text, Button, TextInput, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CustomActions= ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
    const actionSheet = useActionSheet();

    /*onActionPress starts here
        function displays an action menu that contains four options = an ActionSheet
        when user selects one of these actions, a method for performing that action is called
        */

    const onActionPress = () => {
        const options = ['Choose Image from Gallery', 'Take Picture', 'Send Location', 'Cancel']; //four options

        const cancelButtonIndex = options.length -1;
        actionSheet.showActionSheetWithOptions(
            {
              options,
              cancelButtonIndex,
            },
            async (buttonIndex) => {
              switch (buttonIndex) {
                case 0:
                    pickImage();
                    return;
                case 1:
                    takePhoto();
                    return;
                case 2:
                    getLocation();
                default:
              }
            },
          );
        };
    

        // getLocation //

        const getLocation = async () => {
            let permissions = await Location.requestForegroundPermissionsAsync();
            if (permissions?.granted) {
              const location = await Location.getCurrentPositionAsync({});
              if (location) {
                onSend({
                  location: {
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                  },
                });
              } else Alert.alert("Error occurred while fetching location");
            } else Alert.alert("Permissions haven't been granted.");
          }

          //upload and send function

          const uploadAndSendImage = async (imageURI) => {
            const uniqueRefString = generateReference(imageURI);
            const newUploadRef = ref(storage, uniqueRefString);
            const response = await fetch(imageURI);
            const blob = await response.blob();
            uploadBytes(newUploadRef, blob).then(async (snapshot) => {
              const imageURL = await getDownloadURL(snapshot.ref)
              onSend({ image: imageURL })
            });
          }


        // pickImage //

        const pickImage = async () => {
            let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissions?.granted) {
              let result = await ImagePicker.launchImageLibraryAsync();
              if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
              else Alert.alert("Permissions haven't been granted.");
            }
          }
          
        
        // takePhoto //

        const takePhoto = async () => {
            let permissions = await ImagePicker.requestCameraPermissionsAsync();
            if (permissions?.granted) {
              let result = await ImagePicker.launchCameraAsync();
              if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
              else Alert.alert("Permissions haven't been granted.");
            }
          }

          const generateReference = (uri) => {
            const timeStamp = (new Date()).getTime();
            const imageName = uri.split("/")[uri.split("/").length - 1];
            return `${userID}-${timeStamp}-${imageName}`;
          }

    return (
            <TouchableOpacity 
                style={StyleSheet.container} 
                onPress={onActionPress}
                accessible={true}
                accessibilityLabel="More options"
                accessibilityHint="Opens menu with four options - send image from gallery, take picture, send geolocation or cancel" >
                <View style={[styles.wrapper, wrapperStyle]}>
                    <Text style={[styles.iconText, iconTextStyle]}>+</Text>
                </View>
            </TouchableOpacity>


    );
}

const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
        padding: 10,
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 20,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
  });

export default CustomActions; 