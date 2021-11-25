import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  useColorScheme,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { addNote, updateNote } from '../state/actions';
import { useOrientation } from './Orientation';
import { darkTheme, lightTheme } from './theme';

const NoteForm = (props) => {
  const { isEditing, id, noteTitle, noteContent, isNewNote, setNoteModalVisible } = props;
  const [editMode, setEditMode] = useState(isEditing);
  const [title, setTitle] = useState(noteTitle || '');
  const [content, setContent] = useState(noteContent || '');

  const orientation = useOrientation();
  const theme = useColorScheme();

  const dispatch = useDispatch();
  var notes = useSelector((state) => state.notes);

  function handleAlerts() {
    if (editMode && isNewNote && (title.length > 0 || content.length > 0)) {
      Alert.alert(
        'Discard this note?',
        '',
        [
          {
            text: 'OK',
            onPress: () => setNoteModalVisible(false)
          },
          {
            text: 'Cancel',
            onPress: () => {}
          }
        ], { cancelable: true }
      );
    } else if (!isNewNote && (title !== noteTitle || content !== noteContent)) {
      // Presses back on an edited existing note
      Alert.alert(
        'Discard changes?',
        '',
        [
          {
            text: 'OK',
            onPress: () => setNoteModalVisible(false)
          },
          {
            text: 'Cancel',
            onPress: () => {}
          }
        ], { cancelable: true }
      );
    } else {
      // Presses back without changes
      setNoteModalVisible(false);
    } 
  };

  const EditIcon = () => {
    return (
      <Icon name='create-outline' size={35} color={theme === 'dark' ? darkTheme.text : lightTheme.text} />
    );
  };

  const BackButton = () => {
    return (
      <View style={styles.button}>
        <Pressable
          onPress={handleAlerts}
        >
          <Icon name='arrow-back-outline' size={35} color={theme === 'dark' ? darkTheme.text : lightTheme.text} />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.root, theme === 'dark' ? styles.darkBackground : styles.lightBackground]}>
      <View style={styles.header}>
        <View style={styles.rightLeftContainer}>
          <BackButton />
        </View>
        <View style={orientation === 'PORTRAIT' ? styles.centerContainerPortrait : styles.centerContainerLandscape}>
          <TextInput
            style={[styles.title, theme === 'dark' ? styles.darkInput : styles.lightInput]}
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
        </View>
        <View style={styles.rightLeftContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              if (editMode) {
                // if note exists, then update
                if (notes.find(note => note.id === id) !== undefined) {
                  if (title.length === 0) {
                    dispatch(updateNote(id, 'Untitled', content));
                  } else {
                    dispatch(updateNote(id, title, content));
                  }
                } else {
                  // add new note
                  if (title.length === 0) {
                    dispatch(addNote(id, 'Untitled', content));
                    setNoteModalVisible(false);
                  } else {
                    dispatch(addNote(id, title, content));
                    setNoteModalVisible(false);
                  }
                }
                setEditMode(!editMode);
              } else {
                // enter edit mode
                setEditMode(!editMode);
              }
            }}
          >
            {editMode ? <Text style={[styles.buttonText, theme === 'dark' ? styles.darkText : styles.lightText]}>Save</Text> : <EditIcon />}
          </Pressable>
        </View>
      </View>
      <View style={[styles.body, orientation === 'PORTRAIT' ? styles.portraitBody : styles.landscapeBody]}>
        <TextInput
          style={[styles.content, theme === 'dark' ? styles.darkInput : styles.lightInput]}
          value={content}
          multiline={true}
          onChangeText={setContent}
          maxLength={10000}
          editable={editMode}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightLeftContainer: {
    flex: 1,
  },
  centerContainerPortrait: {
    flex: 3,
  },
  centerContainerLandscape: {
    flex: 6,
  },
  title: {
    height: 45,
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  body: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  portraitBody: {
    flex: 8,
  },
  landscapeBody: {
    flex: 4,
  },
  content: {
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
    height: '95%',
    textAlignVertical: 'top',
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'center',
  },
  darkBackground: {
    backgroundColor: darkTheme.background,
  },
  lightBackground: {
    backgroundColor: lightTheme.background,
  },
  darkText: {
    color: darkTheme.text,
  },
  lightText: {
    color: lightTheme.text,
  },
  darkInput: {
    backgroundColor: darkTheme.foreground,
    color: darkTheme.text,
  },
  lightInput: {
    backgroundColor: lightTheme.foreground,
    color: lightTheme.text,
  },
});

export default NoteForm;
