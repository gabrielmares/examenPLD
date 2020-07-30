import React from 'react'
import { Container } from 'reactstrap'
import Answers from './Answers'

const Question = ({ question }) => {

    const { pregunta, respuestas, ID } = question;
    respuestas.ID = ID;
    return (
        <>
            <Container className="pregunta-examen shadow p-4 mt-4 bg-white rounded">
                <p style={{ fontSize: '1.5rem' }}>{++question.ID}. {pregunta} </p>

                <Answers
                    className="respuestas"
                    respuestas={respuestas}
                />
            </Container>
        </>
    );
}

export default Question;