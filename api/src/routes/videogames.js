const {Router} = require('express');
const {Videogame, Genre} = require('../db.js')
const {Op} = require('sequelize')
const router = Router()
const axios = require('axios')


router.get('/', async(req, res, next) =>{
    const {game, sort, byGenre, from} = req.query
    //console.log(req.query)
    let result
    let result1
    let result2
    let apiGames1 = await axios.get('https://api.rawg.io/api/games?key=37a523429b884004a04522127ae577ec')
    let apiGames2 = await axios.get('https://api.rawg.io/api/games?key=37a523429b884004a04522127ae577ec&page=2')
    let apiGames3 = await axios.get('https://api.rawg.io/api/games?key=37a523429b884004a04522127ae577ec&page=3')
    let apiGames4 = await axios.get('https://api.rawg.io/api/games?key=37a523429b884004a04522127ae577ec&page=4')
    let apiGames5= await axios.get('https://api.rawg.io/api/games?key=37a523429b884004a04522127ae577ec&page=5')
    let apiGames = [...apiGames1.data.results, ...apiGames2.data.results, ...apiGames3.data.results, ...apiGames4.data.results, ...apiGames5.data.results]
    let apiByQuery = await axios.get(`https://api.rawg.io/api/games?search=${game}&key=37a523429b884004a04522127ae577ec`)
    //console.log(apiByQuery.data.results.length)
    //console.log(apiByQuery.data.results)
    try{
    if(game !==undefined){
        result1 = await Videogame.findAll({
            //limit:15, 
            where:{
            name:{
                //[Op.substring]:game
                
                 [Op.iLike]: `%${game}%`
            }
        }, 
        include: Genre
    })

        var keys_to_keep = ["name", "released", "id", "background_image", "rating", "platforms", "genres"]
            result2 = apiByQuery.data.results.map(g=>{
            const obj = {}
            keys_to_keep.forEach(k=>obj[k] = g[k])
            return obj
        })
       
       result = [...result1, ...result2]
      
       if(sort){
           if (sort === "byAlpha"){
            result = [...result1, ...result2].sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))

           }
           else if(sort === 'byAlphaDesc'){
            result = [...result1, ...result2].sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0)).reverse()
            console.log(result.length)

           }
           else if(sort === 'byRatingDesc'){
            result = [...result1, ...result2].sort((a,b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0))
           }
           else if(sort ==='byRating'){
            result = [...result1, ...result2].sort((a,b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0))
           }
       }

        if(result.length === 0){
            return res.send({mensaje: `No tenemos a <<${game}>> en nuestro catalogo. Agregalo y ayuda a otros usarios a encontrarlo`})
        }
    }
    else if(byGenre){
        
        let relatedToApi = apiGames.filter(game=>
            game.genres.some(({name})=>name === `${byGenre}`))
        
      
        var keys_to_keep = ["name", "released", "background_image", "rating", "platforms", "genres"]
        result1 = relatedToApi.map(g=>{
            const obj = {}
            keys_to_keep.forEach(k=>obj[k] = g[k])
            return obj
        })
        let relatedToDb = await Genre.findAll({where: {name: `${byGenre}`}, include: Videogame})
        

        result = [...result1, ...relatedToDb]
       
    }
    else if(from){
        if(from === "api"){
            var keys_to_keep = ["name", "released", "id", "background_image", "rating", "platforms", "genres"]
            result = apiGames.map(g=>{
                const obj = {}
                keys_to_keep.forEach(k=>obj[k] = g[k] )
                return obj
            })
            if(sort){
                if(sort === 'byAlpha'){
                    result.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))
                }
                else if(sort === 'byAlphaDesc'){
                    result.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0)).reverse()
                }
                else if(sort === 'byRating'){
                    result.sort((a,b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0))

                }
                else if(sort === 'byRatingDesc'){
                    result.sort((a,b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0))
                }
            }
        }
        else if (from === 'db'){
            result = await Videogame.findAll({include: Genre})
            if(sort){
                if(sort === 'byAlpha'){
                    result.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))
                }
                else if(sort === 'byAlphaDesc'){
                    result.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0)).reverse()
                }
                else if(sort === 'byRating'){
                    result.sort((a,b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0))

                }
                else if(sort === 'byRatingDesc'){
                    result.sort((a,b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0))
                }
            }
        }

    }
    
    else{
        var keys_to_keep = ["name", "id", "released", "background_image", "rating", "platforms", "genres", "description"]
        result1 = apiGames.map(g=>{
            const obj = {}
            keys_to_keep.forEach(k=>obj[k] = g[k] )
            return obj
        })

        result2 = await Videogame.findAll({
            include: Genre
        })

        result = [...result1, ...result2]
        if(sort){
            if (sort === "byAlpha"){
             result = [...result1, ...result2].sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))
 
            }
            else if(sort === 'byAlphaDesc'){
             result = [...result1, ...result2].sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0)).reverse()
             console.log(result.length)
 
            }
            else if(sort === 'byRatingDesc'){
             result = [...result1, ...result2].sort((a,b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0))
            }
            else if(sort ==='byRating'){
             result = [...result1, ...result2].sort((a,b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0))
            }
        }
        console.log(result.length)

    }
const page = parseInt(req.query.page)
const limit = 15

const startIndex = (page -1) * limit
const endIndex = page * limit

const results = {}
if(endIndex < result.length)
results.next = {
  page: page +1,
  limit: limit
}
if(startIndex>0){
  results.previous = {
    page: page -1,
    limit: limit
  }

}

results.results = result.slice(startIndex, endIndex)
    res.json(results)

    }
    catch(err){
        next(err)
    }
})


module.exports = router