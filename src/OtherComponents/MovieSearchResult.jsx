import React from "react";
import styled from "styled-components";

const StyleTD = styled.td`
    border: black solid 1px;
    max-height: 20px;
`

const MovieSearchResult = ({movie}) => {

    return (
        <tr>
            <StyleTD>{movie.id}</StyleTD>
            <StyleTD>{movie.title}</StyleTD>
            <StyleTD>{movie.year}</StyleTD>
            <StyleTD>{movie.director}</StyleTD>
            <StyleTD>{movie.rating}</StyleTD>
            <StyleTD>{movie.backdropPath}</StyleTD>
            <StyleTD>{movie.posterPath}</StyleTD>
        </tr>
    )
}

export default MovieSearchResult;