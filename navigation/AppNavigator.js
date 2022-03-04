import { StyleSheet} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from  '../screens/tabs/Home';
import Journal from '../screens/tabs/Journal';
import Connect from '../screens/tabs/Connect';
import HealthData from '../screens/tabs/HealthData';
import Profile from '../screens/tabs/Profile';

import Goals from '../screens/Goals';
import Mood from '../screens/Mood';

import {StyleSheet} from 'react-native';
import React from 'react';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator initialRouteName="Home" activeColor="#007a74" barStyle={{ backgroundColor: '#BDE3DF' }}>
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
            <Tab.Screen name="HealthData" component={HealthData}
            options={{
                tabBarLabel: 'Health Data',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="heart" color={color} size={26} />
                ),
            }}
            />
            <Tab.Screen name="Community" component={Connect}
            options={{
                tabBarLabel: 'Community',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell" color={color} size={26} />
                ),
            }}
            />
            <Tab.Screen name="Profile" component={Profile}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
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
