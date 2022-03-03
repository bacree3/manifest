import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Journal from '../screens/Journal';
import Connect from '../screens/Connect';
import Logs from '../screens/Wellness/Logs';
import CheckIn from '../screens/Wellness/CheckIn';
import Resources from '../screens/Wellness/Resources';
import Goals from '../screens/Goals';

const AppStack = createStackNavigator();

export default function App({ signOut }) {
  return (
    <AppStack.Navigator>
      {/* <AppStack.Screen name="Home" component={() => <Home signOut={signOut} />} /> */}
      <AppStack.Screen name="Journal" component={Journal} />
      <AppStack.Screen name="Connect" component={Connect} />
      <AppStack.Screen name="Logs" component={Logs} />
      <AppStack.Screen name="CheckIn" component={CheckIn} />
      <AppStack.Screen name="Resources" component={Resources} />
      <AppStack.Screen name="Goals" component={Goals} />
    </AppStack.Navigator>
  );
}
