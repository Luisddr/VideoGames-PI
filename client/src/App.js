import './App.css';
import {Route} from 'react-router-dom'
import Cards from './components/Cards';
import QueryResults from './components/queryResults';
import VideogameDetail from './components/VideogameDetail';
import Form from './components/VideogameForm';
import LandingPage from './components/LandingPage';
import Success from './components/post-posting';


function App() {
  return (
    <div className="App">
      {/* <h1>Henry Videogames</h1> */}
      <Route path={'/'} exact component={LandingPage}/>
      <Route path={'/home'} exact component={Cards}/>
      <Route path={'/searchByQuery'}  component={QueryResults}/>
      <Route path={'/videogame/:id'}  component={VideogameDetail}/>
      <Route path={'/post'}  component={Form}/>
      <Route path={'/success'}  component={Success}/>
    </div>
  );
}

export default App;
