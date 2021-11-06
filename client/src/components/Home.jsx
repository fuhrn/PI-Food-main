import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getDiets, filterByDiets } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginate from "./Paginate";

export default function Home() {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const diets = useSelector(state => state.diets);
    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);

    const [currentPage, setCurrentPage] = useState(1);    // pagina que ira cambiando
    const [recipesPerPage, setRecipesPerPage] = useState(9); // self-explanatory
    const lastRecipe = recipesPerPage * currentPage; //9     // indice ultima receta renderizada
    const firstRecipe = lastRecipe - recipesPerPage; //0         // indice primera receta renderizada
    const currentRecipes = recipes.slice(firstRecipe, lastRecipe); // las 9 recetas que se iran mostrando en cda pág
    
    // traer por las dudas 100 recetas para de paso probar el paginado
    
    const paginate = (number) => {
        setCurrentPage(number)
    };
    
    function handleButton(e) {
        e.preventDefault();
        dispatch(getRecipes());
    };

    function handleFilterByDiets(e){
        dispatch(filterByDiets(e.target.value))
    }
    return (
        <div>
            <Link to='/recipe'>¡Crea tu propia receta!</Link>
            <h1>Mi proyecto individual de recetas :)</h1>
            <button onClick={e => handleButton(e)}>
                Recargar recetas
            </button>
            <div>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select onChange={e => handleFilterByDiets(e)}>
                    <option value="all">todas</option>
                    {
                        diets && diets.map( d => (
                            <option value={d.name}>{d.name}</option>
                        ))
                    }
                </select>
                <Paginate
                recipesPerPage={recipesPerPage}
                recipes={recipes?.length}
                paginate={paginate}
                />
                {
                    currentRecipes && currentRecipes.map(el => {
                        return (
                            <Card img={el.image} name={el.name} diet={el.diets} key={el.id} />
                        )
                    })
                }
            </div>
        </div>
    )
};
