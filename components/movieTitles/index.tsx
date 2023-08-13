import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useFetch from "../useFetch";
import { useGlobalContext } from "../../services/context";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { MovieDetailsProps } from "../../types";

import { styled } from "@mui/system";

const MovieCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s",
  "&:hover": {
    backgroundColor: "white",
    transform: "scale(1.05)",
  },
  "& .MuiCardActionArea-focusHighlight": {
    backgroundColor: "white",
    transform: "scale(1.05)",
  },
}));

const MovieTitles = () => {
  const {
    allTitleTypes,
    setTitleTypes,
    isRefresh,
    movieTitles,
    error,
    setMovieTitles,
    handleRefresh,
    handleSetError,
    getPic,
  } = useGlobalContext();

  const { push } = useRouter();

  const getAllTitleTypes: string[] = useFetch({
    endpoint: "/titles/utils/titleTypes",
  });

  useEffect(() => {
    // Filter out null values and shuffle the array
    const nonNullTitleTypes: string[] = getAllTitleTypes?.filter(
      (type: string) => type !== null
    );
    const shuffledTitleTypes: string[] = nonNullTitleTypes?.sort(
      () => Math.random() - 0.5
    );

    // Get the first 10 elements
    const randomTitleTypes: string[] = shuffledTitleTypes?.slice(0, 10);
    setTitleTypes(randomTitleTypes);
  }, [getAllTitleTypes]);

  useEffect(() => {
    let allTitles: MovieDetailsProps[] = [];
    if (isRefresh && allTitleTypes) {
      const fetchPromises = allTitleTypes?.map(async (titleType: string) => {
        if (titleType !== null) {
          const options = {
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_MOVIES_DB_DOMAIN}/titles`,
            params: {
              titleType,
              limit: 1,
            },
            headers: {
              "X-RapidAPI-Key": process.env.NEXT_PUBLIC_MOVIES_DB_API_KEY,
              "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
            },
          };

          try {
            const response = await axios(options);
            return response.data.results;
          } catch (error) {
            handleSetError(`Error fetching data:, ${error}`);
            return [];
          }
        }
      });

      Promise.all(fetchPromises)
        .then((results) => {
          allTitles = results.flat();
          setMovieTitles(allTitles);
        })
        .catch((error) => {
          handleSetError(`Error fetching data:, ${error}`);
        });
    }
  }, [allTitleTypes, getAllTitleTypes]);

  const handleNavigationToMovieDetails = (id: string) => {
    handleRefresh(false);
    push(`/movie/${id}`);
  };

  if (error) {
    return <div>{error}</div>;
  }
  if (movieTitles.length > 0) {
    return (
      <>
        <Grid sx={{ mt: 3 }} container spacing={2}>
          {movieTitles.map((title) => (
            <Grid key={title.id} item xs={12} sm={6} md={4} lg={2.4}>
              <MovieCard
                onClick={() =>
                  title?.id && handleNavigationToMovieDetails(title?.id)
                }
                sx={{ minHeight: 280 }} // maxWidth: 345,
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={title.pic || getPic()}
                    alt={title.title}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {title.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </MovieCard>
            </Grid>
          ))}
        </Grid>
      </>
    );
  } else {
    return (
      <Box sx={{ mt: 1 }}>
        <CircularProgress />
      </Box>
    );
  }
};

export default MovieTitles;
