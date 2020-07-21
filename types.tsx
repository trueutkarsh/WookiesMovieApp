export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
  MovieDetailsScreen: undefined;
};

export type SearchParamList = {
  SearchScreen: undefined;
  MovieDetailsScreen: undefined;
};

export type MovieListProps = {
  navigation: any
}

export type MovieItemParamlist = {
  data: undefined,
  onPress: undefined
}

export type MovieListState = {
  movies: any,
}

export type MovieSearchListState = {
  movies: any,
  loading: boolean,
  query: any
}

export type MovieSearchListProps = {
  navigation: any
}


export interface FavouriteIconProps
{
    callback: any
}

export interface FavouriteIconState
{
    color: any
}