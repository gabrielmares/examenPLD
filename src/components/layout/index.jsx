import React from 'react'
import Header from './Header';
import Examen from '../privates/Exam';
import HandleQuestion from "../../provider/contextAnswers";

const LayOut = ({ usuario }) => {

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