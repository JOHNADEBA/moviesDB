type setMovieTitles = (data: MovieDetailsProps[]) => void;
type setMovieDetails = (data: MovieDetailsProps) => void;
type setTableData = (data: any) => void;
type setSeriesDetails = (data: any) => void;
type handleSetError = (error: string) => void;
type handleRefresh = (value: boolean) => void;
type setTitleTypes = (data: string[]) => void;
type getPic = () => string;

export interface Column {
  id: "title" | "genres" | "type" | "year";
  label: string;
  minWidth?: number;
}

export interface TableData {
  title: string;
  genres: string;
  type: string;
  year: string;
}

interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
  caption?: { plainText: string };
}

interface TitleType {
  text: string;
  id: string;
  isSeries: boolean;
  isEpisode: boolean;
}

interface TitleText {
  text: string;
}

interface YearRange {
  year: number;
  endYear: number | null;
}

interface ReleaseDate {
  day: number;
  month: number;
  year: number;
}

export interface MovieDetailsProps {
  _id: string;
  id: string;
  primaryImage: Image;
  caption?: { plainText: string };
  titleType: TitleType;
  titleText: TitleText;
  originalTitleText: TitleText;
  releaseYear: YearRange;
  releaseDate: ReleaseDate;
  position: number;
  trailer: string;
}

export interface FetchTitleProps {
  titleType?: string;
  list?: string;
  genre?: string;
  endpoint: string;
  info?: string;
  limit?: number;
}

export interface MovieTitles {
  id?: string;
  pic?: string;
  title: string;
}

export interface SeriesDetails {
  tconst?: string;
  season: number;
  episode: number;
}

export interface AllMovieDetailsInterface {
  movieTitles: MovieTitles[];
  movieDetails?: any;
  tableData?: any;
  error?: string;
  seriesDetails?: SeriesDetails[];
  isRefresh: boolean;
  allTitleTypes: string[];
}

export interface AppProviderProps {
  children: React.ReactNode;
}

export interface AppContextInterface extends AllMovieDetailsInterface {
  setMovieTitles: setMovieTitles;
  setMovieDetails: setMovieDetails;
  setTableData: setTableData;
  setSeriesDetails: setSeriesDetails;
  handleSetError: handleSetError;
  handleRefresh: handleRefresh;
  setTitleTypes: setTitleTypes;
  getPic: getPic;
}
