import {GET_ALL_VIDEOGAMES, GET_VIDEOGAMES_FROM_API, GET_VIDEOGAMES_FROM_DB, GET_VIDEOGAMES_BY_GENRE, GET_VIDEOGAME_BY_QUERY, GET_VIDEOGAME_BY_ID, GET_ALL_GENRES,CREATE_NEW_VIDEOGAME, GET_ALL_GAMES_SORTED, GET_VIDEOGAMES_BY_QUERY_SORTED, GET_VIDEOGAMES_FROM_API_SORTED, GET_VIDEOGAMES_FROM_DB_SORTED, CLEAR_PAGE} from '../actions/actionTypes'

const initialState = {
    videogames: [],
    queryVideogames: [],
    genres: [],
    videogameDetail: {},
    next:{},
};

export default function reducer(state = initialState, {type, payload}){
    switch(type){
        case GET_ALL_VIDEOGAMES:
            return{
                ...state,
                videogames:payload.results,
                next: payload
            }
        case GET_ALL_GAMES_SORTED:
            return{
                ...state,
                videogames:payload
        }
        case GET_VIDEOGAMES_FROM_API:
            return{
                ...state,
                videogames: payload
            }
        case GET_VIDEOGAMES_FROM_API_SORTED:
            return{
                ...state,
                videogames: payload
            }
        case GET_VIDEOGAMES_FROM_DB:
            return{
                ...state,
                videogames: payload
            }
        case GET_VIDEOGAMES_FROM_DB_SORTED:
            return{
                ...state,
                videogames: payload
            }
        case GET_VIDEOGAMES_BY_GENRE:
            return{
                ...state,
                videogames: payload
            }
        case GET_VIDEOGAME_BY_QUERY:
            return{
                ...state,
                queryVideogames: payload
            }

        case GET_VIDEOGAMES_BY_QUERY_SORTED:
            return{
                ...state,
                videogames: payload
            }
        case GET_VIDEOGAME_BY_ID:
            return{
                ...state,
                videogameDetail: payload
            }
        case GET_ALL_GENRES:
            return{
                ...state,
                genres: payload
        }
        case CREATE_NEW_VIDEOGAME:
            return{
                ...state
            }
        case CLEAR_PAGE:
            return{
                ...state,
                videogames:[]
            }



        default:
            return state
    }
}