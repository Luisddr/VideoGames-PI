import {GET_ALL_VIDEOGAMES, GET_VIDEOGAMES_FROM_API, GET_VIDEOGAMES_FROM_DB, GET_VIDEOGAMES_BY_GENRE, GET_VIDEOGAME_BY_QUERY, GET_VIDEOGAME_BY_ID, GET_ALL_GENRES,CREATE_NEW_VIDEOGAME, GET_ALL_GAMES_SORTED, GET_VIDEOGAMES_BY_QUERY_SORTED, GET_VIDEOGAMES_FROM_API_SORTED, GET_VIDEOGAMES_FROM_DB_SORTED, CLEAR_PAGE, SORTVIDEOGAMESBYGENRE} from './actionTypes'
import axios from 'axios'

export function getAllVideogames(page){
    return dispatch =>{
        return axios.get(`http://localhost:3001/videogames?page=${page}`)
        .then(res=> dispatch({type: GET_ALL_VIDEOGAMES, payload: res.data}))
    }
}

export function getAllGamesSorted(page, sort){
    return dispatch =>{
        return axios.get(`http://localhost:3001/videogames?page=${page}&sort=${sort}`)
        .then(res=> dispatch({type: GET_ALL_GAMES_SORTED, payload: res.data.results}))
    }
}


export function getVideogamesFromApi(page, from){
    return dispatch =>{
        return axios.get(`http://localhost:3001/videogames?page=${page}&from=${from}`)
        .then(res=> dispatch({type: GET_VIDEOGAMES_FROM_API, payload: res.data.results}))
    }
}

export function getVideogamesFromApiSorted(page, sort){
    return dispatch =>{
        return axios.get(`http://localhost:3001/videogames?page=${page}&from=api&sortBy=${sort}`)
        .then(res=> dispatch({type: GET_VIDEOGAMES_FROM_API_SORTED, payload: res.data.results}))
    }
}

export function getVideogamesFromDb(page){
    return dispatch =>{
        return axios.get(`http://localhost:3001/videogames?page=${page}&from=db`)
        .then(res=> dispatch({type: GET_VIDEOGAMES_FROM_DB, payload: res.data.results}))
    }
}

export function getVideogamesFromDbSorted(page, sort){
    return dispatch =>{
        return axios.get(`http://localhost:3001/videogames?page=${page}&from=db&sortBy=${sort}`)
        .then(res=> dispatch({type: GET_VIDEOGAMES_FROM_DB_SORTED, payload: res.data.results}))
    }
}

export function getVideogameByGenre(page, genre){
    return dispatch =>{
        return axios.get(`http://localhost:3001/videogames?page=${page}&byGenre=${genre}`)
        .then(res=> dispatch({type: GET_VIDEOGAMES_BY_GENRE, payload: res.data.results}))
    }
}

export function getVideogamesByQuery(page, game){
    return dispatch =>{
        return axios.get(`http://localhost:3001/videogames?page=${page}&game=${game}`)
        .then(res=> dispatch({type: GET_VIDEOGAME_BY_QUERY, payload: res.data.results}))
    }
}

export function getVideogamesByQuerySorted(page, game, sort){
    return dispatch =>{
        return axios.get(`http://localhost:3001/videogames?page=${page}&${game}&sortBy=${sort}`)
        .then(res=> dispatch({type: GET_VIDEOGAMES_BY_QUERY_SORTED, payload: res.data.results}))
    }
}

export function getVideogameById(id){
    return dispatch =>{
        return axios.get(`http://localhost:3001/videogame/${id}`)
        .then(res=> dispatch({type: GET_VIDEOGAME_BY_ID, payload: res.data}))
    }
}

export function getAllGenres(){
    return dispatch =>{
        return axios.get(`http://localhost:3001/genres`)
        .then(res=> dispatch({type: GET_ALL_GENRES, payload: res.data}))
    }
}

export function createNewVideogame(payload){
    return async function(dispatch){
        const response = await axios.post(`http://localhost:3001/videogame`,payload)
    
    }
}

export function sortByGenre(payload){
    return{
        type: SORTVIDEOGAMESBYGENRE
    }
}


export function clearPage(){
    return {
      type: CLEAR_PAGE
    }
  }