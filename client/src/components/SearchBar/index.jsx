import React from "react";
import {Link} from "react-router-dom"
import Style from "./searchBar.module.css"

export default function SearchaBar({onSubmmit, handleInputChange}){

    return(
        <>
        <input className={Style.inputs} type="text" name="search" id="search"  onChange={handleInputChange} placeholder="Search for...Dark Souls"/>
        <Link to={'/searchByQuery'}>
        <button className={Style.button} onClick={onSubmmit} >Search Games</button>
        </Link>
        </>
    )

}