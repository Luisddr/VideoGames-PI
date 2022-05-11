import React from "react";
import { Link } from "react-router-dom";
import Style from "./landing.module.css"


export default function LandingPage(){

    return(
        <>
        <Link to={'/home'}>
        <h1 className={Style.title}>Welcome to Gamer-City <br /> 
        <span className={Style.controler}>
        <i class="bi bi-play-circle"></i>
        </span> 
        Press Start</h1>
        </Link>
        </>
    )
}