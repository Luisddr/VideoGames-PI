const {Router, response} = require('express');
const {Genre, Videogame} = require('../db.js')
const axios = require('axios')
const router = Router()

// [ ] __GET /genres__:
//   - Obtener todos los tipos de géneros de videojuegos posibles
//   - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí


// async function GetGenre(){
//         let gen = await Genre.findAll();
//         if(gen.length === 0){
//             let genres = await axios.get('https://api.rawg.io/api/genres?key=37a523429b884004a04522127ae577ec')
//             let myGenres = genres.data.results
//             let result = myGenres.map(async g=>{
//                 await Genre.create({name: g.name})
//             })    
//             return{
//             result

//             }

//         }
//         else{
//             return
//         } 
    
                      
// } 

// GetGenre()



router.get('/', async (req, res, next)=>{
    try{
        const result = await Genre.findAll()
        res.send(result)
    
    
    }
    catch (err){
        next(err)
    }
})

router.exports
  

module.exports = router



