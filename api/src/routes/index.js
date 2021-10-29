const { Router } = require('express');
const { Recipe, Diet} = require('../db')
require('dotenv').config();
const {API_KEY} = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const model = require('../apiInfo/allData')

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
console.log(model)

router.get('/recipes', async (req, res, next) => {
    // 1 - guardar las recetas de la api
    // 2- guardar las recetas de la bdd
    // 3- concatenar
    // 4 - filtrar segun el nombre de la receta pasado por query
    try{
        const apiinfo = await model.allApiData()
        res.send(apiinfo)
    }catch(error){
        next(error)
    }
});
router.post('/recipes', async (req, res) => {
    const {name} = req.body
    const newRecipe = await Diet.create({
        name
    })
    res.send(newRecipe)
});

// /recipes?name=${name}

// `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`

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
