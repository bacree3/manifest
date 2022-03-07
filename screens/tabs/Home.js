import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';


export default function Home() {

  const [markeOpen, setMarketOpen] = useState("");

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
                setMarketOpen("false");
            } else {
                setMarketOpen("true");
            }
        })
    } catch (error) {
        alert(error)
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>You are now authenticated</Text>
    </SafeAreaView>
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
