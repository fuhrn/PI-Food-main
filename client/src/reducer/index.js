import { GET_RECIPES, GET_DIETS, FILTER_BY_DIETS } from "../actions";

const initialState = {
    recipes: [],
    diets: []
}

const reducer = function (state = initialState, action) {
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload
            }
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload
            }
        case FILTER_BY_DIETS:
            const diets = state.diets
            const filteredDiets = diets.filter( d => d.name === action.payload)
            const recipes = state.recipes
            // const recipesWithDiet = recipes.filter( d => )
            console.log('aca diets', diets)
            console.log('aca recipes', recipes)
            console.log('aca filtered', filteredDiets)
            return{
                ...state,
                filteredDiets
            }
        default :
            return state
    }
};
export default reducer;