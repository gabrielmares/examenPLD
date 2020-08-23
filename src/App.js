import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Private, { PrivateUser } from './components/privates/index';


// paginas
import Register from './pages/Register';
import LoginPage from './pages/Login';
import ExamenPage from './pages/Exam';
import ResultsPage from './pages/Results'


function App(props) {


  return (
    <>

      <Router>
        <Switch>
          <Route exact path="/" name="Login" component={LoginPage} />
          <Private exact path="/pld/registro" name="Registro" component={Register} />
          <Private exact path='/pld/resultados' component={ResultsPage} />
          <PrivateUser exact path="/inicio" name="Examen" component={ExamenPage} />
        </Switch>
    </Router>

    </>
  );
}

export default App;


/*

Route path="/pld/examen" name="Examen" render={props => <LayOut {...props} usuario={User} />} />
              <Route path="pld/administracion" name="Administracion" render={props => <Admin {...props} />} />
              <Route path="/pld/administracion" name="Administracion" render={() => <Admin /*{...props} usuario={User}

              */