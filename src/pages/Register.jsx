import React from "react";
import {useUser} from "hook/User";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {register as registerUser} from "backend/idm";
import {useNavigate} from "react-router-dom"


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
            .then(response => alert(JSON.stringify(response.data, null, 2)));
    }

    return (
        <StyledDiv>
            <h1>Register</h1>

            <div>
                <p>
                    Password length must be in range [10, 20]
                    and must have at least
                    1 upper-case character,
                    1 lower-case character,
                    and 1 numeric character.
                </p>
            </div>

            <input {...register("email")} type={"email"}/>
            <input {...register("password")} type={"password"}/>

            <button onClick={() => {
                submitRegister();
                navigate("/login");
            }}>Register</button>
        </StyledDiv>
    );
}

export default Register;
