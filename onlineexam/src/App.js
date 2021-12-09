import './App.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
