import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getDiets, filterByDiets, orderByName, orderByScore, recipeDetail } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import styles from "./Home.module.css"

export default function Home() {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const diets = useSelector(state => state.diets);
    const [tomas, setTomas] = useState(true)
    useEffect(() => {
        dispatch(getRecipes());
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        dispatch(getDiets());
    }, [])

    const [currentPage, setCurrentPage] = useState(1);    // pagina que ira cambiando
    const [recipesPerPage, setRecipesPerPage] = useState(9); // self-explanatory
    const lastRecipe = recipesPerPage * currentPage; //9     // indice ultima receta renderizada
    const firstRecipe = lastRecipe - recipesPerPage; //0         // indice primera receta renderizada
    const currentRecipes = recipes.slice(firstRecipe, lastRecipe); // las 9 recetas que se iran mostrando en cda pág
    const [loading, setLoading] = useState(true)

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

    function returnToFirstPage(){
        setCurrentPage(1)
    };

    return (
        <div className={styles.home}>
            {/* probar hacer un componente LOADING aqui con un ternario, onda loading ? Loading : todo lo demas */}
            <NavBar />
            <button onClick={e => handleButton(e)}>
                Recargar recetas
            </button>
            <SearchBar returnToFirstPage={returnToFirstPage}/>
            <div>
                <select onChange={e => handleOrderByName(e)} >
                    <option value="none" selected disabled hidden>Ordenar alfabéticamente</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select onChange={e => handleOrderByScore(e)} >
                    <option value="none" selected disabled hidden>Ordenar por Puntaje</option>
                    <option value="desc">Puntaje mas alto</option>
                    <option value="asc">Puntaje mas bajo</option>
                </select>

                <select onChange={e => handleFilterByDiets(e)}>
                    <option value="none" selected disabled hidden>Seleccionar por tipo de dieta</option>
                    {
                        diets && diets.map(d => (
                            <option value={d.name}>{d.name}</option>
                        ))
                    }
                </select>
                <Paginate
                    recipesPerPage={recipesPerPage}
                    recipes={recipes?.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
                <div className={styles.cardsGrid}>
                    {
                        currentRecipes && currentRecipes.map(el => {
                            return (
                                <Card img={el.image} name={el.name} diet={el.diets} id={el.id} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};
