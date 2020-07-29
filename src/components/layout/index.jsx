import React, { useContext } from 'react'
import Header from './Header';
import Examen from '../Exam';
import { FirebaseContext } from '../../firebase'
// import { userLoged } from '../../firebase'
// import { Redirect } from 'react-router-dom';



const LayOut = () => {

    const { usuario } = useContext(FirebaseContext);
    console.log(usuario)

    return (
        <>
            <Header usuario={usuario} />
            <div className="body">
                <Examen />
            </div>
        </>
    );
}

export default LayOut;