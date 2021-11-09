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
            let recipeQuery = await recipes.filter(r => r.name.toLowerCase().includes(name.toString().toLowerCase()));
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
// INCLUIR TIPOS DE DIETA
router.get('/recipes/:id', async (req, res, next) => {
    const {id} = req.params;
    // traer todas las recetas, filtrar por id e incluir el tipo de dieta asociado
    const recipes = await model.allData();
    if(id){
        const recipesID = await recipes.filter(r => r.id === parseInt(id));
        recipesID.length ?
        res.send(recipesID) :
        res.send('No se encontró receta :/')
    }else{
        res.send('Ingresar un ID please')
    }


});

router.get('/types', async (req, res, next) => {
    try {
        const diets = await Diet.findAll();
        diets.length ?
        res.send(diets) :
        res.send('error al traer dietas');
    } catch(e){
        next(e)
    }
});

router.post('/recipe', async (req, res) => {
    const {name, summary, score, healthScore,image, stepByStep, diets} = req.body;
    const newRecipe = await Recipe.create({
        name,
        summary,
        score,
        image,
        healthScore: healthScore,
        instructions: stepByStep
    });
    diets.map( async d => {
        const dbDiet = await Diet.findOrCreate({
            where: {
                name: d
            }
        })
        newRecipe.addDiet(dbDiet[0]);
    })
    res.send('¡Receta creada con éxito!')
});
// RECORDAR CAMBIAR EL FORCE A TRUE ANTE CAMBIOS EN LA BDD !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 



module.exports = router;
