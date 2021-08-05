import React from 'react';
import type { Node } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

const App: () => Node = () => {
  return (
    <SafeAreaView> 
      <View style={styles.header}>
        <Icon name='add-outline' size={35} style={{ opacity: 0 }}/>
        <Text style={styles.headertext}>Notes</Text>
        <View style={styles.addbutton}>
          <Pressable 
            onPress={() => {}}>
            <Icon name='add-outline' size={35} color='white'/>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  headertext: {
    //backgroundColor: 'blue',
    color: 'white',
    fontSize: 23,
    marginLeft: 'auto',
  },
  addbutton: {
    //backgroundColor: 'red',
    marginLeft: 'auto',
  },
  hidden: {
    opacity: 0,
    marginLeft: 'auto',
  }
});

export default App;
