import React from 'react'
import Header from './Header';
import Examen from '../Exam';


const LayOut = ({usuario}) => {

    return (
        <><HandleQuestion>
            <Header usuario={usuario} />

            <div className="body">
                <Examen usuario={usuario} />
            </div>
        </HandleQuestion>
        </>
    );
}

export default LayOut;