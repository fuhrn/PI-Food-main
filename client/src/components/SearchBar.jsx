import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../actions";


export default function SearchBar({returnToFirstPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    function handleChange(e){
        e.preventDefault();
        setName(e.target.value)
    };
    function handleButton(e){
        e.preventDefault();
        dispatch(searchByName(name))
        .then(() =>{ returnToFirstPage(); })        
    };

    return (
        <div>
            <input type="text" placeholder='Buscar receta por nombre:' 
            onChange={(e) => handleChange(e)}/>
            <button type='submit' onClick={ (e) => handleButton(e)} >Buscar</button>
        </div>
    )
}
