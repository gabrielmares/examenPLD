import React from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Login from './components/signin/Login';
// import Admin from './components/Admin'
import LayOut from './components/layout/index';
import SignIn from './components/signin/SignIn';
import { FirebaseContext, isLogged } from '../src/firebase/index';
import useAuth from './hooks/useAuth';
import firebase from '../src/firebase/index';
// import useAuth from './hooks/useAuth';
// if user has been logged and refresh, the are going log again, we only use this method in dev
// si el usuario ya se ha logeado y refresca la pagina, se borra el usuario, solo se usa en desarrollo
// localStorage.removeItem('Usuario')

function App(props) {
  // indexedDB.deleteDatabase();
  // const usuario = firebase.isLogged();
  // console.log(usuario);
  const otroUser = isLogged();
  console.log(otroUser)
  
  return (
    <>
      <FirebaseContext.Provider
        value={{
          firebase,
          // usuario,
          otroUser
        }} >
        <Router>          
            {!otroUser && <Redirect to='/' />}
          <Switch>
            <Route path="/pld/examen" name="Examen" render={() => <LayOut {...props} />} />
            <Route exact path="/" name="Login" render={() => <Login />} />
            <Route exact path="/pld/registro" name="Registro" render={() => <SignIn />} />
          </Switch>
        </Router>
      </FirebaseContext.Provider>
    </>
  );
}

export default App;


/*

Route path="/pld/examen" name="Examen" render={props => <LayOut {...props} usuario={User} />} />
              <Route path="pld/administracion" name="Administracion" render={props => <Admin {...props} />} />
              <Route path="/pld/administracion" name="Administracion" render={() => <Admin /*{...props} usuario={User}

              */