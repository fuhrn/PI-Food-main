import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';
import RecipeDetail from './components/RecipeDetail';
import NavBar from './components/NavBar';
import React, { Fragment } from 'react';
import style from './App.module.css'

function App() {
  return (
    <BrowserRouter >
      <div className={style.App}>
        <Switch>
          {/* el react fragment por algun motivo al renderizar los componentess llama a la action recipeDetail
    la cual trae el id que tenga la url, como en home no hay id, se rompe todo */}
          <Route exact path='/' component={Landing} />
          <Route path='/home' component={Home} />
          <Route path='/recipe' component={RecipeCreate} />
          <Route path='/:id' component={RecipeDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
