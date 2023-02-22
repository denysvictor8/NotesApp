import { View, Text, Button, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'

import db from '../config/config'
import { collection, getDocs  } from "firebase/firestore";

const Home = () => {

  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function getNotes(db) {
      const notas = collection(db, 'notes');
      const citySnapshot = await getDocs(notas);
      const notasList = citySnapshot.docs.map(doc => doc.data());
      setNotes(notasList);
    }
    getNotes(db);
  }, []);
  

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <FlashList 
        data={notes} 
        numColumns={2}
        estimatedItemSize={100}
        renderItem={ ({item}) => (
          <View style={styles.noteView}>
            <Text style={styles.noteTitle}>
              {item.title}
            </Text>
            <Text style={styles.noteDescription}>
              {item.note}
            </Text>
          </View>
        )} 
      />
      <Button 
        title="Add Notes"
        onPress={() => navigation.navigate('NoteAdd')}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c9f5d9',
  },
  noteView: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 7,
    alignItems: 'center'
  },
  noteTitle:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  noteDescription: {
    fontSize: 16,
    marginTop: 5
  }
  }
)