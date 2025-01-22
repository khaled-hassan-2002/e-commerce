import { createContext, useContext } from "react";
import axios from 'axios';
import React from 'react'
import { UserContext } from "./UserContext";



export let CartContext = createContext()


export default function CartContextProvider(props) {


    let userToken = localStorage.getItem('UserToken')

    let headers = {
        token: userToken
    }
    function getCArt() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((res) => res)
            .catch((error) => error)
    }
    function addToCart(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: id
        }, {
            headers
        })
            .then((response) => response)
            .catch((error) => error)
    }

    return <CartContext.Provider value={{ addToCart, getCArt }}>
        {props.children}
    </CartContext.Provider>
}
