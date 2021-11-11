import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES'
export const GET_DIETS = 'GET_DIETS'
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME'
export const POST_RECIPE = 'POST_RECIPE'
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE'
export const RECIPE_DETAIL = 'RECIPE_DETAIL'

export function getRecipes() {
    return async function (dispatch) {
        // NOTA* en el get/recipes, si no mando un nombre de receta por query, la ruta me manda todas las recetas ;)
        let json = await axios.get('http://localhost:3001/recipes');
        return dispatch({ type: GET_RECIPES, payload: json.data });
    }
};

export function getDiets() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/types');
        return dispatch({ type: GET_DIETS, payload: json.data })
    }
};

export function filterByDiets(payload) {
    return {
        type: FILTER_BY_DIETS,
        payload
    }
};

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
};

export function orderByScore(payload){
    return {
        type: ORDER_BY_SCORE,
        payload
    }
}

export function searchByName(name) {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/recipes?name=' + name);
        return dispatch({ type: SEARCH_BY_NAME, payload: json.data })
    }
};

export function postRecipe(payload){
    return async function(){
        let json = await axios.post('http://localhost:3001/recipe', payload)
        return json
    }
};

export function recipeDetail(id){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/recipes/' + id)
        return dispatch({ type: RECIPE_DETAIL, payload: json.data})
    }
}