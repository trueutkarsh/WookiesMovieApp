import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import MovieSearchList from "../components/MovieSearchList";

export default function SearchScreen({navigation}) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Search Collection</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <MovieSearchList navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 20
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
});
