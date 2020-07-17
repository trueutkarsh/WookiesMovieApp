import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function HomeScreen( {navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Wookie Movies</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        title="Go to Movie details"
        onPress={() => {
          /* 1. Navigate to the Movie details route with params */
          navigation.navigate("MovieDetailsScreen", {
            movieId: "ABC123",
            movieName: "Goodfellas",
          });
        }}
      />
      <EditScreenInfo path="/screens/HomeScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
