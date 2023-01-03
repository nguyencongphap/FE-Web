import React from "react";
import {useUser} from "hook/User";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {register as registerUser} from "backend/idm";
import {useNavigate} from "react-router-dom"
import {Button, Container, Link, TextField, Typography} from "@mui/material";


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

const Register = () => {

    const navigate = useNavigate();

    const {register, getValues, handleSubmit} = useForm();

    const submitRegister = () => {
        const email = getValues("email");
        const password = getValues("password");

        const payLoad = {
            email: email,
            password: password
        }

        registerUser(payLoad)
            .then(response => {
                alert(JSON.stringify(response.data.result.message, null, 2))

                if (response.data.result.code === 1010) {
                    navigate(`/login`)
                }
            })
            .catch((error) => {
                alert(JSON.stringify(error.response.data.result.message, null, 2))
            })
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
                    Register
                </Typography>

                <Typography variant="body2"
                            sx={{
                                mt: 3,
                                alignSelf: 'flex-start',
                                fontSize: '0.7rem',
                            }}
                >
                    *Email must be of the form [email]@[domain].[extension], have 6-32 characters, and contain only
                    alphanumeric characters
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

                <Typography variant="body2"
                    sx={{
                        mt: 3,
                        alignSelf: 'flex-start',
                        fontSize: '0.7rem',
                    }}
                >
                    *Password must have 10-20 characters,
                    at least
                    1 upper-case character,
                    1 lower-case character,
                    and 1 numeric character.
                </Typography>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password")}
                    // onKeyPress={(event) => {
                    //     if (event.key === 'Enter') {
                    //         submitRegister()
                    //     }
                    // }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 3,  // margin-top
                        mb: 2,
                        backgroundColor: '#fab818',
                        color: 'black'
                    }}
                    onClick={submitRegister}
                > Register
                </Button>

            </Container>


            {/*<br/>*/}
            {/*<br/>*/}
            {/*<br/>*/}
            {/*<br/>*/}

            {/*<StyledDiv>*/}
            {/*    <h1>Register</h1>*/}

            {/*    <div>*/}
            {/*        <p>*/}
            {/*            Password length must be in range [10, 20]*/}
            {/*            and must have at least*/}
            {/*            1 upper-case character,*/}
            {/*            1 lower-case character,*/}
            {/*            and 1 numeric character.*/}
            {/*        </p>*/}
            {/*    </div>*/}

            {/*    <input {...register("email")} type={"email"}/>*/}
            {/*    <input {...register("password")} type={"password"}/>*/}

            {/*    <button onClick={() => {*/}
            {/*        submitRegister();*/}
            {/*        navigate("/login");*/}
            {/*    }}>Register</button>*/}
            {/*</StyledDiv>*/}
        </>
    );
}

export default Register;
