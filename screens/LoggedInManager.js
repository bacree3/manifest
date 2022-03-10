import { StyleSheet} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Journal from './Journal';
import Connect from './Connect';
import Goals from './Goals';
import Mood from './Mood';
import React from 'react';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator initialRouteName="Journal" activeColor="#e91e63" barStyle={{ backgroundColor: 'tomato' }}>
            <Tab.Screen name="Journal" component={Journal}
            options={{
                tabBarLabel: 'Journal',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
            />
            <Tab.Screen name="Connect" component={Connect}
            options={{
                tabBarLabel: 'Connect',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell" color={color} size={26} />
                ),
            }}
            />
            <Tab.Screen name="Goals" component={Goals}
            options={{
                tabBarLabel: 'Goals',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="clipboard-list" color={color} size={26} />
                ),
            }}
            />
            <Tab.Screen name="Mood" component={Mood}
            options={{
                tabBarLabel: 'Mood',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }}
            />
      </Tab.Navigator>
    );
  }



const LoggedInManager = () => {
  return (
      <MyTabs />
  );
};

export default LoggedInManager;

const styles = StyleSheet.create({});
