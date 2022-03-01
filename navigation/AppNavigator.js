import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Journal from '../screens/Journal';
import Connect from '../screens/Connect';
import Mood from '../screens/Mood';
import Goals from '../screens/Goals';

const AppStack = createStackNavigator();

export default function App({ signOut }) {
  return (
    <AppStack.Navigator>
      {/* <AppStack.Screen name="Home" component={() => <Home signOut={signOut} />} /> */}
      <AppStack.Screen name="Journal" component={Journal} />
      <AppStack.Screen name="Connect" component={Connect} />
      <AppStack.Screen name="Mood" component={Mood} />
      <AppStack.Screen name="Goals" component={Goals} />
    </AppStack.Navigator>
  );
}
