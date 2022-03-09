import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Entry from './Entry'

const Stack = createStackNavigator();

export default function Journal() {
  const navigation = useNavigation();
  
  const JournalComponent = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>J O U R N A L    E N T R I E S</Text>
        <Pressable style={styles.add} onPress={() => navigation.navigate('Entry')}><Text>Add Entry</Text></Pressable>
      </View>
    )
  }

  return (
    <Stack.Navigator 
      screenOptions={{
          headerStyle: {
            backgroundColor: '#BDE3DF'
          },
          headerTintColor: '#fff'
      }} initialRouteName="Journal">

        <Stack.Screen name="Journal" options={{headerShown: false}} component={JournalComponent} />
        <Stack.Screen name="Entry" component={Entry} />
    </Stack.Navigator>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BDE3DF',
    marginTop: 50,
    marginBottom: 50
  },
  add: {
    backgroundColor: '#BDE3DF',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20
  }
});
