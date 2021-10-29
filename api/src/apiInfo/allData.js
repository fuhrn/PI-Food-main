require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');

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
            analyzedInstructions: el.analyzedInstructions[0].steps

        }
    })
    return 
};

module.exports = {
    allApiData,
};