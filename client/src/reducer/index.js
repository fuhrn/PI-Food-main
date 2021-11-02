import { GET_RECIPES } from "../actions";

const initialState = {
    recipes: []
}

const reducer = function (state = initialState, action) {
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload
            }
    }
};
export default reducer;