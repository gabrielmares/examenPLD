import React from 'react'
import { Card, Input, Form, Col, Container, Row, CardGroup, CardBody, InputGroup, InputGroupText, InputGroupAddon, Button } from 'reactstrap'
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { useHistory, Route } from "react-router-dom";
import LayOut from '../layout/index';
import { loginUser } from '../../firebase/firebase'

import useValidator from '../../hooks/useValidator'; //Hooks para validaciones


import userValidation from '../../rules/userValidation'; // reglas de validacion para el inicio de sesion


const initialState = {
    email: "",
    password: ""
}


const Login = (props) => {
    let history = useHistory();


    const { valuesForm,
        errors,
        handleSubmit,
        handleChange } = useValidator(initialState, userValidation, loginfn);



    const { email, password } = valuesForm;
    async function loginfn(valuesForm) {
        const { email, password } = valuesForm;
        try {
            await loginUser(email, password);
            history.push('/inicio');
            return <Route exact path='/inicio' component={LayOut} />
        } catch (error) {
            console.error('Hubo un error al registrar al usuario', error)
        }


    }



    return (

        <div className="align-center flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="9" xs="12" lg="5" >
                        <CardGroup>
                            <Card className="p-4">
                                <CardBody className="align-items-center">
                                    <Form onSubmit={handleSubmit}>
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
                                            <Input type="email" className={errors.email && ('border-danger')} name="email" placeholder="Correo Empresarial" id="email" value={email} onChange={handleChange} />
                                        </InputGroup>
                                        <InputGroup className="mb-4 mt-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i > <AiFillLock /></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" className={errors.password && ('border-danger')} name="password" id="password" placeholder="Contraseña" value={password} onChange={handleChange} />
                                        </InputGroup>
                                        <Row>
                                            <CardBody>
                                                <Col className=" d-flex justify-content-center">
                                                    <Button color="primary" type="submit" block className="col-lg-6 col-md-9 col-xs-12">Entrar</Button>
                                                </Col>
                                            </CardBody>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;

