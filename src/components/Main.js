import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal
} from 'react-native';
import { useSelector } from 'react-redux';

import NoteForm from './NoteForm';
import Card from './Card';

const Main = () => {
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  var notes = useSelector((state) => state.notes);

  const AddIcon = () => {
    return (
      <View style={styles.addbutton}>
        <Icon name='add-outline' size={35} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}> 
      <View style={styles.header}>
        <View style={{ opacity: 0 }}>
          <AddIcon />
        </View>
        <Text style={styles.headertext}>Notes</Text>
        <Pressable 
          style={{ marginLeft: 'auto' }}
          onPress={() => {
            setNoteModalVisible(!noteModalVisible);
          }}
        >
          <AddIcon />
        </Pressable>
      </View>
      <View style={styles.body}>
        <ScrollView>
          { notes.map((note) => {
            return (
              <Card key={note.id} id={note.id} title={note.title} content={note.content} />
            );
          })}
        </ScrollView>
      </View>
      <Modal 
        animationType='slide'
        visible={noteModalVisible}
        onRequestClose={() => {
          setNoteModalVisible(!noteModalVisible)
        }}
      >
        <NoteForm 
          isEditing={true}
          id={notes.length}
          noteTitle=''
          noteContent=''
          setNoteModalVisible={setNoteModalVisible} 
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headertext: {
    color: 'black',
    fontSize: 23,
    marginLeft: 'auto',
    padding: 10,
  },
  addbutton: {
    height: '100%',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 14,
  },
});

export default Main;
