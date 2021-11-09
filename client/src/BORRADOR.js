// RECIPES TIENE LA SGTE ESTRUCTURA:
array = [
    {
        id: el.id,
        name: el.title,
        summary: el.summary,
        diets: el.diets, // array de objetos {name: diet}
        score: el.spoonacularScore,
        healthScore: el.healthScore,
        image: el.image,
        createdInDb: false,
        instructions: el.analyzedInstructions[0]?.steps
    }
]

// DIETS TIENE LA SGTE ESTRUCTURA:   (recordar que viene precargado de la BD con esa forma)
array = [
    {
        id,
        name,
    }
]

// LAS DIETS DE LAS RECETAS DE LA API AHORA VIENEN EN FORMA DE ARRAY DE STRINGS !!!!