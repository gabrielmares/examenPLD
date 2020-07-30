import React from 'react'
import Header from './Header';
import Examen from '../Exam';
// import { userLoged } from '../../firebase'
// import { Redirect } from 'react-router-dom';



const LayOut = ({usuario}) => {

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