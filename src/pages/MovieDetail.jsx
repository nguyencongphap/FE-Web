import Config from "backend/config.json";
import React from "react";
import {useParams} from "react-router-dom";
import {requestGETMovieByMovieId} from "../backend/movies";
import {useUser} from "../hook/User";
import {requestPOSTCartInsert} from "../backend/billing";
import {useForm} from "react-hook-form";
import AddToCartQuantity from "../OtherComponents/AddToCartQuantity";

const MovieDetail = () => {
    const {
        accessToken
    } = useUser();

    const {id} = useParams();

    const [movie, setMovie] = React.useState();
    const [genres, setGenres] = React.useState();
    const [persons, setPersons] = React.useState();

    React.useEffect( () => {
        requestGETMovieByMovieId(accessToken, id)
            .then(response => {
                setMovie(response.data.movie);
                setGenres(response.data.genres);
                setPersons(response.data.persons);
            });
    }, [])

    return (
        <div>

            {
                !!movie &&
                <React.Fragment>
                    <img src={`${Config.TMDB_API_IMG_W500_BASE_URL + movie.backdropPath}`} alt="Wallpaper of Movie" ></img>
                    <div className="movie">
                        <div>
                        </div>
                        <div>
                            <img src={Config.TMDB_API_IMG_BASE_URL + movie.posterPath} alt={movie.title}/>
                        </div>
                        <div>
                        </div>
                    </div>

                    <AddToCartQuantity movie={movie}/>

                    <h1>{movie.title}</h1>
                    <h2>{movie.year}</h2>
                    <h3>Directed by: {movie.director}</h3>
                    <h4>Rating: {movie.rating}/10 ({movie.numVotes})</h4>
                    <h4>Budget: ${!!movie.budget ? parseInt(movie.budget) / 100 : 0 }</h4>
                    <h4>Revenue: ${!!movie.revenue ? parseInt(movie.revenue) / 100 : 0 }</h4>
                    <h3>Overview:</h3>
                    <h3>{movie.overview}</h3>

                </React.Fragment>
            }

            {
                !!genres &&
                <div>
                    <React.Fragment>
                        <h2>Genres: </h2>
                        {
                            genres.map((genre) => (
                                <div key={genre.id}>
                                    <h4>{genre.name}</h4>
                                </div>
                            ))
                        }
                    </React.Fragment>
                </div>
            }

            {
                !!persons &&
                <div>
                    <React.Fragment>
                        <h2>Persons: </h2>
                        {
                            persons.map((person) => (
                                <div key={person.id}>
                                    <h4>{person.name}</h4>
                                </div>
                            ))
                        }
                    </React.Fragment>
                </div>
            }


        </div>
    )
}

export default MovieDetail;