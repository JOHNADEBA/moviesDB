import React from "react";
import styles from "./styles.module.scss";
import { Grid } from "@mui/material";
import { useGlobalContext } from "../../services/context";
import { convertSecondsToHoursMins, formatDate } from "../../utils/common";

import { MovieDetailsProps, SeriesDetails } from "../../types";

const MovieDetails = () => {
  const { movieDetails, seriesDetails, getPic } = useGlobalContext();

  const {
    originalTitleText,
    primaryImage,
    releaseYear,
    releaseDate,
    titleType,
    ratingsSummary,
    genres,
    runtime,
    plot,
    principalCast,
    directors,
    trailer,
  } = movieDetails;

  const displayCrew = (arr: { credits: any[]; category: { text: any } }) => {
    return (
      arr && (
        <div className={`${styles["multi-info"]} ${styles.crew}`}>
          {arr?.credits?.map(
            (crew: { name: { id: string; nameText: { text: string } } }) => (
              <div key={crew.name.id}>
                <p className={styles.detail}>{crew.name.nameText.text}</p>
                <p className={styles.position}>
                  {arr?.category?.text || "cast"}
                </p>
              </div>
            )
          )}
        </div>
      )
    );
  };

  return (
    <>
      <div
        id="download_movie_details"
        style={{ backgroundImage: `url(${primaryImage?.url || getPic()})` }}
        className={styles["first-section"]}
      >
        <Grid className={styles.shadow} container spacing={2}>
          <Grid className={styles["img-container"]} item xs={12} sm={12} md={4}>
            <img
              id="img"
              src={primaryImage?.url || getPic()}
              alt={originalTitleText?.text}
            />
          </Grid>

          <Grid className={styles["info-left"]} item xs={12} sm={12} md={8}>
            <h5 className={styles.title}>{originalTitleText?.text}</h5>

            <div className={styles["multi-info"]}>
              {plot && <p className={styles.info}>{plot.language.id}</p>}
              {releaseDate ? (
                <p className={styles.info}>
                  {formatDate(
                    releaseDate?.day,
                    releaseDate?.month,
                    releaseDate?.year
                  )}
                </p>
              ) : (
                <p className={styles.info}>{releaseYear.year}</p>
              )}

              {runtime && (
                <p className={styles.info}>
                  {convertSecondsToHoursMins(runtime.seconds)}
                </p>
              )}
              <p className={styles.info}>{titleType.text} </p>
            </div>

            <div className={styles["multi-info"]}>
              {genres?.genres?.map((genre: { id: string; text: string }) => (
                <p key={genre.id} className={styles.info}>
                  {genre.text}
                </p>
              ))}
            </div>

            {ratingsSummary && (
              <div className={styles["multi-info"]}>
                <p className={`${styles.season} ${styles.value}`}>
                  Rating: {ratingsSummary?.aggregateRating}
                </p>

                <p className={`${styles.season} ${styles.value}`}>
                  Votes: {ratingsSummary?.voteCount}
                </p>
              </div>
            )}

            {titleType.isSeries && seriesDetails && (
              <div>
                {seriesDetails.map((serie: SeriesDetails, index: number) => (
                  <div className={styles["multi-info"]} key={index}>
                    <p className={`${styles.season} ${styles.value}`}>
                      Season {serie.season}
                    </p>
                    <p className={`${styles.season} ${styles.key}`}>
                      {serie.episode}{" "}
                      {serie.episode > 1 ? "Episodes" : "Episode"}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {plot && (
              <div>
                <h5 className={styles.overview}>Overview</h5>
                <p className={styles.detail}>{plot.plotText.plainText}</p>
              </div>
            )}

            {primaryImage?.caption?.plainText && (
              <div>
                <h5 className={styles.overview}>More Info</h5>
                <p className={styles["more-text"]}>
                  {primaryImage?.caption?.plainText}{" "}
                </p>
              </div>
            )}

            {displayCrew(principalCast[0])}
            {displayCrew(directors[0])}
          </Grid>
        </Grid>
      </div>

      {trailer && (
        <div className={styles["video-container"]}>
          <iframe
            src={trailer}
            title="Movie Trailer"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.frame}
          ></iframe>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
