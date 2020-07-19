import * as React from 'react';
import { StyleSheet, Button, FlatList, TouchableOpacity, Image} from 'react-native';

import { Text, View } from '../components/Themed';
import MovieList from '../components/MovieList';


export default function HomeScreen( { navigation } ) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Wookie Movies</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <MovieList
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "80%",
  },
});
