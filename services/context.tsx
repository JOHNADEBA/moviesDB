import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import {
  AppContextInterface,
  AppProviderProps,
  AllMovieDetailsInterface,
  MovieTitles,
  MovieDetailsProps,
  SeriesDetails,
} from "../types";
import {
  FETCH_MOVIE_DETAILS,
  FETCH_MOVIE_TITLES,
  FETCH_SERIES_DETAILS,
  SET_ERROR,
  SET_REFRESH,
  SET_TABLE_DATA,
  SET_TITLETYPES,
} from "./actionTypes";

const initialState: AllMovieDetailsInterface = {
  movieTitles: [],
  tableData: [],
  error: "",
  isRefresh: true,
  allTitleTypes: [],
};

const AppContext = createContext<AppContextInterface>(
  initialState as AppContextInterface
);

const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPic = (): string =>
    "data:image/jpeg;base64,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";

  const setTitleTypes = (data: string[]) => {
    dispatch({ type: SET_TITLETYPES, payload: data });
  };

  const setMovieTitles = (data: MovieDetailsProps[]) => {
    if (data && data.length > 0) {
      const computedMovieTitles: MovieTitles[] = data.map((movie: any) => ({
        id: movie.id,
        pic: movie.primaryImage?.url,
        title: movie.originalTitleText?.text,
      }));

      dispatch({
        type: FETCH_MOVIE_TITLES,
        payload: computedMovieTitles,
      });
    }
  };

  const setMovieDetails = (data: MovieDetailsProps) => {
    if (data) {
      dispatch({
        type: FETCH_MOVIE_DETAILS,
        payload: data,
      });
    }
  };

  const setTableData = (data: any[]) => {
    const transformedArray = data.map((row: any) => ({
      title: row.titleText.text,
      genres: row.genres?.genres
        ?.map((genre: { text: string }) => genre.text)
        .join(", "),
      type: row.titleType.id,
      year: row.releaseYear.year,
    }));
    dispatch({ type: SET_TABLE_DATA, payload: transformedArray });
  };

  const handleRefresh = (value: boolean) => {
    dispatch({ type: SET_REFRESH, payload: value });
  };

  const setSeriesDetails = (data: SeriesDetails[]) => {
    dispatch({
      type: FETCH_SERIES_DETAILS,
      payload: data,
    });
  };

  const handleSetError = (error: string) => {
    dispatch({ type: SET_ERROR, payload: error });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        setMovieTitles,
        setMovieDetails,
        setSeriesDetails,
        handleSetError,
        handleRefresh,
        setTableData,
        setTitleTypes,
        getPic,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
