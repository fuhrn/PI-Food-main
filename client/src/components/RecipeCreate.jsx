import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postRecipe } from "../actions";

export default function RecipeCreate() {
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets)
    
    // probar hacer la validacion de datos

    const [post, setPost] = useState({
        name: '',
        summary: '',
        score: 0,
        healthScore: 0,
        image: '',
        stepByStep: '',
        diets: []
    })
    function handleInputChange(e) {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRecipe(post))
        alert('¡Receta creada con éxito!')
    };

    function handleSelectDiets(e) {
        setPost({
            ...post,
            diets: [...post.diets, e.target.value]
        })
    };

    function handleDietDelete(diet) {
        setPost({
            ...post,
            diets: post.diets.filter(elemet => elemet !== diet)
        })
    };

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h2>Crea tu propia receta :D</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input type="text" value={post.name} name='name' onChange={e => handleInputChange(e)} />
                </div>
                <div>
                    <label>Resumen</label>
                    <input type="text" value={post.summary} name='summary' onChange={e => handleInputChange(e)} />
                </div>
                <div>
                    <label>Puntaje</label>
                    <input type="text" value={post.score} name='score' onChange={e => handleInputChange(e)} />
                </div>
                <div>
                    <label>Nivel Saludable</label>
                    <input type="text" value={post.healthScore} name='healthScore' onChange={e => handleInputChange(e)} />
                </div>
                <div>
                    <label>Imagen</label>
                    <input type="text" value={post.image} name='image' onChange={e => handleInputChange(e)} />
                </div>
                <div>
                    <label>Paso a Paso</label>
                    <input type="text" value={post.stepByStep} name='stepByStep' onChange={e => handleInputChange(e)} />
                </div>
                <select onChange={e => handleSelectDiets(e)}>
                    {
                        diets && diets.map(d => (
                            <option value={d.name}>{d.name}</option>
                        ))
                    }
                </select>
                <button type='submit' >¡Crear!</button>
            </form>
            {post.diets.map(d => <div>
                <p>{d}</p>
                <button onClick={() => handleDietDelete(d)}>X</button>
            </div>
            )}
        </div>
    )
}

