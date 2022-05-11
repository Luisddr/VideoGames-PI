import React from "react";
import Style from "./filterArea.module.css"
import {Link} from "react-router-dom"


export default function Filter ({handleChange, handleChangeFrom, handleGenreChange}){

    return (
        <form className={Style.filterArea} action="">
            <label htmlFor="sort">Sort by</label> 
            <select className={Style.inputs} name="sort" id="sort" onClick={handleChange}>
            <option value="">--sort By--</option>
            <option value="byAlpha">A-Z</option>
            <option value="byAlphaDesc">Z-A</option>
            <option value="byRating">Best Rated</option>
            <option value="byRatingDesc">Worst Rated</option>
            </select>
            <label htmlFor="selectFrom">Created or Existing</label>
            <select className={Style.inputs} name="selectFrom" id="selectFrom" onClick={handleChangeFrom}>
            <option value="">--games from--</option>
            <option value="">All Games</option>
            <option value="api">Games</option>
            <option value="db">My created games</option>   
            </select>
            <label htmlFor="genres">Search by Genres</label>
            <select className={Style.inputs} name="genres" id="genres" onClick={handleGenreChange}>
            <option value="">--Genres--</option>
            <option value="RPG">RPG</option>
            <option value="Indie">Indie</option>
            <option value="Strategy">Strategy</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Shooter">Shooter</option>
            <option value="Casual">Casual</option>
            <option value="Simulation">Simulation</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Arcade">Arcade</option>
            <option value="Platformer">Platformer</option>
            <option value="Racing">Racing</option>
            <option value="Massively Multiplayer">Massively Multiplayer</option>
            <option value="Sports">Sports</option>
            <option value="Fighting">Fighting</option>
            <option value="Family">Family</option>
            <option value="Board Games">Board Games</option>
            <option value="Educational">Educational</option>
            <option value="Card">Card</option>
            </select>
            <Link to={'/post'}>
            <button className={Style.button}>Create a New Game</button>
            </Link>
        </form>
    )
}