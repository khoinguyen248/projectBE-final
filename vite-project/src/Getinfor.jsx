import React from "react";
import { useState,  useEffect } from "react";
import { getInfors } from "./api";

const Getinfor = () => {

    const [employee, setEmployee] = useState({})

    const fetching = async () =>  {
        try {
            const email = localStorage.getItem("email")
            const response =  await getInfors(email)

            console.log(response.data)
        } catch (err) {
            console.error("Fetching failed:", err.response?.data || err.message);
        }
    }

    useEffect(
      ( ) => {fetching()}, [])


    return(
        <>
        <p>akdnlqwkndqlwndklqndklqwndlqkwn</p>
        
        </>
    )
}

export default Getinfor