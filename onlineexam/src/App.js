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
import LogIn from './Components/Authentication/LogIn/LogIn';
import AuthProvider from './Contexts/AuthProvider';
import Register from './Components/Authentication/Register/Register';

function App() {
  return (
    <div>
      <AuthProvider>
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
            <Route exact path='/login'>
              <LogIn/>
            </Route>
            <Route exact path='/register'>
              <Register/>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
      
    </div>
  );
}

export default App;
