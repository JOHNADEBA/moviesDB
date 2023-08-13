import React, { useEffect } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Movie.module.scss";
import { Box, Button, Grid } from "@mui/material";
import { useGlobalContext } from "../../services/context";
import { MovieDetailsProps, SeriesDetails } from "../../types";
import Table from "../../components/table";
import useFetch from "../../components/useFetch";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadPDFButton from "../../components/downloadPDFButton";
import MovieDetails from "../../components/movieDetails";
import CircularProgress from "@mui/material/CircularProgress";

const Movie: NextPage = () => {
  const router = useRouter();
  const { push } = useRouter();
  const id = router.query.titleId;

  const {
    handleRefresh,
    movieDetails,
    error,
    setMovieDetails,
    setSeriesDetails,
  } = useGlobalContext();

  const FetchMovieDetails: MovieDetailsProps = useFetch({
    endpoint: `/titles/${id}`, //you can replace the endpoint with '/titles/tt0092325' to see the trailer,
    info: "custom_info",
  });

  useEffect(() => {
    setMovieDetails(FetchMovieDetails);
  }, [FetchMovieDetails]);

  const FetchSeriesInfo: SeriesDetails[] = useFetch({
    endpoint: `/titles/series/${id}`
  });

  useEffect(() => {
    if (FetchSeriesInfo && Array.isArray(FetchSeriesInfo)) {
      const seasonsMap = FetchSeriesInfo.reduce((acc: any, item: any) => {
        const seasonNumber = item.seasonNumber;
        acc[seasonNumber] = (acc[seasonNumber] || 0) + 1;
        return acc;
      }, {});

      const result: SeriesDetails[] = Object.keys(seasonsMap).map((season) => {
        return { season: parseInt(season), episode: seasonsMap[season] };
      });
      setSeriesDetails(result);
    }
  }, [FetchSeriesInfo]);

  const goBackToHomePage = () => {
    handleRefresh(false);
    push(`/`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (movieDetails) {
    return (
      <>
        <Head>
          <title>{movieDetails?.originalTitleText?.text}</title>
          <meta name="description" content="Get movie details" />
        </Head>
        <div>
          <div className={styles.action}>
            <Button
              sx={{
                m: 0.5,
                color: "rgba(255, 255, 255, 0.6)",
                "&:hover": {
                  color: "rgba(255, 255, 255, 1)",
                },
              }}
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => goBackToHomePage()}
            >
              Go Back
            </Button>

            <DownloadPDFButton />
          </div>

          <MovieDetails />

          {movieDetails && (
            <div className={styles["second-section"]}>
              <Table
                genres={movieDetails?.genres?.genres}
                titleType={movieDetails?.titleType.id}
              />
            </div>
          )}
        </div>
      </>
    );
  } else {
    return (
      <Box className={styles.loading}>
        <CircularProgress />
      </Box>
    );
  }
};

export default Movie;
