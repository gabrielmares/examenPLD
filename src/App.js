import React from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Login from './components/signin/Login';
// import Admin from './components/Admin'
import LayOut from './components/layout/index';
// import Header from './components/layout/Header';


// if user has been logged and refresh, the are going log again, we only use this method in dev
// si el usuario ya se ha logeado y refresca la pagina, se borra el usuario, solo se usa en desarrollo
localStorage.removeItem('Usuario')

function App() {
  const User = window.localStorage.getItem('Usuario');
  console.log(User);

  return (
    <>
      <Router>
        {!User && <Redirect to='/'/>}
        <Switch>
          <Route exact path="/" name="Login" render={() => <Login />} />
          <Route path="/pld/examen" name="Examen" render={() => <LayOut /*{...props} usuario={User}*/ />} />          
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