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
import PrivateRoute from './Components/Authentication/PrivateRoute/PrivateRoute';
import Grades from './Components/Grades/Grades';


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
            <PrivateRoute exact path='/makeexam'>
              <MakeExam />
            </PrivateRoute>
            <PrivateRoute exact path='/prepare/:exam_id'>
              <PrepareExam/>
            </PrivateRoute>
            <PrivateRoute exact path='/exam/:exam_id'>
              <Exam/>
            </PrivateRoute>
            <Route exact path='/login'>
              <LogIn/>
            </Route>
            <Route exact path='/register'>
              <Register/>
            </Route>
            <PrivateRoute exact path='/grades/:exam_id'>
              <Grades/>
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
      
    </div>
  );
}

export default App;
