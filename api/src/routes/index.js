const { Router} = require('express');
const express = require('express')
const videogameRoutes = require('./videogame.js')
const videogamesRoutes = require('./videogames.js')
const genreRoutes = require('./genres.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// router.use(express.json());

router.use('/videogame', videogameRoutes)
router.use('/videogames', videogamesRoutes)
router.use('/genres', genreRoutes)




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// Únicos Endpoints/Flags que pueden utilizar
// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}


module.exports = router;
