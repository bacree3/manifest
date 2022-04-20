import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import User from '../../../User';
import { PromptedJournalEntry, JournalEntry } from '../../../Database';
import { Calendar } from 'react-native-calendars';


const Stack = createStackNavigator();
const uid = 0;
const datetime = 1;
const category = 2;
const message = 3;
const title = 4;
const promp_title = 2;
const q1 = 3;
const q2 = 4;
const q3 = 5;
const q4 = 6;
const q5 = 7;

export default function Journal() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState();
  const [markedDates, setMarkedDates] = useState({})

  let journal = new JournalEntry();
  let prompted_journal = new PromptedJournalEntry();

  function loadEntries() {
    try {
      let user = new User();
      let dates = {}
      user.getUserInfo().then(response => {
        setUserInfo(response.attributes);
          let db_entries = journal.getAll(response.attributes.sub);
          db_entries.then(response => {
            for(let i = 0; i < response.data.length; i++) {
              let date = new Date(response.data[i][datetime])
              let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
              let day = date.getDate()  < 10 ? '0' + date.getDate() : date.getDate()
              dates[(date.getFullYear() + '-' + month + '-' + day).toString()] = {marked: true}
            }
          })
          let db_prompted_entries = prompted_journal.getAll(response.attributes.sub);
          db_prompted_entries.then(response => {
            for(let i = 0; i < response.data.length; i++) {
              let date = new Date(response.data[i][datetime])
              let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
              let day = date.getDate()  < 10 ? '0' + date.getDate() : date.getDate()
              dates[(date.getFullYear() + '-' + month + '-' + day).toString()] = {marked: true}
            }
          })
          setMarkedDates(dates)
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
        <Calendar
          onDayPress={(date) => navigation.navigate('Daily Entry', {dateSelected: date.dateString})}
          markedDates={markedDates}
          hideArrows={false}
          theme={{
            arrowColor: '#BDE3DF',
            dotColor: '#BDE3DF',
            todayBackgroundColor: '#BDE3DF',
            todayTextColor: 'black',
            selectedBackgroundColor: '#BDE3DF',
            selectedTextColor: 'black'
          }}
        />
        <View style={styles.addButtons}>
          <Pressable style={styles.add} onPress={() => navigation.navigate('Entry')}><Text style={styles.addText}>Add Blank Entry</Text></Pressable>
          <Pressable style={styles.add} onPress={() => navigation.navigate('Prompted Entry')}><Text style={styles.addText}>Add Prompted Entry</Text></Pressable>
        </View>
      </View>
    )
  }

  function DayEntry({route, navigation}) {
    const [userInfo, setUserInfo] = useState();
    const [entries, setEntries] = useState([]);
    const [promptedEntries, setPromptedEntries] = useState([]);

    let journal = new JournalEntry();
    let prompted_journal = new PromptedJournalEntry();

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
        marginBottom: 30
      },
      add: {
        backgroundColor: '#BDE3DF',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 20,
      },
      addText: {
        color: '#4A4A4A',
        fontWeight: 'bold'
      },
      addButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      },
      entry: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 4,
        borderWidth: 3,
        borderColor: '#D6DEE5',
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

    function loadEntriesByDate() {
      try {
        let user = new User();
        user.getUserInfo().then(response => {
            setUserInfo(response.attributes);
            let db_entries = journal.getByDate(response.attributes.sub, route.params.dateSelected);
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
            let db_prompted_entries = prompted_journal.getByDate(response.attributes.sub, route.params.dateSelected);
            db_prompted_entries.then(response => {
              let formatted_entries = []
              for(let i = 0; i < response.data.length; i++) {
                formatted_entries.push([{
                  uid: response.data[i][uid],
                  datetime: response.data[i][datetime],
                  title: response.data[i][promp_title],
                  q1: response.data[i][q1],
                  q2: response.data[i][q2],
                  q3: response.data[i][q3],
                  q4: response.data[i][q4],
                  q5: response.data[i][q5],
                }])
              }
              setPromptedEntries(formatted_entries);
            })
        })
    } catch (e) {
        alert(e)
    }
  }

    useEffect(()=>{
        loadEntriesByDate();
    }, [])

    useFocusEffect(
      React.useCallback(() => {
        loadEntriesByDate();
      }, [])
    );
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>J O U R N A L    E N T R I E S</Text>

        {entries.map((entry, i) => (
          <View key={i}>
          <Pressable style={styles.entry} onPress={() => navigation.navigate('Entry', {entry: entry[0]})}><Text style={styles.entryText}>{entry[0].title}</Text></Pressable>
          </View>
        ))}
        {promptedEntries.map((entry, i) => (
          <View key={i}>
          <Pressable style={styles.entry} onPress={() => navigation.navigate('Prompted Entry', {entry: entry[0]})}><Text style={styles.entryText}>{entry[0].title}</Text></Pressable>
          </View>
        ))}
      </ScrollView>

    )
  }
  function Entry({route, navigation}) {
    const [title, setTitle] = useState("");
    const [entry, setEntry] = useState("");
    const [datetime, setDateTime] = useState();
    const [category, setCategory] = useState("blank");
    const [userInfo, setUserInfo] = useState("");
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
        fontSize: 16,
        height: 300
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
        <ScrollView style={styles.container}>
            {edit ?
            <KeyboardAvoidingView behavior='padding'>
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
                <Pressable style={styles.action} onPress={saveEntry}><Text>Save</Text></Pressable></KeyboardAvoidingView> :
                <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.entry}>{entry}</Text>
                <View style={styles.actionContainer}>
                    <Pressable style={styles.action} onPress={editEntry}><Text>Edit</Text></Pressable>
                    <Pressable style={styles.delete} onPress={deleteEntry}><Text>Delete</Text></Pressable>
                </View></View>
            }
        </ScrollView>
    )
  }

  function PromptedEntry({route, navigation}) {
    const [title, setTitle] = useState("");
    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [q4, setQ4] = useState("");
    const [q5, setQ5] = useState("");
    const [datetime, setDateTime] = useState();
    const [userInfo, setUserInfo] = useState("");
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
      question: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold'
      },
      entry: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        fontSize: 16,
        height: 200
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

    let journal = new PromptedJournalEntry();

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
              setQ1(route.params.entry.q1)
              setQ2(route.params.entry.q2)
              setQ3(route.params.entry.q3)
              setQ4(route.params.entry.q4)
              setQ5(route.params.entry.q5)
              setDateTime(route.params.entry.datetime)
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
        await journal.add(userInfo.sub, title, q1, q2, q3, q4, q5).then(response => {
          console.log("Journal entry added.");
        })
      } else {
        await journal.edit(userInfo.sub, title, q1, q2, q3, q4, q5, datetime).then(response => {
          console.log("Journal entry was edited.");
        })
      }
      loadEntries();
      navigation.navigate('Journal')
    }
    return (
        <ScrollView style={styles.container}>
            {edit ?
            <KeyboardAvoidingView behavior='padding'>
                <TextInput
                  style={styles.title}
                  onChangeText={(title) => setTitle(title)}
                  value={title}
                  placeholder="Title"
                  multiline
                  blurOnSubmit={true}
                />
                <Text style={styles.question}>Is there something on your mind that is bothering you?</Text>
                <TextInput
                  style={styles.entry}
                  onChangeText={(q1) => setQ1(q1)}
                  placeholder="Enter Text Here"
                  value={q1}
                  multiline
                  blurOnSubmit={true}
                />
                <Text style={styles.question}>What other perspectives can you view this situation from?</Text>
                <TextInput
                  style={styles.entry}
                  onChangeText={(q2) => setQ2(q2)}
                  placeholder="Enter Text Here"
                  value={q2}
                  multiline
                  blurOnSubmit={true}
                />
                <Text style={styles.question}>What are 3 good things that happened today?</Text>
                <TextInput
                  style={styles.entry}
                  onChangeText={(q3) => setQ3(q3)}
                  placeholder="Enter Text Here"
                  value={q3}
                  multiline
                  blurOnSubmit={true}
                />
                <Text style={styles.question}>What is something new that you learned about yourself?</Text>
                <TextInput
                  style={styles.entry}
                  onChangeText={(q4) => setQ4(q4)}
                  placeholder="Enter Text Here"
                  value={q4}
                  multiline
                  blurOnSubmit={true}
                />
                <Text style={styles.question}>Write down a self-affirmation</Text>
                <TextInput
                  style={styles.entry}
                  onChangeText={(q5) => setQ5(q5)}
                  placeholder="I am smart. I am beautiful. I am loved."
                  value={q5}
                  multiline
                  blurOnSubmit={true}
                />
                <Pressable style={styles.action} onPress={saveEntry}><Text>Save</Text></Pressable></KeyboardAvoidingView> :
                <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.question}>Is there something on your mind that is bothering you?</Text>
                <Text style={styles.entry}>{q1}</Text>
                <Text style={styles.question}>What other perspectives can you view this situation from?</Text>
                <Text style={styles.entry}>{q2}</Text>
                <Text style={styles.question}>What are 3 good things that happened today?</Text>
                <Text style={styles.entry}>{q3}</Text>
                <Text style={styles.question}>What is something new that you learned about yourself?</Text>
                <Text style={styles.entry}>{q4}</Text>
                <Text style={styles.question}>Write down a self-affirmation</Text>
                <Text style={styles.entry}>{q5}</Text>
                <View style={styles.actionContainer}>
                    <Pressable style={styles.action} onPress={editEntry}><Text>Edit</Text></Pressable>
                    <Pressable style={styles.delete} onPress={deleteEntry}><Text>Delete</Text></Pressable>
                </View></View>
            }
        </ScrollView>
    )
}

  return (
    <Stack.Navigator initialRouteName="Journal">
        <Stack.Screen name="Journal" options={{headerShown: false}} component={JournalComponent} />
        <Stack.Screen name="Entry" component={Entry} />
        <Stack.Screen name="Prompted Entry" component={PromptedEntry} />
        <Stack.Screen name="Daily Entry" component={DayEntry} />
    </Stack.Navigator>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 30
  },
  add: {
    backgroundColor: '#BDE3DF',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  addText: {
    color: '#4A4A4A',
    fontWeight: 'bold'
  },
  addButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20
  },
  entry: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: '#D6DEE5',
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
