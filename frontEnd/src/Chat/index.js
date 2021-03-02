import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import UUIDGenerator from 'react-native-uuid-generator';
import SokectIO from 'socket.io-client';
import enviarIcon from '../assets/enviarIcon.png';

export default function Chat(props) {

  const [mensagem, setMensagem] = useState('');
  const [enviar, setEnviar] = useState(0);
  const [mensagens, setMensagens] = useState([]);
  const flatlist = useRef();

  useEffect(() => {

    //é preciso cancelar a assinatura do useEffect depois da atribuição
    //das mensagens porque caso não seja cancelado, um erro será gerado.
    //Por isso foi necessário usar um isSubscribed para que no final do
    //useEffect possamos cancelar ele passando false.
    let isSubscribed = true;

    socket = SokectIO('http://10.0.0.28:3000', {
      transport: ['websocket'],
    });

    props.navigation.addListener('focus', () => {
      socket.on("todasAsMensagens", (data) => {
        if (isSubscribed) {
          setMensagens(data);
        }
      });
    })

    // setTimeout(() => {
    //   flatlist.current.scrollToEnd({
    //     animated: false
    //   });
    // }, 100);



    return () => isSubscribed = false

  }, []);

  useEffect(() => {

    socket.on("mensagemAtual", (data) => {

      if (mensagens.length) {

        if (mensagens[mensagens.length - 1].id != data.id) {
          const enviarMensagem = {
            id: data.id,
            idUsuario: data.idUsuario,
            mensagem: data.mensagem
          }
          mensagens.push(enviarMensagem)
        }

      }
    });
    console.log(mensagens)


  }, [enviar]);



  function enviarMsg() {


    setEnviar((enviar + 1).toString())

    socket.connect();

    UUIDGenerator.getRandomUUID((uuid) => {
      const enviarMensagem = {
        id: uuid,
        idUsuario: 1,
        mensagem: mensagem
      }


      socket.emit('mensagem', enviarMensagem);
      setMensagem('');
      flatlist.current.scrollToEnd({
        animated: false
      });

    });
  }

  return (


    <View style={styles.container}>

      <FlatList
        ref={flatlist}
        style={{ height: '100%' }}
        keyExtractor={item => item.id}
        data={mensagens}
        renderItem={({ item }) => (
          <>
            {mensagens.length != 0 &&
              <View key={item.id} style={{ alignItems: item.idUsuario == 1 ? 'flex-start' : 'flex-end' }}>
                <View style={[{ width: item.mensagem.length > 30 ? '70%' : null }, item.idUsuario == 1 ? styles.containerUsuario : styles.containerMotorista]}>
                  <Text style={[item.idUsuario == 1 ? styles.textoChatUsuario : styles.textoChatMotorista]}>{item.mensagem}</Text>
                </View>
              </View>
            }
          </>
        )}
      />
      <View style={styles.areaEnvioMensagem}>
        <View style={styles.areaInput}>
          <TextInput
            placeholder='Digite sua mensagem:'
            placeholderTextColor='#000'
            multiline={true}
            style={styles.input}
            value={mensagem}
            onChangeText={(text) => setMensagem(text)}
          />
        </View>
        <TouchableOpacity style={styles.submit} onPress={enviarMsg}>
          <Image source={enviarIcon} style={styles.enviarIcon} />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#a6d9fc'
  },
  areaChatBox: {
    width: '100%'
  },
  containerUsuario: {
    elevation: 5,
    padding: 10,
    margin: 10,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 35,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 10,
    backgroundColor: '#0040ff',
  },
  containerMotorista: {
    elevation: 5,
    padding: 10,
    margin: 10,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 35,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 10,
    backgroundColor: '#ebf1fe',
  },
  textoChatUsuario: {
    fontSize: 15,
    paddingLeft: 10,
    color: '#fff'
  },
  textoChatMotorista: {
    fontSize: 15,
    paddingRight: 10,
    color: '#000',
  },
  areaEnvioMensagem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a6d9fc'
  },
  areaInput: {
    width: '80%',
    height: 60,
  },
  input: {
    elevation: 5,
    paddingLeft: 15,
    borderRadius: 25,
    backgroundColor: '#f1f1f1'
  },
  submit: {
    elevation: 10,
  },
  enviarIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
});