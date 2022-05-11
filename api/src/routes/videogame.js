const {Router} = require('express');
const {Videogame, Genre} = require('../db.js')
const router = Router()
const axios = require('axios')
// - [ ] __POST /videogame__:
//   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
//   - Crea un videojuego en la base de datos

// - [ ] Videojuego con las siguientes propiedades:
//   - ID: * No puede ser un ID de un videojuego ya existente en la API rawg
//   - Nombre *
//   - Descripción *
//   - Fecha de lanzamiento
//   - Rating
//   - Plataformas *

//cuidar input de genres debe ser array
router.post('/', async(req, res, next) =>{
    let gameGenres
   try{
    const{name, description, released, rating, platforms, genres} = req.body
    if(!name || !description || !platforms){
        res.status(400).json({message: "Some data is missing: name, description and platforms are required"})
    }
    else if (typeof name !== 'string' || typeof description !== 'string'){
        res.status(400).json({message: "Data not allowed. It must be text"})
    }
    else{
        const game = await Videogame.create(req.body);
        //await game.addGenre(genres[0])
        // let losGeneros = await Genre.findAll({where:
        //     {name: genres[0]}
        // })
        let genresMap = genres.map((g)=>{
            return Genre.findOne({
                where: {name:g}
            })
        })
        console.log(genresMap)
        const genresPromise = await Promise.all(genresMap)
        console.log(genresPromise)

        await game.addGenre(genresPromise)
     
        res.status(201).json(game)

    }

   }
    catch (err){
        next(err)
    }
})

// [ ] __GET /videogame/{idVideogame}__:
// - Obtener el detalle de un videojuego en particular
// - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// - Incluir los géneros asociados
router.get('/:idVideogame', async(req, res, next)=>{
    try{
        const {idVideogame} = req.params
        let result
        const regexUuid = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/
        if (regexUuid.test(idVideogame)){
            result = await Videogame.findOne({
                where: {id: idVideogame},
                include: Genre
            })
        }
        else{
                let gameFromApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=37a523429b884004a04522127ae577ec`)
    
                result = (({released, name, description, rating, platforms, genres, background_image})=>({released,name, description, rating, platforms, genres, background_image}))(gameFromApi.data)

        }
        res.json(result)
    }
    catch(err){
        next(err)
    }
})
   

module.exports = router