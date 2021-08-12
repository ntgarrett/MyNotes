import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  Alert,
  useColorScheme
} from 'react-native';
import { useDispatch } from 'react-redux';

import { deleteNote } from '../state/actions';
import NoteForm from './NoteForm';
import { darkTheme, lightTheme } from './theme';

const Card = (props) => {
  const { id, title, content } = props;
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const theme = useColorScheme();

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
        delayLongPress={250}
      >
        <View style={[styles.card, theme === 'dark' ? styles.darkcard : styles.lightcard]}>
          <Text numberOfLines={1} style={[styles.title, theme === 'dark' ? styles.textdark : styles.textlight ]}>
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
          isNewNote={false}
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
    flexDirection: 'row',
  },
  title: {
    fontSize: 19,
    padding: 13,
  },
  textdark: {
    color: darkTheme.text,
  },
  textlight: {
    color: lightTheme.text,
  },
  darkcard: {
    backgroundColor: darkTheme.foreground,
  },
  lightcard: {
    backgroundColor: lightTheme.foreground,
  },  
});

export default Card;