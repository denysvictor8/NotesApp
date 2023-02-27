import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { doc, updateDoc } from "firebase/firestore";

import db from '../config/config';

const Detail = ({route}) => {

    const navigation = useNavigation(route);
    const [noteText, setNote] = useState(route.params.item.note);
    const [noteTitle, setTitle] = useState(route.params.item.title);
    const [noteId] = useState(route.params.item.id);
    
    async function updateNote() {
        const docRef = doc(db, "notes", noteId);
        await updateDoc(docRef, {
          title: noteTitle,
          note: noteText
        }).then(() => {
          navigation.navigate('Home')
        }).catch(error => {
          alert(error);
        })
    }
    
    const handleUpdate = () => {
      if (noteTitle && noteText.length > 0) {
          updateNote();
        }
    };

    return (
        <View style={ styles.container }>
        <TextInput 
          placeholder = 'title'
          value = {noteTitle}
          onChangeText = {(text) => setTitle(text)}
          style = { styles.inputTitle }
        />
  
        <TextInput 
          placeholder = 'note'
          value = {noteText}
          onChangeText = {(text) => setNote(text)}
          style = { styles.inputNote }
        />
  
        <TouchableOpacity 
        style={ styles.button } 
        onPress={handleUpdate} 
        >
          <Text style={ styles.buttonText }>Edit Note</Text>
        </TouchableOpacity>
  
      </View>
    )

}

export default Detail

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#c9f5d9',
    },
    inputTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 20,
      height: 20,
      width: '97%',
      borderBottomWidth: 1/2,
      borderLeftWidth: 1/2,
      padding: 1
    },
    inputNote: {
      fontSize: 18,
      marginTop: 20,
      marginBottom: 20,
      height: 200,
      width: '97%',
      borderBottomWidth: 1/2,
      borderLeftWidth: 1/2,
      padding: 10
    },
    button: {
      backgroundColor: '#c9f',
      borderRadius: 10,
      marginTop: 20,
      height: 55,
      width: 150,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 7,
      shadowColor: 'blue'
    },
    buttonText: {
      color: 'black',
      fontSize: 22,
      fontWeight: 'bold',
    }
  
  })