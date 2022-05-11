import React, { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameById } from "../../redux/actions";
import { Link } from "react-router-dom";
import Style from "./detail.module.css"

export default function VideogameDetail(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const videogame = useSelector(state => state.videogameDetail)
    let perW
    let platformsList
    let genres
    if(videogame.description){
      perW = videogame.description.split("<p>").join(" ").split("</p>").join(" ").split("< br>").join(" ").split("<br />").join(" ")
      console.log(videogame.description)
        
    } 

    if (videogame.platforms){
        if(typeof videogame.platforms[0] === Object){
            platformsList = videogame.platforms.map(p=>p.platform.name).join(", ")
        }
        else{
            platformsList = videogame.platforms.map(p=>p).join(", ")
        }
    }

    if(videogame.genres){
        genres = videogame.genres.map(g=>g.name).join(", ")
    }
    console.log(videogame)

    useEffect(()=>{
        dispatch(getVideogameById(id))
    },[dispatch, id])



    return(
        <>
        <div className={Style.background}>           
        <Link to={'/home'}>
        <button className={Style.button}>Regresar a home</button>
        </Link>
        <h3 className={Style.title}>{videogame.name}</h3>
        <img className={Style.image} src={videogame.background_image} alt="" />   
        <div className={Style.data}>
        <span ><u>Rating</u> {videogame.rating}</span>
        <span><u> Released</u> {videogame.released} </span>
        <span><u>Genres</u> {genres}</span>
        <span><u>Platforms</u>  {platformsList}</span>
        </div>
        <h3>Description</h3>
        <div className={Style.trap}>
        <article className={Style.article}>
             {perW}
        </article>
        </div>
        </div>
        </>
        
    )
}