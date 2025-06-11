import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const Login = 'aluno';
  const Senha = 'aluno';

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const UsuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
          if (UsuarioLogado) {
            navigation.navigate('Home');
          }
      } catch (error) {
        console.error('Erro ao verificar o login:', error);
        Alert.alert('Erro', 'Não foi possível verificar o login. Tente novamente.');}
    };

    verificarLogin();
  }, []);

  const handleLogin = () => {
    if (login === Login && senha === Senha) {
      navigation.replace('Home');
    try {
      AsyncStorage.setItem('UsuarioLogado', 'Logado');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao salvar o login:', error);
      Alert.alert('Erro ao salvar o login. Tente novamente.');
    }
    } else {
      Alert.alert('Erro', 'Login ou senha incorretos.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Login"
        style={styles.input}
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#add8e6',
    },
  input: {
    height: 50,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f2f5f7'
  }
});