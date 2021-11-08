import { GET_RECIPES, GET_DIETS, FILTER_BY_DIETS, ORDER_BY_NAME, SEARCH_BY_NAME, POST_RECIPE } from "../actions";

const initialState = {
    recipes: [],
    recipesCopyState: [],
    diets: []
}

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                recipesCopyState: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case FILTER_BY_DIETS:
            const recipes = state.recipesCopyState
            const recipesWithDiet = action.payload === 'all' ? recipes : recipes.filter(d => d.diets.includes(action.payload))
            return {
                ...state,
                recipes: recipesWithDiet
            }
        case ORDER_BY_NAME:
            const recipesSorted = action.payload === 'asc' ?
            state.recipes.sort((a,b) => {
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                return 0;
            }) :
            state.recipes.sort((a,b) => {
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1;
                return 0;
            });
            return {
                ...state,
                recipes: recipesSorted
            }
        case SEARCH_BY_NAME:
            return {
                ...state,
                recipes: action.payload
            };
        default:
            return state
    }
};
export default reducer;