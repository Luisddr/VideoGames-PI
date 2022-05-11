import React from "react";
import { Link } from "react-router-dom";
import Style from "./card.module.css"

export default function Card({name, rating, genres, background_image, id}){

    return(
        <div className={Style.cardContainer}>
            <Link className={Style.decoration} to={`/videogame/${id}`}>
            <h4>{name}
            </h4>
            </Link>
            <Link to={`/videogame/${id}`}>
            <img className={Style.image} src={background_image} alt ={`${name} poster`} />
            </Link>
            <span className={Style.spanLengends}>Rating: {rating}</span>
            <span className={Style.spanLengends}>Genres: {genres}</span>
                            
        </div>
    )
}
