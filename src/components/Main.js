import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  useColorScheme,
} from 'react-native';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';

import NoteForm from './NoteForm';
import Card from './Card';
import { useOrientation } from './Orientation';
import { darkTheme, lightTheme } from './theme';

const Main = () => {
  const [noteModalVisible, setNoteModalVisible] = useState(false);

  var notes = useSelector((state) => state.notes);

  const theme = useColorScheme();
  const orientation = useOrientation();

  const newNoteId = () => {
    return uuid.v4().toString();
  };

  const AddIcon = () => {
    return (
      <View>
        <Icon name='add-outline' size={35} color={theme === 'dark' ? darkTheme.text : lightTheme.text} />
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.root}> 
      <View style={[styles.header, theme === 'dark' ? styles.headerDark : styles.headerLight]}>
        <View style={[styles.rightLeftContainer, { opacity: 0 }]}>
          <AddIcon />
        </View>
        <View style={styles.centerContainer}>
          <Text style={[styles.headerText, theme === 'dark' ? styles.titleDark : styles.titleLight]}>
            Notes
          </Text>
        </View>
        <View style={styles.rightLeftContainer}>
          <Pressable 
            onPress={() => {
              setNoteModalVisible(!noteModalVisible);
            }}
          >
            <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <AddIcon />
            </View>
          </Pressable>
        </View>
      </View>
      <View style={
        [
          orientation === 'PORTRAIT' ? styles.portraitBody : styles.landscapeBody, 
          theme === 'dark' ? styles.bodyDark : styles.bodyLight
        ]
        }
      >
        <ScrollView>
          { 
            notes.map((note) => {
              return (
                <Card key={note.id} id={note.id} title={note.title} content={note.content} />
              );
            })
          }
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
          id={newNoteId()}
          noteTitle=''
          noteContent=''
          isNewNote={true}
          setNoteModalVisible={setNoteModalVisible} 
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flex: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  rightLeftContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 3,
  },
  headerText: {
    fontSize: 23,
    textAlign: 'center',
  },
  portraitBody: {
    flex: 15,
  },
  landscapeBody: {
    flex: 6,
  },
  bodyDark: {
    backgroundColor: darkTheme.background,
  },
  bodyLight: {
    backgroundColor: lightTheme.background,
  },
  headerDark: {
    backgroundColor: darkTheme.foreground,
  },
  headerLight: {
    backgroundColor: lightTheme.foreground,
  },
  titleDark: {
    color: darkTheme.text,
  },
  titleLight: {
    color: lightTheme.text,
  },
});

export default Main;
