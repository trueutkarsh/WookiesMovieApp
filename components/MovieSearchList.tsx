import * as React from "react";
import {
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Text, View } from "../components/Themed";
import { searchMovies } from "../data/Data";
import { MovieSearchListState, MovieSearchListProps } from "../types";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from "react-native-vector-icons/Icon";


export default class MovieSearchList extends React.Component<
  MovieSearchListProps,
  MovieSearchListState
> {
  constructor(props: MovieSearchListProps) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      query: ""
    };
    this.makeSearchRequest = this.makeSearchRequest.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.makeSearchRequest("");
    console.log("search elemtn loaded");
  }

  makeSearchRequest(entry) {
    entry = entry || "";
    searchMovies(entry)
      .then((result) => {
          console.log("movie search", this.state.query, result)
        this.setState({
          loading: false,
          movies: result.movies,
          query: entry
        });
      })
      .catch((error) => {
          console.log("error in searching", error);
        this.setState({
          loading: false,
          movies: [],
          query: ""
        });
      });
  }

  goToDetailScreen(item) {
    console.log("Detail button pressed for ", item.title);
    this.props.navigation.navigate("MovieDetailsScreen", { item });
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%",
        }}
      />
    );      
  }

  renderHeader() {
    return (
      <TextInput
        placeholder={"Enter text here.."}
        onChangeText={(text) => this.makeSearchRequest(text)}
        autoCorrect={false}
        // value={this.state.loadin}
        style={styles.searchBar}
        value={this.state.query}

      />

    );
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

  render() {
    if (this.state.movies === []) {
      return (
        <View>
            <Text>Your search results will appear here </Text>
        </View>
      );
    } else {
      return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.movies}
          keyExtractor={(item) => item.title}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderItem.bind(this)}
          extraData={this.state}
          
        />
      </View>
      );
    }
  }
}

const styles = StyleSheet.create({
    item: {
        margin: 5,
        display: "flex",
        flexDirection: 'row'
    },
    movieIcon: {
        width: 75,
        height: 75,
    },
    movieIconTitle: {
        position: "relative",
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
        top: 20
    },
    searchBar: {
        backgroundColor: "black",
        color: "white",
        fontSize: 20,
        marginBottom: 20,
        textAlign: "left",
        position: "relative"
    }
});