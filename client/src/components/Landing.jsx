import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
    
    return(
        <div>
            <h1>Welcome to my Recipes project app !</h1>
            <Link to ='/home'>
                <button>Come and see!</button>
            </Link>
        </div>
    )
}