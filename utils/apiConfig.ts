import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const API_BASE_URL = process.env.NEXT_PUBLIC_MOVIES_DB_DOMAIN;

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    },
});
