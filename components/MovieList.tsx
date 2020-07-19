import * as React from "react";
import {
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import { Text, View } from "../components/Themed";

import {getMovies} from "../data/Data";
import { MovieListProps, MovieListState } from "../types";

export default class MovieList extends React.Component<MovieListProps, MovieListState> {
  constructor(props: MovieListProps) {
    super(props);
    this.state = {
      movies: [],
    };
    this.goToDetailScreen = this.goToDetailScreen.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    getMovies().then((data) => {
      this.setState({
        movies: data.movies,
      });
    });
  }

  goToDetailScreen(item) {
    console.log("Detail button pressed for ", item.title);
    this.props.navigation.navigate("MovieDetailsScreen", { item });
  }

  renderItem(item: any) {
    const data = item.item;
    return (
      <TouchableOpacity onPress={() => this.goToDetailScreen(data)}>
        <View style={styles.item}>
          <Image
            source={{
              uri: data.backdrop,
            }}
            style={styles.movieIcon}
          />
          <Text style={styles.movieIconTitle}> {data.title} </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderList(movies) {
    movies = movies.item;
    let genre = Object.keys(movies)[0];
    const movielist = movies[genre];
    // console.log("Got movie genre list", movies);
    return (
      <View style={styles.movies}>
        <Text>{genre}</Text>
        <FlatList
          data={movielist}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
    );
  }

  aggregateMovies() {
    const result = {};
    this.state.movies.forEach((item) => {
      item.genres.forEach((g) => {
        if (g in result) {
          result[g].push(item);
        } else {
          result[g] = [item];
        }
      });
    });
    // console.log("aggregated movies", Object.keys(result));
    const finalList = [];
    Object.keys(result).forEach((genre) => {
      const temp = {};
      temp[genre] = result[genre];
      finalList.push(temp);
    });
    // console.log("final list", finalList);
    return finalList;
  }

  render() {
    if (this.state.movies === []) {
      return <Text style={styles.title}>{"Loading movies..."}</Text>;
    } else {
      console.log("Num movies now", this.state.movies.length);
      // console.log("movies now", this.state.movies[0])
      console.log("movie", this.state.movies[0]);
      const aggregatedMovies = this.aggregateMovies();
      let result = [];

      return (
        <FlatList
          data={aggregatedMovies}
          renderItem={this.renderList.bind(this)}
          keyExtractor={(item) => item[0]}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
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
  movies: {
    margin: 5,
  },
});
