import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CheckIn from '../Wellness/CheckIn';


const Stack = createStackNavigator();

export default function Home() {

  const navigation = useNavigation();
  const [marketOpen, setMarketOpen] = useState(null);

 

  const HomeComponent = () => {

    const navigateDailyQuiz = () => {
      navigation.navigate('DailyCheckIn');
      
    };

    const makeDBQuery = async () => {
      var query = 'https://api.polygon.io/v1/marketstatus/now?apiKey=EepXZYpz1RiHneHcnRHQupa8To6g53Dv'
      
      var data;

      try {
          data = await axios.get(query)
          .then(response => {

              toast.show('The market is ' + response.data.market, {
                  type: 'success',
                  position: 'top',
                  duration: 10000,
                  offset: 30,
                  animationType: 'slide-in'
            });
              
              
              if (response.data.market == 'closed') {
                  setMarketOpen(false);
              } else {
                  setMarketOpen(true);
              }
          })
      } catch (error) {
          alert(error)
      }

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>You are now authenticated</Text>
        <Button onPress={navigateDailyQuiz()}>Take Daily Quiz</Button>
        <Button onPress={makeDBQuery()}>Take Daily Quiz</Button>
      </SafeAreaView>
    )
    
    }
    
  }

  return (
      <Stack.Navigator 
        screenOptions={{
            headerStyle: {
              backgroundColor: '#BDE3DF'
            },
            headerTintColor: '#fff'
        }} initialRouteName="Home">

          <Stack.Screen name="Home" options={{headerShown: false}} component={HomeComponent} />
          <Stack.Screen name="DailyCheckIn" component={CheckIn} />
      </Stack.Navigator>
      
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BDE3DF',
    marginTop: 20,
    marginBottom: 50
  },
  nav: {
      flexDirection: 'row',
  },
});
