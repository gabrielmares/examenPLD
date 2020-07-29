import React from 'react';

import firebase from '../firebase'

const useAuth = () => {
  const [logged, saveLogged] = React.useState(null);
  React.useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        saveLogged(user);
      } else {
        saveLogged(null);
      }
    })
    return () => unsuscribe();
  }, [])

  return logged;
}
export default useAuth;