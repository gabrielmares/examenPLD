import app, { initializeApp, firestore } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from './config';

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
        // this.products =
    }

    // funcion que registra a los usuarios en la app
    async register(nombre, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);

        return await newUser.user.updateProfile({
            displayName: nombre
        })
    }
    // iniciar sesion
    async login(email, password) {
        return await this.auth.signInWithEmailAndPassword(email, password);
    }
    // funcion para cerrar sesion
    async logOut() {
        await this.auth.signOut();
    }
    isLogged() {
        const userID = this.auth.onIdTokenChanged;
        return userID 
        // return user;
        // this.auth.onIdTokenChanged(function (user) {
        //     if (user) {
        //         return user
        //     }
        //     else {
        //         return null
        //     }
        // })
    }

};

export function isLogged() {
    const userID = firebase.auth.onIdTokenChanged;
    return console.log(userID)
    // return user;
    // firebase.auth.onIdTokenChanged(function (user) {
    //     if (user) {
    //         return user
    //     }
    //     else {
    //         return null
    //     }
    // })
}


const firebase = new Firebase();

export default firebase;

/*


// funtion para inicializar la app de firebase
const firebasePLD = firebase.initializeApp(firebaseConfig);











// funcion para registrar usuarios en la BD de firebase
const userRegister = async (nombre, email, password) => {
    const newUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    return await newUser.user.updateProfile({
        displayName: nombre
    });

}

const loginUser = async (email, password) => {
    return await
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
}


const userLoged = async () => {
    const unsuscribre= await firebase.auth().onAuthStateChanged(user => {
        if (user) {

        } else {

        }
    })
    return () => unsuscribre();
}


*/
// export { firebasePLD, userRegister, loginUser, userLoged }