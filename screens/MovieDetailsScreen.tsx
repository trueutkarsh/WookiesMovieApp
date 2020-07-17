import * as React from 'react';
import { StyleSheet, Button, Image, ImageBackground } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


const mDATA = {
  coverImageUrl: 'https://data.logograph.com/resize/LyricTheatre/multimedia/Image/13423/SOFM%202018%20900x600%20Goodfellas.jpg',
   
    profileImageUrl
   : 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    numStars : 4,
    year : 1990,
    rating: 8.7,
    length  : 31,
    director  : "Martin Scorcese",
    cast  : "RBD, NP",
   description : "best crime drama ever",
};

export default function MovieDetailsScreen( { navigation, route }) {
  
  const {movieId}  = route.params;
  const { movieName } = route.params;
  // Find the movie details from another api
  return (
    <View style={styles.container}>
      <Image
        resizeMode={"cover"}
        source={{
          uri: mDATA.coverImageUrl,
        }}
        style={styles.coverImage}
      />
      <Image
        resizeMode={"cover"}
        source={{
          uri: mDATA.profileImageUrl,
        }}
        style={styles.profileImage}
      />
      <Text style={styles.title}> {movieName + "  " + mDATA.rating +"/10"} </Text>
      {/* <Text style={styles.title}> {movieId} </Text>
      <Text style={styles.title}> {mDATA.director} </Text> */}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Button
        title="Go to Home"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate("HomeScreen", {});
        }}
      />
      <EditScreenInfo path="/screens/MovieDetailsScreen.tsx" />
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
    color: "white",
    position: "absolute",
    top: "45%",
    right: "15%",
    backgroundColor: "black",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  coverImage: {
    width: "100%",
    height: "40%",
  },
  profileImage: {
    width: "20%",
    height: "20%",
    position: "absolute",
    top: "35%",
    left: "15%",
  },
  movieTitle: {},
  movieStars: {},
  movieInfo: {},
  movieCast: {},
  movieDescription: {},
});
