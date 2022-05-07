import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import Axios from "axios";
import styled from "styled-components";
import MovieSearchResult from "../OtherComponents/MovieSearchResult";
import {useUser} from "../hook/User";

const StyleDiv = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
`

const StyledTable = styled.table`
    border: black solid 1px;
    padding: 0;
    max-height: 20px;
`

const StyleTH = styled.th`
    border: black solid 1px;
    max-height: 20px;
`

const BlockDiv = styled.div`
    display: block;
`

/**
 * TODO: Change this myRequest function so that it
 * requests array of movies from our BE2 instead of requesting stuff
 * from jsonplaceholder API
 */
async function requestGETMovies(pathURL, queryParams, accessToken) {
    const options = {
        method: "GET", // Method type
        baseURL: "http://localhost:8082", // Base part of URL
        url: pathURL, // Path part of URL,
        params: queryParams,
        headers: {
            Authorization: "Bearer " + accessToken
        }
    }

    return Axios.request(options);
}


const Search = () => {

    const {
        accessToken
    } = useUser();

    // Use handleSubmit(getPosts) instead of getPosts to have some validations
    // Think of useForm as a dictionary that keeps track of all of our inputs for us
    // Down there, we use ...register to register things that we want useForm to keep track
    // Dot Dot Dot (...) means: take each value/field that's going to be returned (because the
    // returning type of register is an object) and spread them out. The reason why we want to
    // spread the values of the returned object out is because the way we pass information to an html
    // is like this: <input onClick={someFunc()} name={"someString"} />. So, instead of us doing
    // onClick=register.sth and name=register.sth1 and calling register a bunch of time (time-consuming
    // and prone-to-error), we use ...register. All (...) is doing is, let's say, register returns
    // an object with values called "onClick" and "name", what (...) does is it will set the value
    // "onClick" to onClick= html attribute and "name" to name= attribute for us instead of
    // letting us do it manually. (...) sets attributes for us.
    // Note that we use useForm with <input> tag. What we're telling useForm
    // in writing <input {...register("userId")}/> is that
    // hey useForm, please keep track of whatever the user type into the <input> tag under the key "userId"
    // when we want to get that value tracked under the key "userId", we can use getValues to check
    // the dictionary useForm, if the key "userId" exists (being tracked) then React will return to us
    // the value corresponding with the key "userId".
    const {register, getValues} = useForm();

    // Initial posts to be an empty array instead of undefined
    const [movies, setMovies] = React.useState([]);
    const [pageNum, setPageNum] = React.useState(1);

    useEffect(() => {
        getMovies(pageNum);
    }, [pageNum]);

    /**
     * Construct query params object for our request
     * and
     * make the request
     */
    const getMovies = (pn) => {

        const title = getValues("title");
        const year = getValues("year");
        const director = getValues("director");
        const genre = getValues("genre");
        const limit = getValues("limit");
        const page = pn;
        const orderBy = getValues("orderBy");
        const direction = getValues("direction");

        // Create query params that will go with our request
        // and pass it to myRequests to make the request
        // remove all the attributes/fields with empty value instead of using trinary comparison !==
        const movieSearchEndpointQueryParams = {
            // set it to null instead of leaving title as an empty object
            title: title !== "" ? title : null,
            year: year !== "" ? year : null,
            director: director !== "" ? director : null,
            genre: genre !== "" ? genre : null,
            limit: limit !== "" ? limit : null,
            page: page >= 1 ? page : 1,
            orderBy: orderBy !== "" ? orderBy : null,
            direction: direction !== "" ? direction : null,
        };

        console.log(movieSearchEndpointQueryParams);

        requestGETMovies("/movie/search", movieSearchEndpointQueryParams, accessToken)
            .then(response => setMovies(response.data.movies));
    }

    return (
        <div>
            <BlockDiv>

                <BlockDiv>
                    <label>Title: </label>
                    <input {...register("title")} id="mvSearchTitle" placeholder="Enter Title"/>
                </BlockDiv>

                <BlockDiv>
                    <label>Release Year: </label>
                    <input {...register("year")} id="mvSearchYear" placeholder="Enter Year"/>
                </BlockDiv>

                <BlockDiv>
                    <label>Director Name: </label>
                    <input {...register("director")} id="mvSearchDirector" placeholder="Enter Director Name"/>
                </BlockDiv>

                <BlockDiv>
                    <label>Genre: </label>
                    <input {...register("genre")} id="mvSearchGenre" placeholder="Enter Genre"/>
                </BlockDiv>

                <BlockDiv>
                    <label>Number of Results per Page: </label>
                    <select {...register("limit")} id="mvSearchLimit" placeholder="Select Maximum Amount of Results">
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </BlockDiv>

                <BlockDiv>
                    <label>Sort Result by: </label>
                    <select {...register("orderBy")} id="mvSearchOrderBy" placeholder="Select Option to Sort Results">
                        <option value={"title"}>Title</option>
                        <option value={"rating"}>Rating</option>
                        <option value={"year"}>Year</option>
                    </select>
                </BlockDiv>

                <BlockDiv>
                    <label>Sort Result in: </label>
                    <select {...register("direction")} id="mvSearchDirection" placeholder="Select Sorting Direction">
                        <option value={"asc"}>Ascending Order</option>
                        <option value={"desc"}>Descending Order</option>
                    </select>
                </BlockDiv>

                <BlockDiv>
                    <button onClick={() => {
                        // call getMovies here because if we only set pageNum to 1
                        // and pageNum's current state is 1, then getMovies inside
                        // useEffect will not be executed because state doesn't change.
                        setPageNum(1);
                        getMovies(pageNum);
                        console.log("Clicked Search Button");
                    }
                    }>Search</button>
                </BlockDiv>
            </BlockDiv>

            {
                movies.length !== 0 &&
                <div>
                    <StyleDiv>
                        <StyledTable>
                            <thead>
                            <tr>
                                <StyleTH>id</StyleTH>
                                <StyleTH>title</StyleTH>
                                <StyleTH>year</StyleTH>
                                <StyleTH>director</StyleTH>
                                <StyleTH>rating</StyleTH>
                                <StyleTH>backdropPath</StyleTH>
                                <StyleTH>posterPath</StyleTH>
                            </tr>
                            </thead>
                            <tbody>
                            {movies.map(movie => (<MovieSearchResult movie={movie}/>)) }
                            </tbody>
                        </StyledTable>

                        <BlockDiv>
                            <p>Page: {pageNum}</p>
                        </BlockDiv>
                    </StyleDiv>

                    <BlockDiv>
                        <button onClick={() => {
                            if ((pageNum - 1) >= 1) {
                                setPageNum((prevPageNum) => prevPageNum - 1);
                            }
                        }}
                        >Back Page</button>

                        <button onClick={() => {
                            if ((pageNum + 1) >= 1) {
                                setPageNum((prevPageNum) => prevPageNum + 1);
                            }
                        }}
                        >Next Page</button>
                    </BlockDiv>
                </div>
            }

        </div>

    );
}

export default Search;
