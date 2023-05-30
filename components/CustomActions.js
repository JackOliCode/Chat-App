import { StyleSheet, View, Text, Button, TextInput, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet';


const CustomActions= ({ wrapperStyle, iconTextStyle }) => {
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
                  console.log('user wants to pick an image');
                  return;
                case 1:
                  console.log('user wants to take a photo');
                  return;
                case 2:
                  console.log('user wants to get their location');
                default:
              }
            },
          );
        };
    


    return (
            <TouchableOpacity style={StyleSheet.container} onPress={onActionPress}>
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