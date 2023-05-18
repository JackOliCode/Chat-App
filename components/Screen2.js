import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';

const Screen2 = ({ route, navigation }) => {

    const { name } = route.params; //access name passed from Screen1
    const { color } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []); // empty array passed so that useEffect only called once

 return (
   <View style={[{ backgroundColor: color}, styles.container]}>
     <Text>Hello Screen2!</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Screen2;