import { View, Text, Keyboard, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import db from '../config/config';
import { collection, addDoc } from "firebase/firestore"; 

const NoteAdd = () => {

  const [title, setTitle] = useState(''); 
  const [note, setNote] = useState(''); 

  async function handleAdd(){
    // pegar as duas variaveis e passar pro banco
    const docRef = await addDoc(collection(db, 'notes'), {
      title: title,
      note: note,
    });
    Keyboard.dismiss();
  }

  return (
    <View style={ styles.container }>
      <TextInput 
        placeholder = 'title'
        value = {title}
        onChangeText = {(text) => setTitle(text)}
        style = { styles.inputTitle }
      />

      <TextInput 
        placeholder = 'note'
        value = {note}
        onChangeText = {(text) => setNote(text)}
        style = { styles.inputNote }
      />

      <TouchableOpacity 
      style={ styles.button } 
      onPress={handleAdd} 
      >
        <Text style={ styles.buttonText }>Add</Text>
      </TouchableOpacity>

    </View>
  )
}

export default NoteAdd

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