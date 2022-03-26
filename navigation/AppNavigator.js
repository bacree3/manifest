
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from  '../screens/tabs/Home';
import Journal from '../screens/tabs/Journal/Journal';
import Connect from '../screens/tabs/Connect';
import Wellness from '../screens/tabs/Wellness/Wellness';
import Profile from '../screens/tabs/Profile';
import Goals from '../screens/tabs/Goals/Goals';


import {StyleSheet} from 'react-native';
import React from 'react';
import Resources from '../screens/tabs/Resources';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator initialRouteName="Home" activeColor="#007a74" barStyle={{ backgroundColor: '#FDFCFC' }}>
            <Tab.Screen name="Home" component={Home}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
            />
            <Tab.Screen name="Journal" component={Journal}
            options={{
                tabBarLabel: 'Journal',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="clipboard-list" color={color} size={26} />
                ),
            }}
            />
            <Tab.Screen name="Wellness" component={Wellness}
            options={{
                tabBarLabel: 'Wellness',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="heart" color={color} size={26} />
                ),
            }}
            />
            <Tab.Screen name="Goals" component={Goals}
            options={{
                tabBarLabel: 'Goals',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="format-list-checks" color={color} size={26} />
                ),
            }}
            />
            <Tab.Screen name="Resources" component={Resources}
            options={{
                tabBarLabel: 'Resources',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="phone" color={color} size={26} />
                ),
            }}
            />
      </Tab.Navigator>
    );
  }



const AppNaviagtor = () => {
  return (
      <MyTabs />
  );
};

export default AppNaviagtor;

const styles = StyleSheet.create({});
