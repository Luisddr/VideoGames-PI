import React from "react";
import {Link} from "react-router-dom"
import Style from "./success.module.css"

export default function Success(){
    <>
    <div className={Style.background}>

    <h1>Game has been successfully added to data base</h1>
    <Link to={'/home'}>
    <button>Go Home</button>
    </Link>
    </div>
    </>
}