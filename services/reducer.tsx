import { AllMovieDetailsInterface } from "../types";
import {
  FETCH_MOVIE_DETAILS,
  FETCH_MOVIE_TITLES,
  FETCH_SERIES_DETAILS,
  SET_ERROR,
  SET_REFRESH,
  SET_TABLE_DATA,
  SET_TITLETYPES,
} from "./actionTypes";
export const reducer = (
  state: AllMovieDetailsInterface,
  action: { type: string; payload: any }
) => {
  if (action.type === SET_TITLETYPES) {
    return {
      ...state,
      allTitleTypes: action.payload,
    };
  }

  if (action.type === SET_REFRESH) {
    return {
      ...state,
      isRefresh: action.payload,
    };
  }

  if (action.type === FETCH_MOVIE_TITLES) {
    return {
      ...state,
      movieTitles: action.payload,
    };
  }

  if (action.type === FETCH_MOVIE_DETAILS) {
    return {
      ...state,
      movieDetails: action.payload,
    };
  }

  if (action.type === SET_TABLE_DATA) {
    return {
      ...state,
      tableData: action.payload,
    };
  }

  if (action.type === FETCH_SERIES_DETAILS) {
    return {
      ...state,
      seriesDetails: action.payload,
    };
  }

  if (action.type === SET_ERROR) {
    return {
      ...state,
      error: action.payload,
    };
  }

  return state;
};
