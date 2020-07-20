import * as React from "react";
import {
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import { Text, View } from "../components/Themed";
import { AntDesign } from "@expo/vector-icons";
import {getMovies} from "../data/Data";
import { MovieListProps, MovieListState, FavouriteIconProps, FavouriteIconState } from "../types";



export default class MovieList extends React.Component<MovieListProps, MovieListState> {
  constructor(props: MovieListProps) {
    super(props);
    this.state = {
      movies: [],
      favourites: []
    };
    this.goToDetailScreen = this.goToDetailScreen.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    getMovies().then((data) => {
      data.movies.forEach((movie) => {
          movie["favourite"] = false;
      })
      this.setState({
        movies: data.movies
      });
    });
  }

  goToDetailScreen(item) {
    this.props.navigation.navigate("MovieDetailsScreen", { item });
  }

  favouriteClicked(item)
  {
      const favourites = this.state.favourites;
    
      let i = favourites.indexOf(item);
      if (i === -1)
      {
          item.favourite=true;
          favourites.push(item);
      }
      else
      {
          item.favourite=false;
          favourites.splice(i, 1);
      }
      const movies = this.state.movies;
      movies.forEach((movie) => {
          if (movie.id === item.id)
          {
              movies.favourite = true;
          }
      });

      this.setState({
          movies: this.state.movies,
          favourites: favourites
      });

  }

  renderItem(item: any) {
    const data = item.item;
    let starcolor = "white";
    if (data.favourite === true)
    {
        starcolor = "red";
    }
    return (
      <TouchableOpacity onPress={() => this.goToDetailScreen(data)}>
        <View>
          <Image
            source={{
              uri: data.backdrop,
            }}
            style={styles.movieIcon}
          />
          <AntDesign
            name={"heart"}
            color={starcolor}
            size={20}
            onPress={() => this.favouriteClicked(data)}
            style={styles.favouriteIcon}
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
    if (movielist.length !== 0)
    {
        return (
          <View style={styles.movies}>
            <Text>{genre}</Text>
            <FlatList
              data={movielist}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
          </View>
        );
    }
    else
    {
        return (
          <View style={styles.movies}>
            {/* <Text style={styles.listTitle}>{genre}</Text>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            /> */}
          </View>
        );
    }
  }

  aggregateMovies(movies) {
    const result = {};
    movies.forEach((item) => {
      item.genres.forEach((g) => {
        if (g in result) {
          result[g].push(item);

        } else {
          result[g] = [item];
        }
      });
    });
    const finalList = [];
    Object.keys(result).forEach((genre) => {
      const temp = {};
      temp[genre] = result[genre];
      finalList.push(temp);
    });
    return finalList;
  }

  render() {
    if (this.state.movies === []) {
      return <Text style={styles.title}>{"Loading movies..."}</Text>;
    } else {
        const allMovies = [];
        allMovies.push({
            "Favourites": this.state.favourites
        })
        allMovies.push(...this.aggregateMovies(this.state.movies))
        return (
            <FlatList
            data={allMovies}
            renderItem={this.renderList.bind(this)}
            keyExtractor={(item) => Object.keys(item)[0]}
            />
        );
    }
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  separator: {
    height: 1,
    position: "relative",
    top: "-15%",
    marginTop: 5
  },
  movieIcon: {
    minWidth:100,
    width: 100,
    height: 100,
    margin: 5
  },
  movieIconTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    width: 100,
    bottom: "15%"
  },
  item: {
    margin: 5,
  },
  listTitle: {
      fontSize: 15,
      marginLeft: 0
  },
  favouriteIcon: {
    position: "relative",
    bottom: "15%",
    right: "-75%"
  }
});
