import React from 'react';
import { Form, Container, Button, Col, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { respuestasContext } from "../../provider/contextAnswers";
import Question from './Question';
import { Preguntas } from '../../Preguntas';
import { saveDocument, useAuth, OnlyOne, logOut } from '../../firebase/firebase';


const Exam = (props) => {
    let examen = {};
    const userInfo = useAuth();
    const [get, setGet] = React.useState(false);
    const { answer, setEvaluacicon, setEvaluar, evaluar, option,  setPrint } = React.useContext(respuestasContext);
    // console.log(userInfo)


    React.useEffect(() => {

        if (userInfo.user) {
            const { email } = userInfo.user
            const { oficial } = userInfo.token.claims
            if (oficial) {
                return setGet(false)
            }
            const getExamen = async (email) => {
                // console.log(userInfo)
                await OnlyOne(email)
                    .then(respuesta => {
                        if (respuesta.exists) {
                            // console.log(respuesta)
                            setGet(true);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
            getExamen(email);
        }
        // setGet(false)
    }, [userInfo, get])

    if (userInfo.pending) {
        return false;
    }


    // console.log(userInfo.user.uid)


    const correctAnswer = [
        Preguntas[0].respuestas[1],
        Preguntas[1].respuestas[1],
        Preguntas[2].respuestas[1],
        Preguntas[3].respuestas[2],
        Preguntas[4].respuestas[0],
        Preguntas[5].respuestas[1],
        Preguntas[6].respuestas[0],
        Preguntas[7].respuestas[2],
        Preguntas[8].respuestas[2],
        Preguntas[9].respuestas[1],
        Preguntas[10].respuestas[2],
        Preguntas[11].respuestas[0]
    ]
    //  console.log(correctAnswer.length)
    const handleSubmitExam = async e => {
        setEvaluar(false);
        e.preventDefault()
        let evaluaciones = [];
        examen.opciones = option;
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

        examen.calificacion = ((correctsAnswers.length / Preguntas.length) * 10).toFixed(2)
        examen.evaluacion = evaluaciones;
        examen.usuario = {
            email: userInfo.user.email,
            nombre: userInfo.user.displayName
        }
        try {
            const respServer = await saveDocument(examen);
            console.log(respServer);
        } catch (error) {
            console.error('Ha sucedido un error', error);
        }
        setEvaluacicon(evaluaciones)
        setEvaluar(true);
        setPrint(true);
        // return evaluaciones;
    }




    return (
        <>
            {get ? (
                <Modal isOpen={get} className="modal-dialog modal-dialog-centered">
                    <ModalBody>
                        {'Has agotado el numero de intentos para contestar el examen'}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => logOut()}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            ) : (
                    <Container color="white" className="move-up" id='examen'>
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
                                    {!evaluar
                                        && (
                                            <Button
                                                type="submit"
                                                color="primary"
                                                style={{ width: '220px' }}
                                                onClick={e => handleSubmitExam(e)}
                                            >
                                                Enviar respuestas
                                            </Button>
                                        )

                                    }

                                </Col>
                            </Form>
                        </Container >
                    </Container>
                )
            }

        </>

    );
}

export default Exam;