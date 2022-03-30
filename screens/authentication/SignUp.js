/* eslint-disable no-console */
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Auth from '@aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Input from '../../components/Input';


export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [invalidMessage, setInvalidMessage] = useState(null);

  const signUp = async () => {
    const validPassword = password.length > 5 && (password === repeatPassword);
    if (validPassword) {
      setInvalidMessage(null);
      Auth.signUp({
        username: email,
        password,
        attributes: {
          email, // optional
          name,
        },
        validationData: [], // optional
      })
        .then((data) => {
          console.log(data);
          console.log('navigation: ', navigation);
          navigation.navigate('Confirmation', { email });
        })
        .catch((err) => {
          if (err.message) {
            setInvalidMessage(err.message);
          }
          console.log(err);
        });
    } else {
      setInvalidMessage('Password must be equal and have greater length than 6.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>

    <View>
        <Text style={styles.title}>M A N I F E S T</Text>
        <Text style={styles.headerText}>Please fill out all fields below</Text>
    </View>

    <View style={styles.inputsContainer}>
        <Input placeholder='Name' value={name} onChangeText={f => setName(f)} style={styles.input} />
        <Input placeholder='Email' value={email} onChangeText={e => setEmail(e)} style={styles.input} autoCompleteType="email" keyboardType="email-address" autoCapitalize="none"/>
        <Input placeholder='Password' value={password} onChangeText={p => setPassword(p)} style={styles.input} secureTextEntry autoCompleteType="password"/>
        <Input placeholder='Confirm Password' value={repeatPassword} onChangeText={p => setRepeatPassword(p)} style={styles.input} secureTextEntry autoCompleteType="password"/>

    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => signUp()} >
            <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

    </View>
    <Text>
        {invalidMessage}
      </Text>
    </KeyboardAvoidingView>
  );

  <Stack.Navigator initialRouteName="Journal">
      <Stack.Screen name="SignIn" options={{headerShown: false}} component={JournalComponent} />
  </Stack.Navigator>
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#BDE3DF',
    marginBottom: 20,
    textAlign: 'center'
  },
  headerText: {
      fontSize: 15,
      marginBottom: 15,
      textAlign: 'center',
      color: '#4A4A4A',
  },
  text: {
      fontSize: 20,
      padding: 30,
      marginTop: 10,
      textAlign: 'center',
  },
  inputsContainer: {
      width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  buttonContainer: {
      width: '60%',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',


  },
  button: {
      backgroundColor: '#ABE3DD',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
  },
  buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '700',

  },
  outlinedButton: {
      backgroundColor: 'white',
      borderColor: '#00ad9b',
      borderWidth: 1,
      marginTop: 60,
  },
  buttonOutlinedText: {
      color: '#00ad9b',
      fontSize: 18,
      fontWeight: '700',
  },
  darkModeText: {
      color: 'white',

  },

});
