import * as React from 'react';
import { StyleSheet, Button, FlatList, TouchableOpacity, Image} from 'react-native';
import MovieListItem from '../components/MovieListItem';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import getMovies from  '../data/Data';
import { MovieListProps, MovieListState } from '../types';


class MovieList extends React.Component<MovieListProps, MovieListState> {

  constructor(props: MovieListProps)
  {
    super(props);
    this.state = {
      movies: []
    }
    this.goToDetailScreen = this.goToDetailScreen.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount()
  {

    getMovies().then((data) => {
      this.setState({
        "movies": data.movies
      })
    });
  }

  goToDetailScreen(item)
  {
    console.log("Detail button pressed for ", item.title)
    this.props.navigation.navigate("MovieDetailsScreen", { item });
  }

  renderItem(item: any) {
      const data = item.item;
      console.log("got item", item)
      return (
        <TouchableOpacity onPress={() => this.goToDetailScreen(data)}>
          <View style={styles.item}>
                <Image
                    source={{
                      uri: data.backdrop
                    }}
                    style={styles.movieIcon}
                />
              <Text style={styles.movieIconTitle}> {data.title} </Text>
          </View>
        </TouchableOpacity>
    ); 

  }


  render() {
    if (this.state.movies === [])
    {
      return (
        <Text style={styles.title}>
          {"Loading movies..."}
        </Text>
      )
    }
    else 
    {
      console.log("Num movies now", this.state.movies.length)
      // console.log("movies now", this.state.movies[0])
      console.log("movie", this.state.movies[0])
      return (
        <FlatList
          data={this.state.movies}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      )
    }
  }

};


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

      <Button
        title="Go to Movie details"
        onPress={() => {
          navigation.navigate("MovieDetailsScreen", {
            movieId: "ABC123",
            movieName: "Goodfellas",
          });
        }}
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
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  movieIcon: {
    width: 100,
    height: 100,
  },
  movieIconTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
    width: 100,
  },
  item: {
    margin: 5,
  },
});
