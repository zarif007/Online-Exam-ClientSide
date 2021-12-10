import './App.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';
import MakeExam from './Components/MakeExam/MakeExam';
import PrepareExam from './Components/PrepareExam/PrepareExam';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/makeexam'>
            <MakeExam />
          </Route>
          <Route exact path='/prepare/:exam_id'>
            <PrepareExam/>
          </Route>
          <Route exact path='/exam/:exam_id'>
            <MakeExam />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
