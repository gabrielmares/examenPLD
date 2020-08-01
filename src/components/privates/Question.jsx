import React from 'react'
import { Container } from 'reactstrap'
import Answers from './Answers'
import { respuestasContext } from '../../provider/contextAnswers'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'


const Question = ({ question }) => {

    const { evaluacion, evaluar } = React.useContext(respuestasContext);


    const { pregunta, respuestas, ID } = question;
    respuestas.ID = ID;

    const Icono = () => {
        if (evaluar) {
            if (evaluacion[ID]) {
                return <AiOutlineCheck size="50px" color="green" />
            } else {
                return <AiOutlineClose color="red" size="50px" />
            }
        } else {
            return null
        }
    }


    return (
        <>

            <Container className="pregunta-examen shadow p-4 mt-4 bg-white rounded">

                <p style={{ fontSize: '1.5rem' }}>{++question.ID}. {pregunta} </p>

                <Answers

                    className="respuestas"
                    respuestas={respuestas}
                />
                {evaluar && <div className="row justify-content-end"><Icono /></div>}
            </Container>
        </>
    );
}

export default Question;