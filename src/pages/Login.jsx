import React from "react";
import {useUser} from "hook/User";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {login} from "backend/idm";
import {NavLink, useNavigate} from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
    Link,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import {constructSearchPageURLQueryStr} from "./search/Search";


const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledH1 = styled.h1`
`

const StyledInput = styled.input`
`

const StyledButton = styled.button`
`
/**
 * useUser():
 * <br>
 * This is a hook we will use to keep track of our accessToken and
 * refreshToken given to use when the user calls "login".
 * <br>
 * For now, it is not being used, but we recommend setting the two tokens
 * here to the tokens you get when the user completes the login call (once
 * you are in the .then() function after calling login)
 * <br>
 * These have logic inside them to make sure the accessToken and
 * refreshToken are saved into the local storage of the web browser
 * allowing you to keep values alive even when the user leaves the website
 * <br>
 * <br>
 * useForm()
 * <br>
 * This is a library that helps us with gathering input values from our
 * users.
 * <br>
 * Whenever we make a html component that takes a value (<input>, <select>,
 * ect) we call this function in this way:
 * <pre>
 *     {...register("email")}
 * </pre>
 * Notice that we have "{}" with a function call that has "..." before it.
 * This is just a way to take all the stuff that is returned by register
 * and <i>distribute</i> it as attributes for our components. Do not worry
 * too much about the specifics of it, if you would like you can read up
 * more about it on "react-hook-form"'s documentation:
 * <br>
 * <a href="https://react-hook-form.com/">React Hook Form</a>.
 * <br>
 * Their documentation is very detailed and goes into all of these functions
 * with great examples. But to keep things simple: Whenever we have a html with
 * input we will use that function with the name associated with that input,
 * and when we want to get the value in that input we call:
 * <pre>
 * getValue("email")
 * </pre>
 * <br>
 * To Execute some function when the user asks we use:
 * <pre>
 *     handleSubmit(ourFunctionToExecute)
 * </pre>
 * This wraps our function and does some "pre-checks" before (This is useful if
 * you want to do some input validation, more of that in their documentation)
 */
const Login = () => {
    const navigate = useNavigate();

    const {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken
    } = useUser();


    const {register, getValues, handleSubmit} = useForm();

    const submitLogin = () => {
        const email = getValues("email");
        const password = getValues("password");

        const payLoad = {
            email: email,
            password: password.split('')
        }

        login(payLoad)
            .then(response => {
                setAccessToken(response.data.accessToken);
                setRefreshToken(response.data.refreshToken);

                alert(JSON.stringify(response.data.result.message, null, 2))

                const queryString = constructSearchPageURLQueryStr()

                console.log("queryString at Login: ", queryString)

                navigate(`/search/${queryString}`)
            })
            .catch(error => alert(JSON.stringify(error.response.data.result.message, null, 2)))
        ;
    }


    return (
        <>
            <Container maxWidth
                sx={{
                    marginTop: 8,
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4"
                            sx = {{
                                fontWeight: "bold"
                            }}
                >
                    Sign in
                </Typography>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    {...register("email")}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password")}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            submitLogin()
                        }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        backgroundColor: '#fab818',
                        color: 'black'
                    }}
                    onClick={submitLogin}
                > Sign In
                </Button>
                <Typography variant="body2">
                    <p>
                        Don't have an account? <Link href="/register" variant="body2">CREATE ONE</Link>
                    </p>
                </Typography>

            </Container>
        </>
    );
}

export default Login;
