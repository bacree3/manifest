import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/authentication/Welcome';
import SignInScreen from '../screens/authentication/SignIn';
import SignUpScreen from '../screens/authentication/SignUp';
import ForgetPasswordScreen from '../screens/authentication/ForgetPassword';
import Confirmation from '../screens/authentication/Confirmation';
import Subscription from '../screens/authentication/Subscription';

const AuthStack = createStackNavigator();
const AuthModalStack = createStackNavigator();

const AuthNavigator = ({ signIn }) => (
  <AuthModalStack.Navigator mode="modal" headerMode="none">
    <AuthModalStack.Screen name="AuthPages">
      {() => (
        <AuthStack.Navigator>

          <AuthStack.Screen name="Sign In" options={{ headerShown: false }}>
            {({ navigation }) => <SignInScreen signIn={signIn} navigation={navigation} />}
          </AuthStack.Screen>

          <AuthStack.Screen name="Sign Up" >
            {({ navigation }) => <SignUpScreen navigation={navigation} />}
          </AuthStack.Screen>

          
          <AuthStack.Screen
            name="ForgetPassword"
            component={ForgetPasswordScreen}
          />
          <AuthStack.Screen  options={{ headerShown: false }} name="Subscription" component={Subscription} />
        </AuthStack.Navigator>
      )}
    </AuthModalStack.Screen>
    <AuthModalStack.Screen options={{ headerShown: false }} name="Confirmation" component={Confirmation} />
  </AuthModalStack.Navigator>
);

export default AuthNavigator;
