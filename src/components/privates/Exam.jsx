import React from 'react';
import { Form, Container, Button, Col } from 'reactstrap';
import { respuestasContext } from "../../provider/contextAnswers";
// import { registroContext } from '../../provider/contextRegister'
import Question from './Question';
import { Preguntas } from '../../Preguntas';

import { saveDocument } from '../../firebase/firebase';

const Exam = (props) => {
    let examen = {};


    const { answer, setEvaluacicon, setEvaluar, evaluar } = React.useContext(respuestasContext);
    // const { infoToken } = React.useContext(registroContext)

    const correctAnswer = [
        Preguntas[0].respuestas[1],
        Preguntas[1].respuestas[1],
        Preguntas[2].respuestas[1],
        Preguntas[3].respuestas[2],
        Preguntas[4].respuestas[0],
        Preguntas[5].respuestas[1],
        Preguntas[6].respuestas[1],
        Preguntas[7].respuestas[1],
        Preguntas[8].respuestas[1],
        Preguntas[9].respuestas[1]
    ]
    // console.log(correctAnswer.length)
    const handleSubmitExam = e => {
        setEvaluar(false);
        e.preventDefault()
        let evaluaciones = [];

        examen.respuestas = answer;
        let arrayAnswers = Object.values(answer);
        // console.log(correctAnswer.length, answer)
        for (let i = 0; i < correctAnswer.length; i++) {
            if (correctAnswer[i] === arrayAnswers[i]) {
                evaluaciones.push(true);
            } else {
                evaluaciones.push(false);
            }

        }
        const correctsAnswers = evaluaciones.filter(aprovacion => aprovacion === true)

        examen.calificacion = (correctsAnswers.length / Preguntas.length) * 10
        examen.evaluacion = evaluaciones
        try {
            const respServer = saveDocument(examen);
            console.log(respServer);
        } catch (error) {
            return (
                console.error('Ha sucedido un error', error)
            )
        }
        setEvaluacicon(evaluaciones)
        setEvaluar(true);

        // return evaluaciones;
    }


    return (
        <>

            <Container color="white" className="move-up">
                <Container>
                    <Form className="bg-white p-4">
                        <blockquote className="text-center">
                            <p className="mt-4 h2">Preguntas</p>
                            <footer className="blockquote-footer">Solo cuentas con un intento para contestar el examen</footer>
                        </blockquote>
                        {Preguntas.map((question, index) => {
                            question.ID = index;
                            return (
                                <Question key={index} question={question} />
                            )
                        })}
                        <Col className="pt-4 d-flex justify-content-center">
                            {!evaluar && <Button type="submit" color="primary" style={{ width: '220px' }} onClick={e => handleSubmitExam(e)}>Enviar respuestas</Button>}
                        </Col>
                    </Form>
                </Container >
            </Container>

        </>

    );
}

export default Exam;