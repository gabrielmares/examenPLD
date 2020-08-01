import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// eslint-disable-next-line
import firebaseConfig from './config';


// funcion que registra a los usuarios en la app
export const registerUser = async (nombre, email, password, OC) => {
    const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return await newUser.user.updateProfile({
        displayName: nombre,
        photoURL: `${OC}`
    });
};


// iniciar sesion
export const loginUser = async (email, password) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
};
// funcion para cerrar sesion


export function logOut() {
    return firebase.auth().signOut();
};

export const useAuth = () => {
    const [logged, saveLogged] = React.useState({
        isSignedIn: false,
        pending: true,
        user: null
    });
    React.useEffect(() => {
        const unsuscribe = firebase.auth().onAuthStateChanged(user => {
            saveLogged({ pending: false, user, isSignedIn: user })
        })
        return () => unsuscribe();
    }, [])

    return logged;
};

export const saveDocument = async (examen) => {

    try {
        const conn = await firebase.firestore().collection('evaluaciones').add(examen)
        console.log(conn)
    } catch (error) {
        console.error('se produjo un error', error)
    }

}
