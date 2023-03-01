import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { doc, updateDoc, deleteDoc } from "firebase/firestore";

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
    
    async function deleteNote() {
        const docRef = doc(db, "notes", noteId);
        await deleteDoc(docRef, {
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
    
    const handleDelete = () => {
      Alert.alert(
        //title
        'Remover',
        //body
        'Deseja remover?',
        [
          { text: 'Yes', onPress: () => deleteNote() },
          {
            text: 'No',
            onPress: () => console.log('Nao deletado'),
            style: 'cancel',
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
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

        <View style={styles.buttonView}>

          <TouchableOpacity 
          style={ styles.button } 
          onPress={handleDelete} 
          >
            <Text style={ styles.buttonDelete }>Delete Note</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={ styles.button } 
          onPress={handleUpdate} 
          >
            <Text style={ styles.buttonUpdate }>Edit Note</Text>
          </TouchableOpacity>

        </View>

  
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
      backgroundColor: '#ccc',
      borderRadius: 5,
      marginTop: 10,
      height: 50,
      width: 150,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 7,
      shadowColor: 'blue'
    },
    buttonDelete: {
      color: 'red',
      fontSize: 22,
      fontWeight: 'bold',
    },
    buttonUpdate: {
      //backgroundColor: 'yellow',
      color: '#228B22',
      fontSize: 22,
      fontWeight: 'bold',
    },
    buttonView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '97%',
    },
  
  })