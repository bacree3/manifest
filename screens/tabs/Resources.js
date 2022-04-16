import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecResourceCard from '../../components/RecResourceCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginTop: 50,
    marginBottom: 30,
  },
  message: {
      textAlign: 'center',
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 20,
      color: '#a84900',
      borderWidth: 5,
      fontSize: 20,
      borderColor: '#a84900',
      borderRadius: 10,
      padding: 10,
  },
  header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 8,
      marginBottom: 8,
      marginLeft: 20,
      color: '#4A4A4A',
      paddingLeft: 70,
      paddingBottom: 10,

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
  resourceCategory: {
    borderWidth: 5,
    borderColor: '#BDE3DF',
    borderRadius: 10,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#BDE3DF'
  },

});

export default function Resources() {
  return (
    <SafeAreaView style={styles.container}>

    <ScrollView style={{ height: "100%" }}>
      <Text style={styles.text}>O T H E R     R E S O U R C E S</Text>
      <Text style={styles.message}>This app does NOT replace therapy, medication, or other forms of treatment. Please stay informed about what is right for you.</Text>
      <Text style={styles.message}>If this is a life-thretening emergency, please call 911</Text>

      <Text style={styles.header}>Recommended Resources</Text>

      <ScrollView style=
          {{
              flexDirection: "row",
              padding: 20,
              paddingLeft: 12,
              paddingTop: 10
          }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => Linking.openURL('https://livesafe.gatech.edu')}>
            <RecResourceCard image={require('../../assets/livesafe_sm.jpg')} title="GT LifeSafe" caption="Direct access to GTPD resources" subtitle='Download App for free' logo={require('../../assets/gt-logo.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.headspace.com/')}>
            <RecResourceCard image={require('../../assets/headspace.png')} title="Headspace" caption="Meditation for alleviating stress" subtitle='Download App for free' logo={require('../../assets/headspacelogo.jpg')}/>
          </TouchableOpacity>
      </ScrollView>
      
      <View style={styles.resourceCategory}>
        <Text style={styles.header}>Numbers to Call</Text>
        <View style={styles.orgContainer}>
          <Text style={styles.org}>GTPD: </Text>
          <Text onPress={() => Linking.openURL(`tel:${4048942500}`)}>404-894-2500</Text>
        </View>
        <View style={styles.orgContainer}>
        <Text style={styles.org}>GT CARE: </Text>
        <Text onPress={() => Linking.openURL(`tel:${4048943498}`)}>404-894-3498</Text>
      </View>
      <View style={styles.orgContainer}>
        <Text style={styles.org}>GT Voice: </Text>
        <Text onPress={() => Linking.openURL(`tel:${4048949000}`)}>404-8949000</Text>
      </View>
      <View style={styles.orgContainer}>
        <Text style={styles.org}>Stamps Health Services: </Text>
        <Text onPress={() => Linking.openURL(`tel:${4048941420}`)}>404-894-1420</Text>
      </View>
      <View style={styles.orgContainer}>
        <Text style={styles.org}>Office of the VP and Dean of Students: </Text>
        <Text onPress={() => Linking.openURL(`tel:${4048946367}`)}>404-894-6367</Text>
      </View>
      <View style={styles.orgContainer}>
        <Text style={styles.org}>Victim-Survivor Advocate: </Text>
        <Text onPress={() => Linking.openURL(`tel:${4043854464}`)}>404-385-4464</Text>
      </View>
      <View style={styles.orgContainer}>
        <Text style={styles.org}>National Suicide Prevention Lifeline: </Text>
        <Text onPress={() => Linking.openURL(`tel:${18002738255}`)}>1-800-273-8255</Text>
      </View>
      <View style={styles.orgContainer}>
        <Text style={styles.org}>Trevor Lifeline: </Text>
        <Text onPress={() => Linking.openURL(`tel:${8664887386}`)}>866-488-7386</Text>
      </View>
      <View style={styles.orgContainer}>
        <Text style={styles.org}>GT Counseling Center: </Text>
        <Text onPress={() => Linking.openURL(`tel:${4048942575}`)}>404-894-2575</Text>
      </View>
      </View>

      

      

      <Text style={styles.header}>Further Online Resources</Text>
      <Text style={styles.online} onPress={() => Linking.openURL('https://www.apa.org/topics/crisis-hotlines')}>Crisis Hotlines and Resources</Text>
      <Text style={styles.online} onPress={() => Linking.openURL('https://www.samhsa.gov/find-help/national-helpline')}>SAMHSA</Text>
      </ScrollView>
    </SafeAreaView>
  )
}
