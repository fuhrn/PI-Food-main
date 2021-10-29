require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');
const { Recipe, Diet} = require('../db')


const allApiData = async function(){
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`);
    const apiInfo = await apiUrl.data.results.map(el => {
        return {
            name: el.title,
            summary: el.summary,
            score: el.spoonacularScore,
            healthScore: el.healthScore,
            image: el.image,
            createdInDb: false,
            analyzedInstructions: el.analyzedInstructions[0]?.steps
        }
    })
    return apiInfo
};

const allDbData = async function(){
    return await Recipe.findAll({
        include: {              //  eager loading on a model with a Belongs-to-Many relationship
            model: Diet,        //  join con la tabla Diet
            attibutes: ['name'],//  con el atributo 'name' de dicha tabla
            through: {
                attibutes:[],   //  trae los atributos indicados, si no me trae todos
            }
        } // sin hacer esta comprobacion los trae igual, pero la idea es hacerla para traer solo ese atributo
    })
}; // more at: https://sequelize.org/master/manual/eager-loading.html#eager-loading-with-many-to-many-relationships


const allData = async function(){
    const apiData = await allApiData();
    const dbData = await allDbData();

    const allDataContainer = apiData.concat(dbData);
    return allDataContainer
}

module.exports = {
    allData,
    allDbData,
    allApiData
};