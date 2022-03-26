import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  text: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    color: '#BDE3DF',
    marginTop: 20,
    marginBottom: 20
  },
  message: {
      textAlign: 'center',
      marginLeft: 20,
      marginRight: 20
  },
  header: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 8,
      marginBottom: 8,
      marginLeft: 20
  },
  online: {
      marginLeft: 20,
      marginBottom: 4
  },
  orgContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 4
  },
  org: {
      fontWeight: '600'
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50
  },
});

export default function Resources() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>O T H E R     R E S O U R C E S</Text>
      <Text style={styles.message}>This app does NOT replace therapy, medication, or other forms of treatment. Please stay informed about what is right for you.</Text>
      <Text style={styles.message}>If this is a life-thretening emergency, please call 911</Text>
      
      <Text style={styles.header}>Online Resources</Text>
      <Text style={styles.online} onPress={() => Linking.openURL('https://www.apa.org/topics/crisis-hotlines')}>Crisis Hotlines and Resources</Text>
      <Text style={styles.online} onPress={() => Linking.openURL('https://www.samhsa.gov/find-help/national-helpline')}>SAMHSA</Text>
      
      <Text style={styles.header}>Numbers to Call</Text>
      <View style={styles.orgContainer}>
        <Text style={styles.org}>Suicide Hotline: </Text>
        <Text onPress={() => Linking.openURL(`tel:${18002738255}`)}>1-800-273-8255</Text>
      </View>
      <View style={styles.orgContainer}>
        <Text style={styles.org}>GT Counseling Center: </Text>
        <Text onPress={() => Linking.openURL(`tel:${4048942575}`)}>404-894-2575</Text>
      </View>
      <View style={styles.orgContainer}>
        <Text style={styles.org}>GT CARE: </Text>
        <Text onPress={() => Linking.openURL(`tel:${4048943498}`)}>404-894-3498</Text>
      </View>
      <View style={styles.orgContainer}>
        <Text style={styles.org}>Stamps Health Services: </Text>
        <Text onPress={() => Linking.openURL(`tel:${4048941420}`)}>404-894-1420</Text>
      </View>
      <View style={styles.orgContainer}>
        <Text style={styles.org}>GTPD: </Text>
        <Text onPress={() => Linking.openURL(`tel:${4048942500}`)}>404-894-2500</Text>
      </View>
    </View>
  )
}
