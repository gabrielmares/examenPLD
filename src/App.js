import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/signin/Login';
import LayOut from './components/layout/index';
import SignIn from './components/signin/SignIn';
import Private from './components/privates/index'




function App() {


  return (
    <>

      <Router>
        <Switch>
          <Route exact path="/" name="Login" component={Login} />
          <Private exact path="/registro" name="Registro" component={SignIn} />
          <Private exact path="/examen" name="Examen" component={LayOut} />
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