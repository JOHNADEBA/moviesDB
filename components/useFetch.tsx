import React, { useState, useEffect } from "react";
import { FetchTitleProps } from "../types";
import { useGlobalContext } from "../services/context";

import axios from "axios";

const useFetch = ({
  titleType,
  list,
  endpoint,
  genre,
  info,
  limit,
}: FetchTitleProps) => {
  const { handleSetError } = useGlobalContext();
  const [data, setData] = useState<any>(null);

  const handleError = (err: any) => {
    handleSetError(err);
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_MOVIES_DB_DOMAIN}${endpoint}`,
        params: {
          titleType,
          list,
          genre,
          info,
          limit,
        },
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_MOVIES_DB_API_KEY,
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setData(response.data.results);
      } catch (error) {
        handleError("Error fetching data");
      }
    };

    fetchData();
  }, [endpoint]);
  return data;
};

export default useFetch;
