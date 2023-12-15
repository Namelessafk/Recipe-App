import { Route, Routes } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login/Login';
import Layout from './components/Layout';
import Drinks from './pages/Drinks';
import Meals from './pages/Meals';
import Profile from './pages/Profile/Profile';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import { MainProvider } from './context/mainProvider';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress/RecipeInProgress';

function App() {
  return (
    <MainProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/" element={ <Layout /> }>
          <Route index path="/meals" element={ <Meals /> } />
          <Route path="/drinks" element={ <Drinks /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/done-recipes" element={ <DoneRecipes /> } />
          <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        </Route>
        <Route path="/meals/:id" element={ <RecipeDetails /> } />
        <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails /> } />
        <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
      </Routes>
    </MainProvider>
  );
}

export default App;
