import React from 'react';
import { Form, Container, Button, Col, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { respuestasContext } from "../../provider/contextAnswers";
import Question from './Question';
import { Preguntas } from '../../Preguntas';
import { saveDocument, useAuth, OnlyOne, logOut } from '../../firebase/firebase';


const Exam = (props) => {
    let examen = {};
    const userInfo = useAuth();
    const [get, setGet] = React.useState({
        active: false,
        msg: ''
    });
    const { answer, setEvaluacicon, evaluar, option, timeOut, handleTime } = React.useContext(respuestasContext);
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
                            setGet({
                                active: true,
                                msg: 'Tu evaluacion ya se ha enviado al Oficial de Cumplimiento, Gracias'
                            });
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
    const handleSubmitExam = e => {
        e.preventDefault()
        let evaluaciones = [];
        examen.opciones = option;
        examen.respuestas = answer;
        let arrayAnswers = Object.values(answer);
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
            saveDocument(examen)
                .then(done => {
                    setGet({
                        active: true,
                        msg: 'Tu evaluacion se ha enviado al Oficial de Cumplimiento, Gracias'
                    })
                })

        } catch (error) {
            console.error('Ha sucedido un error', error);
        }
        setEvaluacicon(evaluaciones)
        // return evaluaciones;
    }
    handleTime(Date.now());

    if (!timeOut && !userInfo.token.claims.hasOwnProperty('oficial')) {
        // return setGet({
        //     active: true,
        //     msg:'El examen estara disponible hasta el dia \r 7 de Septiembre a las 12 PM \r Gracias por validar el acceso'
        // })

        return (
            <>
                <Modal isOpen={!timeOut} className="modal-dialog modal-dialog-centered">
                    <ModalBody className="text-center">
                        <h4>El examen estara disponible hasta el dia</h4>
                        <h4>5 de Septiembre a las 12 PM</h4>
                        <small>Gracias por validar el acceso</small>
                    </ModalBody>
                    <ModalFooter className="justify-content-center">
                        <Button color="primary" onClick={() => logOut()}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }

    return (
        <>

            {(get.active) ? (
                <Modal isOpen={get.active} className="modal-dialog modal-dialog-centered">
                    <ModalBody className="text-center">
                        <h4>{get.msg}</h4>
                    </ModalBody>
                    <ModalFooter className="justify-content-center">
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