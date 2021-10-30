const { Router } = require('express');
const { Recipe, Diet } = require('../db')
require('dotenv').config();
const { API_KEY } = process.env
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const model = require('../apiInfo/allData')

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', async (req, res, next) => {
    const { name } = req.query;
    const recipes = await model.allData()
    if (name) {
        try {
            let recipeQuery = await recipes.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
            recipeQuery.length ?
                res.send(recipeQuery) :
                res.send('No existen recetas con ese nombre :(')
        } catch (error) {
            next(error)
        }
    } else {
        res.send(recipes)
    }
});

// precargar primero la bd con los tipos de dieta
/* router.get('/recipes/:id', async (req, res, next) => {
    const {id} = req.params;
    
    // hacer un concat con los tipos de dieta?
    res.send()

}); */

router.get('/types', async (req, res, next) => {
    try {
        const diets = await model.allDiets();
        diets.length ?
        res.send(diets) :
        res.send('no se encontraron dietas')
    } catch(e){
        next(e)
    }
})

// - [ ] __GET /recipes?name="..."__:
//   - Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
//   - Si no existe ninguna receta mostrar un mensaje adecuado

// - [ ] __GET /recipes/{idReceta}__:
//   - Obtener el detalle de una receta en particular
//   - Debe traer solo los datos pedidos en la ruta de detalle de receta
//   - Incluir los tipos de dieta asociados

// - [ ] __GET /types__:
//   - Obtener todos los tipos de dieta posibles
//   - En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular [acá](https://spoonacular.com/food-api/docs#Diets)

// - [ ] __POST /recipe__:
//   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
//   - Crea una receta en la base de datos


module.exports = router;
