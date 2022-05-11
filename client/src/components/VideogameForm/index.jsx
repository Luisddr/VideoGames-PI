import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux"
import { getAllGenres, createNewVideogame, getVideogamesFromApi } from "../../redux/actions";
import Style from "./form.module.css" 
import {Link, useHistory} from "react-router-dom"


export function validate(data){ 
    
    let errors = {};
    if (!data.name){ 
        errors.name = 'A valid name is required'
    }
  
    if(!data.description){
        errors.description = 'Write 20 words minimun for the description'
  
    }
    else if (data.description.length<20){
        errors.description = 'Description is invalid'
    }

    if (!data.platforms){
        errors.platforms = 'You must check at least one option'
    }
    if(!data.genres){
        errors.genres = 'You must check at least one option'
    }

    if(typeof data.rating !== "number"){
        errors.rating = 'rating should be a number'
    }

    else if(data.rating < 0 || data.rating >5){
        errors.rating = 'rating should be a number between 0 and 5'
    }

    if(typeof data.background_image !== "string"){
        errors.background_image = 'please insert a valid image direction'
    }
    else if(!/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(data.background_image)){
        errors.background_image = 'please enter a valid img url'
    }
  
    return errors
  }



export default function Form (){
    const dispatch = useDispatch()
    const history = useHistory();
    const existingVideogames = useSelector((state)=>state.videogames)
    const genres = useSelector((state)=>state.genres)
    const [data, setData] = useState({
        name:"",
        description:"",
        release: "",
        background_image:"",
        rating: 0,
        platforms:[],
        genres:[]
    })

    const [errors, setErrors] = useState({})

    function handleChange(e){
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...data,
            [e.target.name]: e.target.value
        }))
    }

    function handleRating(e){
        setData({
            ...data,
            rating: parseFloat(e.target.value)
        })
        setErrors(validate({
            ...data,
            rating: parseFloat(e.target.value)
        }))
    }

    function handleCheckedOptions(e){
        setData({
           ...data,
           platforms : [...data.platforms, e.target.value] 
        })
        setErrors(validate({
            ...data,
            platforms : [...data.platforms, e.target.value]
        }))
    }
    

    function handleCheckedOptionsGenres(e){
        setData({
           ...data,
           genres : [...data.genres, e.target.value] 
        })
        setErrors(validate({
            ...data,
           genres : [...data.genres, e.target.value] 
        }))
    }
    
    function onSubmit(e){
        e.preventDefault()
        console.log(data)
        console.log(errors)
        if(!errors.name && !errors.description && !errors.genres && !errors.platforms && !errors.rating){
            dispatch(createNewVideogame(data))
            alert("Videogame has succesfully added to data base")
            history.push('/home')
        }
        else{
            alert("There are missing data, please check the required fields")
        }
    }


    useEffect(()=>{
        dispatch(getAllGenres())
        // dispatch(getVideogamesFromApi(1,db))

    },[dispatch])
   



    return(
        <>
        <div className={Style.background}>
            <Link to={'/home'}>
            <button className={Style.button}>Regresar a Home</button>
            </Link>
            <h1 className={Style.title}>Add a new game</h1>
        <div className={Style.form}>
            <label >
             Name   
            <input type="text" name="name"id="name" onChange={handleChange} placeholder="Enter the videogame name to add on the database" className={errors.name && Style.danger}/>
            {errors.name && <span className={Style.danger}>{errors.name}</span>}
            </label>
            <label >rating
            <input type="number" step=".10"  onChange={handleRating}/>
            {errors.rating && <span className={Style.danger}>{errors.rating}</span>}
            </label>
            <label>Paste a image link
                <input type="text" name="background_image" id="background_image" onChange={handleChange}/>

            </label>
            <div>
            <label>
            Description
            {errors.description && <span className={Style.danger}>{errors.description}</span>}
            </label> <br />
            <textarea name="description" id="description" cols="30" rows="10" placeholder="Tell us about this videogame. Twenty words minimum" onChange={handleChange}></textarea>
            </div>
            <label>
            Released date
            <input type="date" name="release" id="release" onChange={handleChange} />
            </label>
            <hr />
            <legend><strong> Plataformas </strong> </legend>
                <div className={Style.form2}>

                <label>Xbox
                <input name="xbox" value="xbox" type="checkbox" onChange={handleCheckedOptions}/></label>
                <label>Xbox 360                    
                <input name="xbox360" value="xbox360" type="checkbox"onChange={handleCheckedOptions}/>
                </label>
                <label>Xbox One
                <input name="xboxOne" value="xboxOne" type="checkbox" onChange={handleCheckedOptions}/>
                </label>
                <label>Xbox Series
                <input name="xboxSeries" value="xboxSeries" type="checkbox" onChange={handleCheckedOptions}/>
                </label>
                <label>PlayStation
                <input name="playstation" value="playstation" type="checkbox" onChange={handleCheckedOptions}/>
                </label>
                <label>PlayStation 2
                <input name="playstation2" value="playstation2" type="checkbox" onChange={handleCheckedOptions}/>
                </label>
                <label>PlayStation 3
                <input name="playstation3" value="playstation3" type="checkbox" onChange={handleCheckedOptions}/>
                </label>
                <label>PlayStation 4
                <input name="playstation4" value="playstation4" type="checkbox" onChange={handleCheckedOptions}/>
                </label>
                <label>PlayStation 5
                <input name="playstation5" value="playstation5" type="checkbox" onChange={handleCheckedOptions}/>
                </label>
                <label>SNES
                <input name="ninentendo" value="nintendo" type="checkbox" onChange={handleCheckedOptions}/>
                </label>
                <label>Nintendo 64                    
                <input name="nintendo64" value="nintendo64" type="checkbox" onChange={handleCheckedOptions}/>
                </label>
                <label>Wii
                <input value="wii" type="checkbox" onChange={handleCheckedOptions}/>
                </label>
                <label>Nintendo Switch
                <input name="nintendoSwitch" value="nintendoSwitch" type="checkbox" onChange={handleCheckedOptions}/>
                </label>
                {errors.platforms && <span className={Style.danger}>{errors.platforms}</span>}
                </div>
            
                <legend><strong>Generos</strong></legend>
                <div className={Style.form2}>

            {   
                
                genres.map(g=>(
                    <div key={g.id}>
                    <input type="checkbox" value={g.name} name={g.name} onChange={handleCheckedOptionsGenres} />
                    <label>{g.name}</label>

                    </div>
                    
                    ))
                }
                {errors.genres && <span className={Style.danger}>{errors.genres}</span>}
                </div>
            <Link to={'/success'}>
            <button className={Style.button} type="submit" onClick={onSubmit}>Submit Videogame</button>
            </Link>
        </div>
                </div>
        </>
    )
}