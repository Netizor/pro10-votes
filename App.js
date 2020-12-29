import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Button   } from 'react-native';
import { student_selected, reset } from "./actions/actions-type";
import { useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import reducer from './reducers/reducer';
import {Provider} from 'react-redux';



const Home = () => {

  let { students, favorites, count } = useSelector((state) => state);
  const dispatch = useDispatch();

    console.log( favorites )

  let choices = students.filter( (values, key) => ( key === count ) );

    const clear = () => {
        dispatch(reset())
    }

  const Item = ({ studentName, index, onPress }) => (
      <TouchableOpacity onPress={onPress} style={[styles.item]}>
        <Text style={styles.title} key={index} >{studentName}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {

    return  item.list.map( (studentName, key) => {

          return (

              <Item
                  item={item}
                  key={key}
                  index={key}
                  onPress={() => dispatch(student_selected({ id: item.id, choice: studentName }))}
                  studentName={ studentName }
              />

          )

      } )

  };

  return (
      <View style={styles.container}>

          { choices.length > 0 && (

              <View style={styles.container}>

                  <Text>Vote for one student : </Text>

                  <SafeAreaView style={styles.container}>
                      <FlatList
                          data={choices}
                          renderItem={ renderItem }
                          keyExtractor={ item => item.id.toString() }
                      />

                  </SafeAreaView>

              </View>

          ) }

          { choices.length === 0 && (

              <View style={styles.container}>

                  <Text>Result : </Text>

                  <SafeAreaView style={styles.container}>
                      <FlatList
                          data={favorites}
                          renderItem={ ({ item }) => {

                              return <Text key={item.id} >{ item.student }</Text>

                          } }
                          keyExtractor={ item => item.id.toString() }
                      />

                  </SafeAreaView>

                  <Button title="Reset" onPress={clear}/>

              </View>

          ) }

      </View>
  );

}

export default function App() {

  const store = createStore(reducer);

  return (
      <Provider store={store}>
        <Home />
      </Provider>
  );

}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        fontSize: 32,
    },
});
