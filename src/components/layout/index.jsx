import React from 'react'
import Header from './Header';
<<<<<<< HEAD
import Examen from '../privates/Exam';
import HandleQuestion from "../../provider/contextAnswers";
=======
import Examen from '../Exam';
// import { userLoged } from '../../firebase'
// import { Redirect } from 'react-router-dom';
>>>>>>> 6221ecb9ba349cefa26ab73acd5cbcfbc94b981a

const LayOut = ({ usuario }) => {

<<<<<<< HEAD
    // const {  } = React.useContext(respuestasContext);
=======

const LayOut = ({usuario}) => {

>>>>>>> 6221ecb9ba349cefa26ab73acd5cbcfbc94b981a
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