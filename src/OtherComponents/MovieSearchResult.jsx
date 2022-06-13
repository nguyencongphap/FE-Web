import React from "react";
import styled from "styled-components";
import Config from "../backend/config.json";

const StyleTD = styled.td`
    border: black solid 1px;
    max-height: 20px;
`

const MovieSearchResult = ({movie}) => {

    return (
        <div className="movie">
            <div>
                <p>{movie.year}</p>
            </div>

            <div>
                <img src={Config.TMDB_API_IMG_BASE_URL + movie.posterPath} alt={movie.title}/>
            </div>

            <div>
                <span>Rating: {movie.rating}/10</span>
                <h3>{movie.title}</h3>
            </div>
        </div>

        // <tr>
        //     <StyleTD>{movie.id}</StyleTD>
        //     <StyleTD>{movie.title}</StyleTD>
        //     <StyleTD>{movie.year}</StyleTD>
        //     <StyleTD>{movie.director}</StyleTD>
        //     <StyleTD>{movie.rating}</StyleTD>
        //     <StyleTD>{movie.backdropPath}</StyleTD>
        //     <StyleTD>{movie.posterPath}</StyleTD>
        // </tr>
    )
}

export default MovieSearchResult;