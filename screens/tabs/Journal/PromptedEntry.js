import React, { useState, useEffect } from 'react';
import { Animated, View, TextInput, Text, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView  } from 'react-native';
import User from '../../../User';
import { PromptedJournalEntry } from '../../../Database';
// import Animated from 'react-native-reanimated';

export default function PromptedEntry({route, navigation}) {
    const [title, setTitle] = useState("");
    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [q4, setQ4] = useState("");
    const [q5, setQ5] = useState("");
    const [datetime, setDateTime] = useState();
    const [userInfo, setUserInfo] = useState("");
    const [edit, setEdit] = useState(true)

    // let journal = new PromptedJournalEntry();

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
    //   await journal.delete(userInfo.sub, datetime).then(response => {
    //     console.log("Journal entry was deleted.");
    //   })
      setEdit(!edit)
      navigation.navigate('Journal')
    }
    const saveEntry = async () => {
      setEdit(!edit)
    //   if (route.params === undefined) {
    //     await journal.add(userInfo.sub, title, q1, q2, q3, q4, q5).then(response => {
    //       console.log("Journal entry added.");
    //     })
    //   } else {
    //     await journal.edit(userInfo.sub, title, q1, q2, q3, q4, q5, datetime).then(response => {
    //       console.log("Journal entry was edited.");
    //     })
    //   }
      navigation.push('Journal')
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
                <Text style={styles.question}>What is on your mind that is bothering you?</Text>
                <TextInput
                  style={styles.entry}
                  onChangeText={(q1) => setQ1(q1)}
                  placeholder="Enter Text Here"
                  value={q1}
                  multiline
                />
                <Text style={styles.question}>Can you view this situation from a different perspective?</Text>
                <TextInput
                  style={styles.entry}
                  onChangeText={(q2) => setQ2(q2)}
                  placeholder="Enter Text Here"
                  value={q2}
                  multiline
                />
                <Text style={styles.question}>What are 3 good things that happened today?</Text>
                <TextInput
                  style={styles.entry}
                  onChangeText={(q3) => setQ3(q3)}
                  placeholder="Enter Text Here"
                  value={q3}
                  multiline
                />
                <Text style={styles.question}>What are you grateful for today?</Text>
                <TextInput
                  style={styles.entry}
                  onChangeText={(q4) => setQ4(q4)}
                  placeholder="Enter Text Here"
                  value={q4}
                  multiline
                />
                <Text style={styles.question}>Other thoughts, feelings, or stories:</Text>
                <TextInput
                  style={styles.entry}
                  onChangeText={(q5) => setQ5(q5)}
                  placeholder="Enter Text Here"
                  value={q5}
                  multiline
                />
                <Pressable style={styles.action} onPress={saveEntry}><Text>Save</Text></Pressable></KeyboardAvoidingView> :
                <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.entry}>{q1}</Text>
                <Text style={styles.entry}>{q2}</Text>
                <Text style={styles.entry}>{q3}</Text>
                <Text style={styles.entry}>{q4}</Text>
                <Text style={styles.entry}>{q5}</Text>
                <View style={styles.actionContainer}>
                    <Pressable style={styles.action} onPress={editEntry}><Text>Edit</Text></Pressable>
                    <Pressable style={styles.delete} onPress={deleteEntry}><Text>Delete</Text></Pressable>
                </View></View>
            }
        </ScrollView>
    )
}

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
