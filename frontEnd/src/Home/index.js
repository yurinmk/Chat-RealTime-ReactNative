import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

  const navigation = useNavigation();

  function irChat() {
    navigation.navigate('Chat');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ height: 50, width: 80, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', }} onPress={irChat}>
        <Text style={{ fontSize: 20, color: '#fff', }}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});