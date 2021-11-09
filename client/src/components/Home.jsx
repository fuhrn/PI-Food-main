import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getDiets, filterByDiets, orderByName, orderByScore, recipeDetail } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";

export default function Home() {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const diets = useSelector(state => state.diets);
    const [tomas, setTomas] = useState(true)
    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiets());
        dispatch(recipeDetail(716426))
    }, [dispatch]);
    useEffect(() => {

    }, [tomas])

    const [currentPage, setCurrentPage] = useState(1);    // pagina que ira cambiando
    const [recipesPerPage, setRecipesPerPage] = useState(9); // self-explanatory
    const lastRecipe = recipesPerPage * currentPage; //9     // indice ultima receta renderizada
    const firstRecipe = lastRecipe - recipesPerPage; //0         // indice primera receta renderizada
    const currentRecipes = recipes.slice(firstRecipe, lastRecipe); // las 9 recetas que se iran mostrando en cda pág

    const paginate = (number) => {
        setCurrentPage(number)
    };

    function handleButton(e) {
        e.preventDefault();
        dispatch(getRecipes());
    };

    function handleFilterByDiets(e) {
        dispatch(filterByDiets(e.target.value))
    };

    function handleOrderByName(e) {
        dispatch(orderByName(e.target.value))
        tomas ? setTomas(false) : setTomas(true)
    };

    function handleOrderByScore(e) {
        dispatch(orderByScore(e.target.value))
        tomas ? setTomas(false) : setTomas(true)
    };

    return (
        <div>
            <Link to='/recipe'>¡Crea tu propia receta!</Link>
            <h1>Mi proyecto individual de recetas :)</h1>
            <button onClick={e => handleButton(e)}>
                Recargar recetas
            </button>
            <div>
                <select onChange={e => handleOrderByName(e)} >
                    <optgroup label='Ordenar alfabéticamente' >
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </optgroup>
                </select>
                <select onChange={e => handleOrderByScore(e)} >
                    <optgroup label='Ordenar por Puntaje' >
                        <option value="desc">Puntaje mas alto</option>
                        <option value="asc">Puntaje mas bajo</option>
                    </optgroup>
                </select>

                <select onChange={e => handleFilterByDiets(e)}>
                    <option value="all">todas</option>
                    {
                        diets && diets.map(d => (
                            <option value={d.name}>{d.name}</option>
                        ))
                    }
                </select>
                <SearchBar />
                <Paginate
                    recipesPerPage={recipesPerPage}
                    recipes={recipes?.length}
                    paginate={paginate}
                />
                {
                    currentRecipes && currentRecipes.map(el => {
                        return (
                            <div>
                                <Link to={'/' + el.id}>
                                    <Card img={el.image} name={el.name} diet={el.diets} key={el.id} />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};
