import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  useColorScheme
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { addNote, updateNote } from '../state/actions';
import { darkTheme, lightTheme } from './theme';

const NoteForm = (props) => {
  const { isEditing, id, noteTitle, noteContent, setNoteModalVisible } = props;
  const [editMode, setEditMode] = useState(isEditing);
  const [title, setTitle] = useState(noteTitle || '');
  const [content, setContent] = useState(noteContent || '');

  const theme = useColorScheme();

  const dispatch = useDispatch();
  var notes = useSelector((state) => state.notes);

  const EditIcon = () => {
    return (
      <Icon name='create-outline' size={35} color={theme === 'dark' ? darkTheme.text : lightTheme.text} />
    );
  };

  return (
    <SafeAreaView style={[styles.root, theme === 'dark' ? styles.darkbackground : styles.lightbackground]}>
      <View style={styles.heading}>
        <TextInput
          style={[styles.title, theme === 'dark' ? styles.darkinput : styles.lightinput]}
          placeholder='Title'
          placeholderTextColor={theme === 'dark' ? darkTheme.text : lightTheme.text}
          value={title}
          onChangeText={setTitle}
          maxLength={50}
          editable={editMode}
          onFocus={() => {
            if (title === 'Untitled') {
              setTitle('');
            }
          }}
        />
        <Pressable 
          style={{marginLeft: 'auto', marginRight: 'auto'}}
          onPress={() => {
            if (editMode) {
              // if note exists, then update
              if (notes[id]) {
                if (title.length === 0) {
                  dispatch(updateNote(id, 'Untitled', content));
                } else {
                  dispatch(updateNote(id, title, content));
                }
              } else {
                // add new note
                if (title.length === 0) {
                  dispatch(addNote(id, 'Untitled', content));
                } else {
                  dispatch(addNote(id, title, content));
                }
              }
              setNoteModalVisible(false);
            } else {
              // enter edit mode
              setEditMode(!editMode);
            }
          }}
        >
          {editMode ? <Text style={[styles.buttontext, theme === 'dark' ? styles.darktext : styles.lighttext]}>Save</Text> : <EditIcon />}
        </Pressable>
      </View>
      <View style={styles.body}>
        <TextInput
          style={[styles.content, theme === 'dark' ? styles.darkinput : styles.lightinput]}
          value={content}
          multiline={true}
          onChangeText={setContent}
          maxLength={500}
          editable={editMode}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
  },
  heading: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    height: 50,
    width: '75%',
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
  },
  buttontext: {
    fontSize: 20,
  },
  body: {
    flex: 8,
  },
  content: {
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    height: '95%',
    textAlignVertical: 'top',
  },
  darkbackground: {
    backgroundColor: darkTheme.background,
  },
  lightbackground: {
    backgroundColor: lightTheme.background,
  },
  darktext: {
    color: darkTheme.text,
  },
  lighttext: {
    color: lightTheme.text,
  },
  darkinput: {
    backgroundColor: darkTheme.foreground,
    color: darkTheme.text,
  },
  lightinput: {
    backgroundColor: lightTheme.foreground,
    color: lightTheme.text,
  },
});

export default NoteForm;
