import Config from "backend/config.json";
import Axios from "axios";

export async function requestGETMovies(accessToken, queryParams) {
    const options = {
        method: "GET", // Method type
        baseURL: Config.movieServiceBaseUrl, // Base part of URL
        url: Config.movie.search, // Path part of URL,
        params: queryParams,
        headers: {
            Authorization: "Bearer " + accessToken
        }
    }

    return Axios.request(options);
}

export async function requestGETMovieByMovieId(accessToken, movieId) {
    const options = {
        method: "GET", // Method type
        baseURL: Config.movieServiceBaseUrl, // Base part of URL
        url: "/movie/" + movieId, // Path part of URL,
        headers: {
            Authorization: "Bearer " + accessToken
        }
    }

    return Axios.request(options);
}