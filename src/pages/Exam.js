import React from 'react';
import RegisterContext from '../provider/contextRegister';
import HandleAnswer from '../provider/contextAnswers';
import Exam from '../components/privates/Exam';
import Header from '../components/layout/Header';

const ExamenPage = (props) => {
    return (
        <>
            <RegisterContext>
                <Header {...props} />
                <HandleAnswer>
                    <Exam  {...props} />
                </HandleAnswer>
            </RegisterContext>
        </>
    );
}

export default ExamenPage;