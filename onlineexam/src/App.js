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
import NavBar from './Components/NavBar/NavBar';
import Exam from './Components/Exam/Exam';

function App() {
  return (
    <div>
      <Router>
        <NavBar/>
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
            <Exam/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
