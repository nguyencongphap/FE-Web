import Config from "backend/config.json";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useForm, useWatch} from "react-hook-form";
import styled from "styled-components";
import MovieSearchResult from "./MovieSearchResult";
import {requestGETMovies} from "../../backend/movies";
import {useUser} from "../../hook/User";
import "../../App.css";
import {useNavigate, useParams} from "react-router-dom";
import {requestGETCartRetrieve, requestPOSTCartInsert} from "../../backend/billing";
import AddToCartBar from "./AddToCartBar";
import {
    Box,
    Button, Container,
    FormControl,
    Grid, IconButton, InputAdornment,
    InputLabel,
    Menu,
    MenuItem,
    Select,
    Stack,
    TextField, ToggleButton,
    Typography
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {genreCodeNamesToNames, genreNamesToCodeNames} from "../../data/genres";
import $ from 'jquery';
import {KeyboardArrowUp} from "@mui/icons-material";




export const constructSearchPageURLQueryStr = (
    {
        title= null,
        year= null,
        director= null,
        genre= null,
        limit= 10,
        page= null,
        orderBy= "year",
        direction= "desc"
    } = {}
) => new URLSearchParams(
{
        title,
        year,
        director,
        genre,
        limit,
        page,
        orderBy,
        direction
    }
).toString()


/**
 * https://developers.themoviedb.org/3/getting-started/images
 * It is recommended you cache this data within your application and check for updates every few days.
 */
const Search = (props) => {

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
    const {register, control, setValue, getValues} = useForm();

    const navigate = useNavigate();

    const searchParams = useParams();
    const {
        title,
        year,
        director,
        genre,
        limit,
        page,
        orderBy,
        direction
    } = useParams();

    // Initial posts to be an empty array instead of undefined
    const [movies, setMovies] = useState([]);
    const [gotMoviesInCart, setGotMoviesInCart] = useState(false)
    const [showAdvSearchOptions, setShowAdvSearchOptions] = useState(false);
    const [sortDirection, setSortDirection] = useState("desc")

    //extract the 'current' property of useRef, and give it a name
    const moviesInCartQuantities = useRef({});

    // Make useEffect depends on watchFields when using watchFields
    const watchFields = useWatch({
        control: control,
        name: ['genre', 'limit', 'direction', 'orderBy', 'page']
    })

    const getFormValues = () => {
        // filter out values of null types and empty strings
        const validEntries = Object.entries(getValues()).filter(
            ([key, value]) => !!value && value !== ""
        )
        const res = Object.fromEntries(validEntries)

        // console.log("formValues returned by getFormValues", res)

        return res
    }

    const constructSearchURLFromForms = () => {
        const formValues = getFormValues();
        formValues["genre"] = genreNamesToCodeNames[formValues["genre"]] === "" ? "null" : genreNamesToCodeNames[formValues["genre"]]
        const queryParams = constructSearchPageURLQueryStr(formValues)
        return `/search/${queryParams}`
    }

    // useEffect(async () => {
    //     console.log("WATCH-FIELD RE-RENDERING...")
    //
    //     const queryStr = constructSearchPageURLQueryStr({
    //         title: getValues("title"),
    //         year: getValues("year"),
    //         director: getValues("director"),
    //         genre: genreNamesToCodeNames[getValues("genre")],
    //         limit: getValues("limit"),
    //         page: getValues("page"),
    //         orderBy: getValues("orderBy"),
    //         direction: getValues("direction"),
    //     })
    //     console.log("queryStr when WATCH-FIELD navigates: ", queryStr)
    //     window.history.pushState({},"", `/search/${queryStr}`);
    //     // window.location.reload(false);
    //
    //     // navigate(`/search/${queryStr}`)
    //
    //     // await onSubmitSearchMovies();
    //
    //     // setRefresh(null)
    //
    // }, [watchFields]);

    useEffect(async () => {
        console.log("RE-RENDERING...")

        setValue("title", title !== "null" ? title.replaceAll("+", " ") : null)
        setValue("year", year !== "null" ? year : null)
        setValue("director", director !== "null" ? director.replaceAll("+", " ") : null)
        setValue("genre", genre !== "null" ? genreCodeNamesToNames[genre] : "")
        setValue("limit", limit !== "null" ? limit : "10")
        setValue("page", page !== "null" ? page : "1")
        setValue("orderBy", orderBy !== "null" ? orderBy : "year")
        setValue("direction", direction !== "null" ? direction : "desc")

        // if (director !== "null" || year !== "null") {
        //     setShowAdvSearchOptions(true)
        // }

        // console.log("getFormValues() BEFORE submitSearchMovies: ", getFormValues())

        await onSubmitSearchMovies();

    }, [title, year, director, genre, limit, page, orderBy, direction]);

    /**
     * Construct query params object for our request
     * and
     * make the request
     */
    const getMovies = async () => {
        // Create query params that will go with our request
        // and pass it to myRequests to make the request
        // Arguments that are null or undefined are ignored (done by jQuery).
        const movieSearchEndpointQueryParams = getFormValues()

        console.log("movieSearchEndpointQueryParams", movieSearchEndpointQueryParams)

        const response = await requestGETMovies(accessToken, movieSearchEndpointQueryParams)

        console.log(response.data.movies);

        setMovies(response.data.movies)
    }

    const retrieveMovieIdsInCart = async () => {
        const response = await requestGETCartRetrieve(accessToken)

        // console.log("Cart Retrieve response: ", response)
        // console.log("response.result.code === 3040: ", response.data.result.code === 3040)

        if (response.data.result.code === 3040) {
            for (const item of response.data.items) {
                moviesInCartQuantities.current[item.movieId] = item.quantity
            }

            setGotMoviesInCart(true)

            // console.log("moviesInCart: ", moviesInCartQuantities.current)
        }
    }

    const onSubmitSearchMovies = async () => {
        await getMovies();
        await retrieveMovieIdsInCart();
    }

    const resultPerPageOptions = {
        "10": "10",
        "25": "25",
        "50": "50",
        "100": "100"
    }

    const sortOptions = {
        "Year": "year",
        "Title": "title",
        "Rating": "rating"
    }

    const sxAdvSearchOptions = {
        width: '50%',
        minWidth: 'fit-content',
    }

    const selectInputStyles = {
        fontStyle: 'Roboto',
        fontSize: '1.1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: "0px",
        maxWidth: "fit-content",
    }

    const GOING_NEXT_PAGE = true;
    const GOING_PREV_PAGE = false;
    const onClickChangeResultPage = (goingNextPage) => {
        const curPageNum = parseInt(getValues("page"))
        let newPageNum = 1;
        if (!goingNextPage) {
            newPageNum = (curPageNum - 1 < 1) ? 1 : curPageNum - 1
        } else {
            newPageNum = curPageNum + 1
        }
        if (newPageNum !== curPageNum) {
            setValue("page", newPageNum)
            // console.log("Navigating to by PAGE: ", constructSearchURLFromForms())
            navigate(constructSearchURLFromForms())

            window.scrollTo(0, 0)
        }
    }

    const onSubmitTitle = () => {
        const title = getValues("title")
        setValue("title", title)
        // console.log("getValues(\"title\"): ", title)
        navigate(constructSearchURLFromForms())
    }


    return (
        <>
            <Grid container
                  direction="column"
                  spacing={4}
            >

                <Grid item
                      alignSelf="center"
                      sx={{
                          width: '50%',
                          minWidth: 'fit-content',
                      }}
                >
                    <Grid container item
                          direction="column"
                        // alignSelf="center"
                        //   sx={{
                        //       width: '50%',
                        //       minWidth: 'fit-content',
                        //   }}
                          rowSpacing={2}
                    >
                        <Grid container item direction="row"
                        >
                            <Grid item xs={11}>
                                <TextField
                                    defaultValue={""}
                                    label="Search title"
                                    type="search"
                                    variant="standard"
                                    {...register("title")}
                                    onKeyPress={(event) => {
                                        if (event.key === 'Enter') {
                                            onSubmitTitle()
                                        }
                                    }}
                                    sx={{
                                        display: 'flex',
                                    }}
                                />
                            </Grid>

                            <Grid item xs={1}
                                  sx={{
                                      alignSelf: 'end',
                                  }}
                            >
                                <IconButton
                                    onClick={() => navigate(constructSearchURLFromForms())}
                                    sx={{
                                        margin: '8px',
                                    }}
                                >
                                    <SearchIcon
                                    />
                                </IconButton>
                            </Grid>

                        </Grid>

                        {/*<Grid item>*/}
                        {/*    <TextField*/}
                        {/*        id="genreSelect"*/}
                        {/*        select*/}
                        {/*        label="Genre"*/}
                        {/*        defaultValue={""}*/}
                        {/*        {...register("genre")}*/}
                        {/*        sx={sxAdvSearchOptions}*/}
                        {/*        onChange={(e) => {*/}
                        {/*            console.log("Navigating to by GENRE: ", `/search/${constructSearchPageURLQueryStr({*/}
                        {/*                genre: genreNamesToCodeNames[e.target.value],*/}
                        {/*            })}`)*/}
                        {/*            navigate(`/search/${constructSearchPageURLQueryStr({*/}
                        {/*                genre: genreNamesToCodeNames[e.target.value],*/}
                        {/*            })}`)*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        {Object.entries(genreNamesToCodeNames).map(([genreName, genreCodeName]) => (*/}
                        {/*            <MenuItem key={genreName} value={genreName}>*/}
                        {/*                {genreName}*/}
                        {/*            </MenuItem>*/}
                        {/*        ))}*/}
                        {/*    </TextField>*/}
                        {/*</Grid>*/}

                        <Grid item>
                            <InputLabel id="genre-select-label">Genre</InputLabel>
                            <select
                                style={selectInputStyles}
                                id="genreSelect"
                                label="Genre"
                                defaultValue={"All"}
                                {...register("genre")}
                                onChange={(e) => {
                                    setValue("genre", e.target.value)
                                    console.log("Navigating to by GENRE: ", constructSearchURLFromForms())
                                    navigate(constructSearchURLFromForms())
                                }}
                            >
                                {Object.entries(genreNamesToCodeNames).map(([genreName, genreCodeName]) => (
                                    <option key={genreName} value={genreName}>
                                        {genreName}
                                    </option>
                                ))}
                            </select>
                        </Grid>

                        {
                            // DISPLAY ADVANCED SEARCH OPTIONS
                            !!showAdvSearchOptions ?
                                (
                                    <>
                                        <Grid item>
                                            <TextField
                                                label="Release Year"
                                                type="number"
                                                {...register("year")}
                                                sx={sxAdvSearchOptions}
                                                onKeyPress={(event) => {
                                                    if (event.key === 'Enter') {
                                                        setValue("year", event.target.value)
                                                        // console.log("Navigating to by YEAR: ", constructSearchURLFromForms())
                                                        navigate(constructSearchURLFromForms())
                                                    }
                                                }}
                                            />
                                        </Grid>

                                        <Grid item>
                                            <TextField
                                                label="Director Name"
                                                type="search"
                                                {...register("director")}
                                                sx={sxAdvSearchOptions}
                                                onKeyPress={(event) => {
                                                    if (event.key === 'Enter') {
                                                        setValue("director", event.target.value)
                                                        // console.log("Navigating to by DIRECTOR: ", constructSearchURLFromForms())
                                                        navigate(constructSearchURLFromForms())
                                                    }
                                                }}
                                            />
                                        </Grid>

                                        <Grid item
                                              sx={{
                                                  alignSelf: 'flex-end',
                                              }}
                                        >
                                            <Button
                                                endIcon={<KeyboardArrowUpIcon/>}
                                                onClick={() => setShowAdvSearchOptions(false)}
                                                sx={{
                                                    transform: 'scale(.75)',
                                                    textTransform: 'none',
                                                }}
                                            >Hide Search Options
                                            </Button>
                                        </Grid>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <Button
                                            endIcon={<KeyboardArrowDownIcon/>}
                                            onClick={() => setShowAdvSearchOptions(true)}
                                            sx={{
                                                alignSelf: 'flex-end',
                                                transform: 'scale(.75)',
                                                textTransform: 'none',
                                            }}
                                        >Advanced Search Options
                                        </Button>
                                    </>
                                )
                        }
                    </Grid>

                </Grid>
                {/*End of  Row: Advanced Search Options*/}

                <Grid item
                >
                    <Grid container
                          justifyContent="space-between"
                    >
                        {/*<Grid item*/}
                        {/*>*/}
                        {/*    <TextField*/}
                        {/*        select*/}
                        {/*        label="Results per Page"*/}
                        {/*        defaultValue={"10"}*/}
                        {/*        {...register("limit")}*/}
                        {/*        sx={{*/}
                        {/*            minWidth: "150px",*/}
                        {/*            maxWidth: "fit-content",*/}
                        {/*        }}*/}
                        {/*        onChange={(e) => {*/}
                        {/*            console.log("Navigating to by LIMIT: ", `/search/${constructSearchPageURLQueryStr({*/}
                        {/*                limit: e.target.value,*/}
                        {/*            })}`)*/}
                        {/*            navigate(`/search/${constructSearchPageURLQueryStr({*/}
                        {/*                limit: e.target.value,*/}
                        {/*            })}`)*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        {Object.entries(resultPerPageOptions).map(([k,v]) => (*/}
                        {/*            <MenuItem key={k} value={v}*/}
                        {/*            >*/}
                        {/*                {k}*/}
                        {/*            </MenuItem>*/}
                        {/*        ))}*/}
                        {/*    </TextField>*/}
                        {/*</Grid>*/}

                        <Grid item>
                            <InputLabel>Results per Page</InputLabel>
                            <select
                                style={selectInputStyles}
                                defaultValue={"10"}
                                {...register("limit")}
                                onChange={(e) => {
                                    setValue("limit", e.target.value)
                                    // console.log("Navigating to by LIMIT: ", constructSearchURLFromForms())
                                    navigate(constructSearchURLFromForms())
                                }}
                            >
                                {Object.entries(resultPerPageOptions).map(([k,v]) => (
                                    <option key={k} value={v}
                                    >
                                        {k}
                                    </option>
                                ))}
                            </select>
                        </Grid>

                        <Grid item>
                            <Grid container direction="row">

                                {/*<TextField*/}
                                {/*    select*/}
                                {/*    label="Sort By"*/}
                                {/*    defaultValue="year"*/}
                                {/*    {...register("orderBy")}*/}
                                {/*    sx={{*/}
                                {/*        minWidth: "100px",*/}
                                {/*        maxWidth: "fit-content",*/}
                                {/*    }}*/}
                                {/*    InputProps={{*/}
                                {/*        startAdornment: <InputAdornment position="start"><SortIcon/></InputAdornment>,*/}
                                {/*    }}*/}
                                {/*    onChange={(e) => {*/}
                                {/*        console.log("Execute onChange of Limit")*/}
                                {/*        console.log("Navigating to by ORDER-BY: ", `/search/${constructSearchPageURLQueryStr({*/}
                                {/*            orderBy: e.target.value,*/}
                                {/*        })}`)*/}
                                {/*        navigate(`/search/${constructSearchPageURLQueryStr({*/}
                                {/*            orderBy: e.target.value,*/}
                                {/*        })}`)*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    {Object.entries(sortOptions).map(([k,v]) => (*/}
                                {/*        <MenuItem key={k} value={v}>*/}
                                {/*            {k}*/}
                                {/*        </MenuItem>*/}
                                {/*    ))}*/}
                                {/*</TextField>*/}

                                <Grid item>
                                    <InputLabel>Sort By</InputLabel>
                                    <select
                                        style={selectInputStyles}
                                        defaultValue="year"
                                        {...register("orderBy")}
                                        onChange={(e) => {
                                            setValue("orderBy", e.target.value)
                                            // console.log("Navigating to by ORDER-BY: ", constructSearchURLFromForms())
                                            navigate(constructSearchURLFromForms())
                                        }}
                                    >
                                        {Object.entries(sortOptions).map(([k,v]) => (
                                            <option key={k} value={v}
                                            >
                                                {k}
                                            </option>
                                        ))}
                                    </select>
                                </Grid>

                                {
                                    // using useForm instead of useState to control display produces bug
                                    // getValues("direction") === "desc" ?
                                    sortDirection === "desc" ?
                                        <Button
                                            defaultValue="desc"
                                            value="desc"
                                            {...register("direction")}
                                            onClick={() => {
                                                setValue("direction", "asc")
                                                setSortDirection("asc")
                                                // console.log("Navigating to by DIRECTION: ", constructSearchURLFromForms())
                                                navigate(constructSearchURLFromForms())
                                            }}
                                        >
                                            <ArrowDownwardIcon
                                                sx={{
                                                    color: "grey",
                                                }}
                                            />
                                        </Button>
                                        :
                                        <Button
                                            defaultValue="asc"
                                            value="asc"
                                            {...register("direction")}
                                            onClick={() => {
                                                setValue("direction", "desc")
                                                setSortDirection("desc")
                                                // console.log("Navigating to by DIRECTION: ", constructSearchURLFromForms())
                                                navigate(constructSearchURLFromForms())
                                            }}
                                        >
                                            <ArrowUpwardIcon
                                                sx={{
                                                    color: "grey",
                                                }}
                                            />
                                        </Button>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> {/*End of  Row: Results per Page and Sort By*/}

                <Grid item> {/*Start of ResultPageNavBar*/}
                    <Grid container direction="row"
                          spacing={2}
                          alignItems="center"
                          justifyContent="center"
                          sx={{
                              minWidth: 'fit-content',
                          }}
                    >
                        <Grid item>
                            <Button
                                variant="outlined"
                                startIcon={<KeyboardArrowLeftIcon/>}
                                onClick={() => {
                                    onClickChangeResultPage(GOING_PREV_PAGE)
                                }}
                            >
                                Previous
                            </Button>
                        </Grid>

                        <Grid item>
                            <TextField
                                label="Page Number"
                                defaultValue={1}
                                type="number"
                                {...register("page")}
                                inputProps={{ min: 1}}
                                sx={{
                                    // min: '1',
                                    width: '100px',
                                }}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        setValue("page", event.target.value)
                                        // console.log("Navigating to by PAGE: ", constructSearchURLFromForms())
                                        navigate(constructSearchURLFromForms())
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item>
                            <Button
                                variant="outlined"
                                endIcon={<KeyboardArrowRightIcon/>}
                                onClick={() => {
                                    onClickChangeResultPage(GOING_NEXT_PAGE)
                                }}
                            >
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </Grid> {/*End of ResultPageNavBar*/}

                <Grid item>
                    <Grid container
                          spacing={2}
                        sx={{
                            justifyContent: 'space-evenly',
                        }}
                    >
                        {
                            // DISPLAY MOVIES once all async calls are done
                            !!movies && movies.length > 0 &&
                            <>
                                {
                                    movies.map((movie) => {
                                        // console.log("movie.id in moviesInCartQuantities.current", movie.id in moviesInCartQuantities.current)

                                        if (movie.id in moviesInCartQuantities.current) {
                                            return (
                                                <Grid item
                                                      key={movie.id}
                                                >
                                                    <>
                                                        <Button>{!!moviesInCartQuantities.current[movie.id]}</Button>
                                                        <MovieSearchResult movie={movie} quantity={moviesInCartQuantities.current[movie.id]}/>
                                                    </>
                                                </Grid>
                                            )
                                        }

                                        return (
                                            <Grid item
                                                  key={movie.id}
                                            >
                                                <>
                                                    <Button>{!!moviesInCartQuantities.current[movie.id]}</Button>
                                                    <MovieSearchResult movie={movie} quantity={0}/>
                                                </>
                                            </Grid>
                                        )

                                    })
                                }
                            </>
                        }
                    </Grid>

                </Grid> {/*End of  Row: containing all movies */}


                <Grid item> {/*Start of ResultPageNavBar*/}
                    <Grid container direction="row"
                          spacing={2}
                          alignItems="center"
                          justifyContent="center"
                          sx={{
                              minWidth: 'fit-content',
                          }}
                    >
                        <Grid item>
                            <Button
                                variant="outlined"
                                startIcon={<KeyboardArrowLeftIcon/>}
                                onClick={() => {
                                    onClickChangeResultPage(GOING_PREV_PAGE)
                                }}
                            >
                                Previous
                            </Button>
                        </Grid>

                        <Grid item>
                            <IconButton
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                <KeyboardArrowUpIcon/>
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <Button
                                variant="outlined"
                                endIcon={<KeyboardArrowRightIcon/>}
                                onClick={() => {
                                    onClickChangeResultPage(GOING_NEXT_PAGE)
                                }}
                            >
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </Grid> {/*End of ResultPageNavBar*/}


            </Grid>
        </>
    );
}

export default Search;
