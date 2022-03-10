/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Alert, Text, KeyboardAvoidingView, TouchableOpacity
} from 'react-native';
import Auth from '@aws-amplify/auth';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { TextInput } from 'react-native-gesture-handler';

export default function SignIn({ navigation, signIn: signInCb }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signIn = async () => {
    if (email.length > 4 && password.length > 2) {
      await Auth.signIn(email, password)
        .then((user) => {
          signInCb(user);
        })
        .catch((err) => {
          if (!err.message) {
            console.log('1 Error when signing in: ', err);
            Alert.alert('Error when signing in: ', err);
          } else {
            if (err.code === 'UserNotConfirmedException') {
              console.log('User not confirmed');
              navigation.navigate('Confirmation', {
                email,
              });
            }
            if (err.message) {
              setErrorMessage(err.message);
            }
          }
        });
    } else {
      setErrorMessage('Provide a valid email and password');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>

        <View>
            <Text style={styles.title}>Manifest</Text>
        </View>
      
        <View style={styles.inputsContainer}>
            <TextInput placeholder='Email' value={email} onChangeText={e => setEmail(e)} style={styles.input} />
            <TextInput placeholder='Password' value={password} onChangeText={p => setPassword(p)} style={styles.input} secureTextEntry/>

        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={signIn} >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.outlinedButtonContainer}>
            <TouchableOpacity style={[styles.button, styles.outlinedButton]} onPress={() => navigation.navigate('Sign Up')} >
                <Text style={styles.buttonOutlinedText}>Not Registered? Make an Account Now</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  );
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  inputsContainer: {
      width: '80%',
  },
  title: {
      fontSize: 40,
      padding: 20,
      paddingBottom: 140,
      marginTop: 10,
      textAlign: 'center',
      color: '#00ad9b',
  },
  input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginBottom: 10,
      borderColor: '#00ad9b',
      borderWidth: 1,

  },
  buttonContainer: {
      width: '60%',
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center',


  },
  button: {
      backgroundColor: '#00ad9b',
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
      marginTop: 5,
  },
  buttonOutlinedText: {
      color: '#00ad9b',
      fontSize: 14,
      fontWeight: '700',
  },
  outlinedButtonContainer: {
      width: '80%',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
  }
  
});
