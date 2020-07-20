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
import { Icon } from "react-native-vector-icons/Icon";
import { SlideFromRightIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";


class FavouriteIcon extends React.Component<FavouriteIconProps, FavouriteIconState> {

    constructor(props)
    {
        super(props);
        this.state ={
            color: "white"
        }
    }

    onClick()
    {
        let color;
        if (this.state.color == "white")
        {
            color = "yellow";
        }
        else
        {
            color = "white";
        }
        this.setState({
            color: color,
          });
        this.props.callback();
    }

    render()
    {
        return (
            <AntDesign
              name={"staro"}
              color={this.state.color}
              size={30}
              onPress={() => this.onClick()}
            />
        );

    }
};


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
      this.setState({
        movies: this.aggregateMovies(data.movies)
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
          favourites.push(item);
      }
      else
      {
          favourites.splice(i, 1);
      }
      this.setState({
          movies: this.state.movies,
          favourites: favourites
      });
      console.log("Favourites size ", this.state.favourites);

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
          <FavouriteIcon callback={this.favouriteClicked.bind(this, data)} />
          <Text style={styles.movieIconTitle}> {data.title} </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderList(movies) {
    movies = movies.item;
    let genre = Object.keys(movies)[0];
    const movielist = movies[genre];
    console.log("list rendered again", genre, movielist.length);
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
        allMovies.push(...this.state.movies)
        console.log("Keys of all movies", allMovies.map((item) => Object.keys(item).join(",")))
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
    marginVertical: 10,
    height: 1,
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
  listTitle: {
      fontSize: 15,
      marginLeft: 0
  }
});
