import * as React from 'react';
import { StyleSheet, Button, Image, ImageBackground } from 'react-native';
import Stars from 'react-native-stars-rating';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

// Temp datafor
// const mDATA = {
//   coverImageUrl:
//     "https://data.logograph.com/resize/LyricTheatre/multimedia/Image/13423/SOFM%202018%20900x600%20Goodfellas.jpg",

//   profileImageUrl:
//     "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
//   numStars: 4,
//   year: 1990,
//   rating: 8.7,
//   length: 31,
//   director: "Martin Scorcese",
//   cast: "RBD, NP",
//   description:
//     "best crime drama ever best crime drama ever best crime drama  asDasdASDasdaSDasdasDasasDasdasDasdasDasdasdasdasDasdASDasdaSDever best crime drama ever best crime drama ever  ",
// };


export default function MovieDetailsScreen( { navigation, route }) {
  
  const {item}  = route.params;

  const director = (director) => {
    if (typeof director === 'string')
    {
      return director;
    }
    else
    {
      return director.join(",")
    }
  };

  // Find the movie details from another api
  return (
    <View style={styles.container}>
      <Image
        resizeMode={"cover"}
        source={{
          uri: item.backdrop,
        }}
        style={styles.coverImage}
      />
      <Image
        resizeMode={"cover"}
        source={{
          uri: item.poster,
        }}
        style={styles.profileImage}
      />
      <Text style={styles.movieTitle}> {item.title + "  " + item.imdb_rating +"/10"} </Text>
      <View style={styles.movieStars}>
        <Stars 
          rateMax={5}
          rate={item.imdb_rating/2}
          size={20}
        />
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.movieInfo}> {item.released_on.substring(0, 4) + " | " + item.length + " | " + director(item.director)}  </Text>
      {/* <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate("HomeScreen", {});
        }}
      /> */}
      <Text style={styles.movieCast}>
        {"Cast: " + item.cast.join(", ")}
      </Text>
      <Text style={styles.movieDescription}>
        {"Description: " + item.overview}
      </Text>
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
    top: "47%",
    right: "20%",
    backgroundColor: "black",
  },
  separator: {
    position: "relative",
    marginVertical: 20,
    height: 2,
    width: "80%",
    top: "-18%",
  },
  coverImage: {
    position: "absolute",
    width: "100%",
    height: "30%",
    top: "5%",
  },
  profileImage: {
    width: "20%",
    height: "20%",
    position: "relative",
    top: "-5%",
    left: "-25%",
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    position: "relative",
    top: "-13%",
    right: "-13%",
    backgroundColor: "black",
    width: 200,
    textAlign: "center"
  },
  movieStars: {
    position: "relative",
    top: "-12%",
    left: "13%",
  },
  movieInfo: {
    position: "relative",
    fontSize: 18,
    fontStyle: "italic",
    top: "-18%",
    textAlign: "center"
  },
  movieCast: {
    position: "relative",
    top: "-17.5%",
    textAlign: "left",
    marginHorizontal: 30,
    fontSize: 18,
    marginVertical: 5,
  },
  movieDescription: {
    position: "absolute",
    top: "53%",
    textAlign: "left",
    marginHorizontal: 30,
    fontSize: 18,
    marginVertical: 18
  },
});
