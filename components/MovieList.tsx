import * as React from "react";
import {
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity,
    Image,
    AsyncStorage
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
    };
    this.goToDetailScreen = this.goToDetailScreen.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    let favourites;
    this.state = {
        movies: [],
    };
    AsyncStorage.getItem("favourites")
      .then((value) => {
        let movies = [];
        favourites = JSON.parse(value);
        // AsyncStorage.setItem("favourites", JSON.stringify([]));
    })
    .catch((error) => {
        AsyncStorage.setItem("favourites", JSON.stringify([]));
    })
    .finally(() => {
        getMovies().then((data) => {
            // let favids = this.state.favourites.map((movie)=)
            const finalmovies = data.movies;
            finalmovies.forEach((movie) => {
                movie["favourite"] = false;
                favourites.forEach((fav) => {
                    if (movie.title === fav.title)
                    {
                        movie["favourite"] = true;
                    }
                });
            })
            // data.movies.filter((movie))
            this.setState({
                movies: finalmovies,
            });
        });

      })
  }

  goToDetailScreen(item) {
    this.props.navigation.navigate("MovieDetailsScreen", { item });
  }

  favouriteClicked(item)
  {
    //   const favourites = this.state.favourites;
    
    //   let i = favourites.findIndex((fav) => fav.id === item.id );
    //   if (i === -1)
    //   {
    //       item["favourite"] = true;
    //       favourites.push(item)
    //     }
    //     else
    //     {
    //       item["favourite"] = false;
    //       favourites.splice(i, 1);
    //   }
    // console.log("fav clicked", item);
    // const movies = this.state.movies;
    this.state.movies.filter((mov) => mov.title === item.title).map((mov) => {
        mov.favourite = !mov.favourite;
    });


    this.setState({
        movies: this.state.movies,
    });

    AsyncStorage.setItem("favourites", JSON.stringify(this.state.movies.filter((movie) => movie.favourite === true)));
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
            <Text style={styles.title}>{genre}</Text>
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
        // Add Favourites
        allMovies.push({
            "Favourites": this.state.movies.filter((mov) => mov.favourite === true)
        })
        // Add top movies
        allMovies.push({
            "Top Movies": this.state.movies.filter((mov) => mov.imdb_rating >= 8.5)
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
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    marginLeft: 5
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
    bottom: "15%",
    textAlign: "center"
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
