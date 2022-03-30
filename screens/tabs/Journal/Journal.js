import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import User from '../../../User';
import { JournalEntry } from '../../../Database';


const Stack = createStackNavigator();
const uid = 0;
const datetime = 1;
const category = 2;
const message = 3;
const title = 4;



export default function Journal() {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState();
  const [entries, setEntries] = useState([]);

  let journal = new JournalEntry();

  function loadEntries() {
    try {
      let user = new User();
      user.getUserInfo().then(response => {
          setUserInfo(response.attributes);
          let db_entries = journal.getAll(response.attributes.sub);
          db_entries.then(response => {
            let formatted_entries = []
            for(let i = 0; i < response.data.length; i++) {
              formatted_entries.push([{
                uid: response.data[i][uid],
                datetime: response.data[i][datetime],
                category: response.data[i][category],
                title: response.data[i][title],
                message: response.data[i][message]
              }])
            }
            setEntries(formatted_entries);
          })
      })
  } catch (e) {
      alert(e)
  }
}

  useEffect(()=>{
      loadEntries();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      loadEntries();
    }, [])
  );


  const JournalComponent = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>J O U R N A L    E N T R I E S</Text>
        <Pressable style={styles.add} onPress={() => navigation.navigate('Entry')}><Text style={styles.addText}>Add Entry</Text></Pressable>
        {entries.map((entry, i) => (
          <View key={i}>
          <Pressable style={styles.entry} onPress={() => navigation.navigate('Entry', {entry: entry[0]})}><Text style={styles.entryText}>{entry[0].title}</Text></Pressable>
          </View>
        ))}
      </View>
    )
  }

  function Entry({route, navigation}) {
    const [title, setTitle] = useState("");
    const [entry, setEntry] = useState("");
    const [datetime, setDateTime] = useState();
    const [category, setCategory] = useState("blank");
    const [userInfo, setUserInfo] = useState("");
    const [entries, setEntries] = useState("");
    const [edit, setEdit] = useState(true)
  
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
      },
      title: {
        fontSize: 23,
        fontWeight: 'bold',
        margin: 20
      },
      entry: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 50,
        fontSize: 16
      },
      actionContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between'
      },
      action: {
        backgroundColor: '#BDE3DF',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 50,
        marginLeft: 20,
        marginRight: 20
      },
      delete: {
        backgroundColor: '#ffffff',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 4,
        marginRight: 20,
        marginBottom: 50
      },
      nav: {
        flexDirection: 'row',
        justifyContent: 'center'
      },
      });
  
    let journal = new JournalEntry();
  
    useEffect(()=>{
        try {
            let user = new User();
            let userInfo = user.getUserInfo();
            userInfo.then(response => {
                setUserInfo(response.attributes);
            })
            console.log(route.params)
            if (route.params !== undefined) {
              setTitle(route.params.entry.title)
              setEntry(route.params.entry.message)
              setDateTime(route.params.entry.datetime)
              setCategory(route.params.entry.category)
              setEdit(false)
            }
        } catch (e) {
            alert(e)
        }
    }, [])
  
    const editEntry = () => {
      setEdit(!edit)
    }
    const deleteEntry = async () => {
      await journal.delete(userInfo.sub, datetime).then(response => {
        console.log("Journal entry was deleted.");
      })
      setEdit(!edit)
      loadEntries();
      navigation.navigate('Journal')
    }
    const saveEntry = async () => {
      setEdit(!edit)
      if (route.params === undefined) {
        await journal.add(userInfo.sub, category, title, entry).then(response => {
          console.log(response);
          console.log("Journal entry added.");
        })
      } else {
        await journal.edit(userInfo.sub, title, entry, datetime).then(response => {
          console.log("Journal entry was edited.");
        })
      }
      loadEntries();
      navigation.navigate('Journal')
    }
    return (
        <View style={styles.container}>
            {edit ?
            <View>
                <TextInput
                  style={styles.title}
                  onChangeText={(title) => setTitle(title)}
                  value={title}
                  placeholder="Title"
                  multiline
                />
                <TextInput
                  style={styles.entry}
                  onChangeText={(entry) => setEntry(entry)}
                  placeholder="Enter Text Here"
                  value={entry}
                  multiline
                />
                <Pressable style={styles.action} onPress={saveEntry}><Text>Save</Text></Pressable></View> :
                <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.entry}>{entry}</Text>
                <View style={styles.actionContainer}>
                    <Pressable style={styles.action} onPress={editEntry}><Text>Edit</Text></Pressable>
                    <Pressable style={styles.delete} onPress={deleteEntry}><Text>Delete</Text></Pressable>
                </View></View>
            }
        </View>
    )
  }

  return (
    <Stack.Navigator initialRouteName="Journal">

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
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginTop: 100,
    marginBottom: 30
  },
  add: {
    borderWidth: 3,
    borderColor: '#D6DEE5',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  addText: {
    color: '#4A4A4A',
    fontWeight: 'bold'
  },
  entry: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 4,
    backgroundColor: '#BDE3DF',
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
  entryText: {
    fontSize: 16
  }
});

Journal.getInitialProps = async () => {
  let user = new User();
  let userInfo = user.getUserInfo();

  userInfo.then(response => {
      return response;
  })

  // return userInfo
}
