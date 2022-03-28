import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import User from '../../../User';
import { JournalEntry } from '../../../Database';

export default function Entry({route, navigation}) {
    const [title, setTitle] = useState("");
    const [entry, setEntry] = useState("");
    const [datetime, setDateTime] = useState();
    const [category, setCategory] = useState("blank");
    const [userInfo, setUserInfo] = useState("");
    const [edit, setEdit] = useState(true)

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
      navigation.push('Journal')
    }
    return (
        <ScrollView style={styles.container}>
            {edit ?
            <ScrollView>
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
                <Pressable style={styles.action} onPress={saveEntry}><Text>Save</Text></Pressable></ScrollView> :
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
