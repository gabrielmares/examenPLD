import React from 'react';
import { Form, Container, Button, Col } from 'reactstrap';

import Question from './Question';
import ListaPreguntas from '../Preguntas';

const Exam = () => {

    const { Preguntas } = ListaPreguntas;


    return (
        <>
            <Container>

                <Form >
                    <blockquote className="text-center">
                        <p className="mt-2 h2">Preguntas</p>
                        <footer className="blockquote-footer">Solo cuentas con un intento para contestar el examen</footer>
                    </blockquote>
                    {Preguntas.map((question, index) => {
                        question.ID = index;
                        return (
                            <Question key={index} question={question} />
                        )
                    })}
                    <Col xs={{ size: 8, offset: 1 }} md={{ size: 8, offset: 5 }} className="p-2 mt-4 align-items-center">
                        <Button type="submit" color="primary" className="mb-2" style={{ width: '220px' }}>Enviar respuestas</Button>
                    </Col>
                </Form>
            </Container >
        </>

    );
}

export default Exam;