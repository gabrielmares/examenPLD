import React, { useState } from 'react'
import { Card, Input, Form, Col, Container, Row, CardGroup, CardBody, InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap'
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { useHistory, Route } from "react-router-dom";
import LayOut from '../layout/index';
// import Admin from '../Admin';




const Login = (props) => {
    localStorage.removeItem('Usuario');
    let history = useHistory();

    const [user, saveuser] = useState({
        email: "",
        password: ""
    });
    const { email, password } = user;
    const SendEvent = e => {
        e.preventDefault();
        if (password === "11") {
            window.localStorage.setItem('Usuario', 'usuario');
            history.push('/pld/examen');
            // eslint-disable-next-line no-unused-expressions
            return <Route exact path='/pld/examen' render={() => <LayOut UserLogin={user} />} />
        }
        window.localStorage.setItem('Usuario', 'OC');
        history.push('/pld/examen');
        // eslint-disable-next-line no-unused-expressions
        return <Route exact to='/pld/examen' render={() => <LayOut UserLogin={user} />} />

    }

    const setValue = e => {
        saveuser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    return (

        <div className="align-center flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="9" xs="12" lg="5" >
                        <CardGroup>
                            <Card className="p-4">
                                <CardBody className="align-items-center">
                                    <Form onSubmit={SendEvent}>
                                        <Row>
                                            <Col m="12" className="text-center">
                                                <h1>Inicie Sesión</h1>
                                            </Col>
                                        </Row>
                                        <br />
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i > <AiOutlineMail /></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="email" name="email" placeholder="Correo Empresarial" id="email" value={email} onChange={setValue} />
                                        </InputGroup>
                                        <InputGroup className="mb-4 mt-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i > <AiFillLock /></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" name="password" id="password" placeholder="Contraseña" value={password} onChange={setValue} />
                                        </InputGroup>
                                        <Row>
                                            <CardBody className="text-center">
                                                <div>

                                                    <button type="submit" className="btn btn-primary btn-block">Entrar</button>
                                                </div>
                                            </CardBody>
                                        </Row>
                                    </Form>
                                </CardBody>
                                <Row className="justify-content-center"><small >Solo tiene un intento para contestar el examen</small></Row>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;

