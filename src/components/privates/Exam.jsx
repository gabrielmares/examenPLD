import React from 'react';
import { Form, Container, Button, Col } from 'reactstrap';

import Question from './Question';
import ListaPreguntas from '../../Preguntas';

const Exam = () => {

    const { Preguntas } = ListaPreguntas;


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
                        <Col sm={{ size: 8, offset: 6 }} lg={12} xs={{ size: 8, offset: 4 }} className="block p-4 mt-4 center-item justify-content-center">
                            <Button type="submit" color="primary" style={{ width: '220px' }}>Enviar respuestas</Button>
                        </Col>
                    </Form>
                </Container >
            </Container>
        </>

    );
}

export default Exam;