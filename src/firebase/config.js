import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_SB ,
    messagingSenderId: process.env.REACT_APP_MSGSEND,
    appId: process.env.REACT_APP_APPID
}




firebase.initializeApp(firebaseConfig);

export default firebaseConfig;