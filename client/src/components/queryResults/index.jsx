import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card";
import {Link} from 'react-router-dom'
import Style from  "./queryResults.module.css"

export default function QueryResults(){
    const queryVideogames = useSelector((state)=>state.queryVideogames)
    return(
        <>
        <div className={Style.background}>

        <Link to={'/home'}>
        <button className={Style.button}>Regresar a la pÁgina principal</button>
        </Link>
        <h2 className={Style.title}>Resultados de la busqueda</h2>

        <div className={Style.cardsContainer}>

        {queryVideogames.length?
        queryVideogames.map(game=>(
            <Card name={game.name} id={game.id} background_image ={game.background_image} rating={game.rating} genres={game.genres.map(g=>g.name).join(", ")}/>
            ))
            :
            <div className={Style.loading}></div>
            
            
        }
        </div>
        </div>

        </>
    )
}
