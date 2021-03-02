import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/Home'
import Chat from './src/Chat'

export default function frontEnd() {

  const Stack = createStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <TouchableOpacity style={{ height: 50, width: 50, backgroundColor: '#000' }} onPress={irChat}>
    //     <Text style={{ fontSize: 20 }}>Chat</Text>
    //   </TouchableOpacity>
    // </View>
  );
}

