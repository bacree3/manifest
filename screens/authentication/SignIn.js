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
            <Text style={styles.title}>M A N i F E S T</Text>
        </View>

        <View style={styles.inputsContainer}>
            <Input
                placeholder='Email'
                value={email}
                onChange={(email) => setEmail(email)}
                style={styles.input}
                autoCompleteType="email"
                autoCapitalize="none"
                autoFocus
                keyboardType="email-address"
            />
            <Input
                placeholder='Password'
                value={password}
                onChange={(password) => setPassword(password)}
                style={styles.input}
                autoFocus
                secureTextEntry
             />
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

        <View style={styles.outlinedButtonContainer}>
            <TouchableOpacity style={styles.password} onPress={() => navigation.navigate('ForgetPassword')} >
                <Text style={styles.password}>Forgot Password?</Text>
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
      backgroundColor: '#F8F8F8',
      alignItems: 'center',
      justifyContent: 'center',
  },
  inputsContainer: {
      width: '80%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#BDE3DF',
    marginBottom: 30
  },
  input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 5,
      marginBottom: 15,
      borderColor: '#ffffff',
      borderWidth: 1,
  },
  buttonContainer: {
      width: '80%',
      display: 'flex',
      marginTop: 10,
  },
  button: {
      backgroundColor: '#ABE3DD',
      width: '100%',
      padding: 10,
      borderRadius: 10,
      borderColor: '#ffffff',
      alignItems: 'center',
  },
  buttonText: {
      color: 'white',
      fontSize: 18,
  },
  password: {
    marginTop: 5,
    color: '#4A4A4A',
  },
  outlinedButton: {
      backgroundColor: 'white',
      borderColor: '#ABE3DD',
      borderWidth: 1,
      marginTop: 5,
  },
  buttonOutlinedText: {
      color: '#ABE3DD',
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
