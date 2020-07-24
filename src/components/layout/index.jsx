import React from 'react'
import Header from './Header';
import Examen from '../Exam';



const LayOut = ({UserLogin}) => {

    const User = localStorage.getItem('Usuario');
    console.log(UserLogin)

    return (
        <>
            <Header usuario={User} />
            <div className="body align-center">
                <Examen />
            </div>
        </>
    );
}

export default LayOut;