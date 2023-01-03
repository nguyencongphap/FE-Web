import React, {useEffect, useRef, useState} from "react";
import {requestDELETECartDelete, requestPOSTCartInsert, requestPOSTCartUpdate} from "../../backend/billing";
import {useUser} from "../../hook/User";
import {useForm} from "react-hook-form";
import {Button, ButtonBase, ButtonGroup, FormControlLabel, IconButton, Input, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const AddToCartBar = ({movie, quantity}) => {

    const {
        accessToken
    } = useUser();

    // use both useRef and useState because we update curQuantity  and make async call with the
    // updated value and we don't want the re-rendering to happen in that process (because it messes up
    // the async call)
    // . However, once that process is done, we want re-rendering to happen because we want the UI to show
    // the most up-to-date value
    let curQuantity = useRef(quantity)
    const [curQuantityToDisplay, setCurQuantityToDisplay] = useState(quantity)


    // whenever this component receives a new prop, we want to update useRef and useState vars
    useEffect(() => {
        curQuantity.current = quantity;
        setCurQuantityToDisplay(quantity);
    }, [quantity])


    const decreaseItemQuantity = async () => {
        if (curQuantity.current === 0) {
            return
        }

        curQuantity.current -= 1;
        if (curQuantity.current === 0) {
            await requestDELETECartDelete(accessToken, movie.id)
        }
        else {
            await requestPOSTCartUpdate(accessToken, movie.id, curQuantity.current)
        }

        setCurQuantityToDisplay(curQuantity.current)
    }

    const increaseItemQuantity = async () => {

        curQuantity.current += 1;

        await requestPOSTCartUpdate(accessToken, movie.id, curQuantity.current)
        setCurQuantityToDisplay(curQuantity.current)
    }


    return (
        <>
            {/*<Button>From AddToCartBar Props: {quantity}</Button>*/}
            {/*<Button>From AddToCartBar Ref: {curQuantity.current}</Button>*/}
            {/*<Button>From AddToCartBar State: {curQuantityToDisplay}</Button>*/}
            {
                curQuantityToDisplay === 0 ?
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        size="medium"
                        onClick={async () => {
                            await requestPOSTCartInsert(accessToken, movie.id, 1)
                            curQuantity.current = 1
                            setCurQuantityToDisplay(1)
                        }}
                        sx={{
                            marginY: '16px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            color: '#23252b',
                            backgroundColor: '#fab818',
                            "&:hover": {backgroundColor: "#fab818", }
                        }}
                    >Add</Button>

                    :

                    <Button
                        variant="contained"
                        startIcon={
                            <IconButton size="small"
                                        onClick={() => decreaseItemQuantity()}
                            >
                                <RemoveIcon/>
                            </IconButton>
                        }
                        endIcon={
                            <IconButton size="small"
                                        onClick={() => increaseItemQuantity()}
                            >
                                <AddIcon/>
                            </IconButton>
                        }
                        disableElevation
                        disableRipple
                        disableFocusRipple
                        sx={{
                            marginY: '16px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            color: '#23252b',
                            backgroundColor: '#fab818',
                            "&:hover": {backgroundColor: "#fab818", }
                        }}
                    >
                        {
                            curQuantityToDisplay
                        }
                    </Button>
            }
        </>
    )
}

export default AddToCartBar;
