import React from 'react'
import Header from './Header';
import Examen from '../privates/Exam';


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