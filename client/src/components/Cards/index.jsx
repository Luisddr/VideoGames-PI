import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllVideogames, getAllGamesSorted, getVideogamesFromApi, clearPage, getVideogamesByQuery} from '../../redux/actions';
import Card from "../Card";
import Filter from "../FilterArea";
import SearchaBar from "../SearchBar";
import Style from "./home.module.css"


export default function Cards(){
const dispatch = useDispatch()
const videogames = useSelector((state)=>state.videogames)
const next = useSelector((state)=>state.next)




const [page, setPage] = useState(1)
const [genre, setGenre] = useState("")
const [sort, setSort] = useState("")
const [from, setFrom] = useState("")
const [game, setGame] = useState("")

function getNextPage(){
    setPage(page + 1)
    
}

function getPreviousPage(){
    setPage(page - 1)
}

function getPageByNumber(){
    setPage(page +2)
}

function getBackPageByNumber(){
    setPage(page - 2)
}

function handleChange(e){
    
    setSort(e.target.value)
   
}

function handleChangeFrom(e){
    
    setFrom(e.target.value)
    
    
}

function handleGenreChange(e){
    setGenre(e.target.value)
}

function handleInputChange(e){
    setGame(e.target.value)
}

function onSubmmit (){
    dispatch(getVideogamesByQuery(page, game))
}




useEffect(()=>{

     if(from !== "" && page){
        dispatch(getVideogamesFromApi(page, from))
     }
},[dispatch, from, page])

useEffect(()=>{
    if(sort !== ""){
        dispatch(getAllGamesSorted(page, sort))
        
    }

},[dispatch, sort, page])

useEffect(()=>{
    if(from === "" && sort === ""){
        dispatch(getAllVideogames(page))

    }
    return ()=>{
        dispatch(clearPage())
    }
  
  
},[dispatch, page, sort,from]
)

    return(
        <>
        <div className={Style.backgroundHome}>
        <SearchaBar handleInputChange={handleInputChange} onSubmmit={onSubmmit}/>
        <Filter handleChange = {handleChange} handleChangeFrom={handleChangeFrom} handleGenreChange ={handleGenreChange}/>
        <h1 className={Style.title}>Gamer-City </h1>
        {page > 1 && game==="" &&
            <button className={Style.buttons} onClick={getPreviousPage}>{`<<`}</button>
        }
        
        {page > 2 && game ==="" &&
        <> 
        <button className={Style.buttons} onClick={getBackPageByNumber} >{page - 2}</button>
        <button className={Style.buttons} onClick={getPreviousPage} >{page - 1}</button>
        </>        
        }
        <button className={Style.buttons}>...</button>
        {next.hasOwnProperty("next") && game ==="" &&
        <>
        <button className={Style.buttons} onClick={getNextPage}>{page + 1}</button>
        <button className={Style.buttons} onClick={getPageByNumber}>{page + 2}</button>
        <button className={Style.buttons} onClick={getNextPage}>{`>>`}</button>
        </>
        }
            <div className={Style.cardsContainer}>
        {  
            genre.length ?
           videogames.filter(game=> game.genres.some(({name})=> name === genre)).map(game=>(
            <div key={game.id}>
                <Card name={game.name} id={game.id} background_image ={game.background_image} rating={game.rating} genres={game.genres.map(g=>g.name).join(", ") }/>
            </div>
        ))
           :
           videogames.length ?
        videogames.map(game=>(
            <div key={game.id}>
                <Card name={game.name} id={game.id} background_image ={game.background_image} rating={game.rating} genres={game.genres.map(g=>g.name).join(", ")}/>
            </div>
        ))
        :
        (<div className={Style.loading}>
        </div>
            )
        
        }
        </div>
       
       </div>
        </>
    )
}

