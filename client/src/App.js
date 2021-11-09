import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';
import RecipeDetail from './components/RecipeDetail';

function App() {
  return (
    <BrowserRouter >
      <div className="App">
        <Switch>
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
