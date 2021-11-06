import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES'
export const GET_DIETS = 'GET_DIETS'
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS'

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
        return dispatch({ type: GET_DIETS, payload: json.data})
    }
};

export function filterByDiets(payload){
    console.log(payload)
    return {
        type: FILTER_BY_DIETS,
        payload
    }
}