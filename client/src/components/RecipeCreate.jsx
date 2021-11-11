import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postRecipe, getDiets } from "../actions";
import NavBar from "./NavBar";


function validate(post) {
    let errors = {};
    if (!post.name) {
        errors.name = 'Ingresar nombre de la receta'
    }
    if (!post.summary) {
        errors.summary = 'Escribe un breve resumen'
    }
    if (!post.score || post.score < 0 || post.score > 100) {
        errors.score = 'Ingresa un valor de 0 a 100'
    }
    if (!post.healthScore || post.healthScore < 0 || post.healthScore > 100) {
        errors.healthScore = 'Ingresa un valor de 0 a 100'
    }
    if (!post.stepByStep) {
        errors.stepByStep = 'Escribe una serie de pasos sobre cómo cocinar la receta'
    }
    if (!post.image) {
        errors.image = 'Ingresar URL de alguna imagen representativa'
    }
    if (!post.diets.length) {
        errors.diets = 'Elige al menos un tipo de dieta'
    }
    return errors;
}

export default function RecipeCreate() {
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])


    const [post, setPost] = useState({
        name: '',
        summary: '',
        score: 0,
        healthScore: 0,
        image: '',
        stepByStep: [],
        diets: []
    })
    function handleInputChange(e) {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...post,
            [e.target.name]: e.target.value
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRecipe(post))
        console.log(post)
        alert('¡Receta creada con éxito!')
        // if (Object.values(errors).length > 0) alert("Por favor rellenar todos los campos")
        // else{
        // }
    };

    function handleSelectDiets(e) {
        setPost({
            ...post,
            diets: [...post.diets, e.target.value]
        });
    };

    function handleSteps(e) {
        setPost({
            ...post,
            stepByStep: [...post.stepByStep, e.target.value]
        })
    }

    function handleDietDelete(diet) {
        setPost({
            ...post,
            diets: post.diets.filter(elemet => elemet !== diet)
        })
    };

    return (
        <div>
            <NavBar />
            <h2>Crea tu propia receta :)</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input type="text" value={post.name} name='name' onChange={e => handleInputChange(e)} />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Resumen</label>
                    <input type="text" value={post.summary} name='summary' onChange={e => handleInputChange(e)} />
                    {errors.summary && (
                        <p>{errors.summary}</p>
                    )}
                </div>
                <div>
                    <label>Puntaje</label>
                    <input type="number" min="0" max='100' value={post.score} name='score' onChange={e => handleInputChange(e)} />
                    {errors.score && (
                        <p>{errors.score}</p>
                    )}
                </div>
                <div>
                    <label>Nivel Saludable</label>
                    <input type="number" min="0" max='100' value={post.healthScore} name='healthScore' onChange={e => handleInputChange(e)} />
                    {errors.healthScore && (
                        <p>{errors.healthScore}</p>
                    )}
                </div>
                <div>
                    <label>Imagen</label>
                    <input type="text" value={post.image} name='image' onChange={e => handleInputChange(e)} />
                    {errors.image && (
                        <p>{errors.image}</p>
                    )}
                </div>
                <div>
                    <label>Paso a Paso</label>
                    <input type="text" value={post.stepByStep} name='stepByStep' onChange={e => handleSteps(e)} />
                    {errors.stepByStep && (
                        <p>{errors.stepByStep}</p>
                    )}
                </div>
                <div>
                    <select onChange={e => handleSelectDiets(e)}>
                        {
                            diets && diets.map(d => (
                                <option value={d.name}>{d.name}</option>
                            ))
                        }
                    </select>
                    {errors.diets && (
                        <p>{errors.diets}</p>
                    )}
                </div>
                <button type='submit' >¡Crear!</button>
            </form>
            {post.diets.map(d =>
                <div>
                    <p>{d}</p>
                    <button onClick={() => handleDietDelete(d)}>X</button>
                </div>
            )}
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}

