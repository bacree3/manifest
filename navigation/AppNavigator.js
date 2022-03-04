import { StyleSheet} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Journal from '../screens/Journal';
import Connect from '../screens/Connect';
import Goals from '../screens/Goals';
import Mood from '../screens/Mood';
import React from 'react';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator initialRouteName="Journal" activeColor="#007a74" barStyle={{ backgroundColor: '#BDE3DF' }}>
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



const AppNaviagtor = () => {
  return (
      <MyTabs />
  );
};

export default AppNaviagtor;

const styles = StyleSheet.create({});
