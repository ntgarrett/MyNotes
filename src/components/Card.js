import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';

import { deleteNote } from '../state/actions';
import NoteForm from './NoteForm';

const Card = (props) => {
  const { id, title, content } = props;
  const [noteModalVisible, setNoteModalVisible] = useState(false);

  const dispatch = useDispatch();

  const showAlert = () => 
  Alert.alert(
    'Delete this note?', 
    '',
  [
    {
      text: 'OK',
      onPress: () => dispatch(deleteNote(id))
    },
    {
      text: 'Cancel',
      onPress: () => { console.log('Cancelled')},
    },
  ],
  { cancelable: true, }
);

  return (
    <View style={styles.root}>
      <Pressable
        onPress={() => {
          setNoteModalVisible(!noteModalVisible);
        }}
        onLongPress={showAlert}
        delayLongPress={1}
      >
        <View style={styles.card}>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
      </Pressable>
      <Modal
        visible={noteModalVisible}
        onRequestClose={() => {
          setNoteModalVisible(!noteModalVisible);
        }}
      >
        <NoteForm 
          isEditing={false} 
          id={id} 
          noteTitle={title}
          noteContent={content}
          setNoteModalVisible={setNoteModalVisible} 
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  card: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  title: {
    color: 'black',
    fontSize: 19,
    padding: 15,
  },
});

export default Card;