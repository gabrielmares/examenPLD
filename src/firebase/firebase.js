import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// eslint-disable-next-line
import firebaseConfig from './config';


// firebase.initializeApp(firebaseConfig);
// funcion que registra a los usuarios en la app
export const registerUser = async (nombre, email, password, OC) => {
    console.log(OC)
    if (OC) {
        OC = 1
    } else {
        OC = 0
    }
    // console.log(OC)
    const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return await newUser.user.updateProfile({
        displayName: nombre,
        photoURL: OC
    });
};





// iniciar sesion
export const loginUser = async (email, password) => {
    // console.log(firebaseConfig.apiKey)
    return await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async user => {
            // console.log(user)
            if (user) {
                let tokenID = await firebase.auth().currentUser.getIdTokenResult();
                return tokenID;
            }
        })
        .catch(e => {
            // console.log(e)
            return e;
        })

};



// funcion para cerrar sesion
export function logOut() {
    return firebase.auth().signOut();
};

// obtener la informacion del usuario y el tokenId para los intercambios con el backend
export const useAuth = () => {
    const [logged, saveLogged] = React.useState({
        isSignedIn: true,
        pending: true,
        user: null,
        token: ''
    });
    React.useEffect(() => {
        const unsuscribe = firebase.auth().onAuthStateChanged(async user => {
            if (user) { //si tenemos un usuario en linea, obtenemos el token y lo regresamos
                let tokenID = await user.getIdTokenResult();
                if (tokenID) {
                    saveLogged({ pending: false, user, isSignedIn: false, token: tokenID })
                } else {
                    saveLogged({ pending: false, user: '', isSignedIn: false, token: '' })
                }
            }
            else { //si no hay usuario limpiamos valores condicionales
                saveLogged({ pending: false, user: '', isSignedIn: false, token: '' })
            }
        })
        return () => unsuscribe();
    }, [])

    return logged;
};



// grabar un documento en la coleccion
export const saveDocument = async (examen) => {
    try {
        await firebase.firestore().collection('evaluaciones').doc(examen.usuario.email).set(examen)
            .then(res => {
                // console.log(res)
                return res;
            })

    } catch (error) {
        console.error('se produjo un error', error)
    }

}


// generar email de restablecimiento de contraseña
export const ResetPassword = async email => {
    let mensage;
    await firebase.auth().sendPasswordResetEmail(email)
        .then(resp => {
            mensage = 200;
        })
        .catch(e => {
            mensage = 404;
        })
    return mensage;
}


// revisar si ya realizo el examen anteriormente
export const OnlyOne = async email => {
    const doc = await firebase.firestore().collection('evaluaciones').doc(email).get();
    // console.log(doc.exists)
    return doc;

}


// funcion que descarga los examenes ya realizados
export const ListExamen = () => {
    const [list, setList] = React.useState({
        pending: true,
        examenes : ''
    })

    // const [pendind, setPending] = React.useState(true)
    React.useEffect(() => {
        function get() {
            firebase.firestore().collection('evaluaciones').onSnapshot(snapshot);
        }
        get();
    }, [])
    const snapshot = snapshot => {
        const total = snapshot.docs.map(producto => {
            return {
                id: producto.id,
                ...producto.data()
            }
        })
        setList({
            pending: false,
            examenes: total
        })
        
    }

    return list;
}