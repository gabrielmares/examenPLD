import React from 'react'
import { Card, Input, Form, Col, Container, Row, CardGroup, CardBody, InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap'
import { AiOutlineMail, AiFillLock, AiOutlineUserAdd } from "react-icons/ai";
// import { useHistory } from "react-router-dom";
import Header from '../layout/Header'
import useValidator from '../../hooks/useValidator'; //Hooks para validaciones
import firebase from '../../firebase'
import SignInValidation from '../../rules/signInValidation'; // reglas de validacion para el registro de usuarios


const initialState = {
    nombre: "",
    email: "",
    password: ""
}

// importar el hook de inicio de sesion

const SignIn = () => {

    const { valuesForm,
        errors,
        handleSubmit,
        handleChange } = useValidator(initialState, SignInValidation, register);


    const { nombre, email, password } = valuesForm;
    async function register(valuesForm) {
        const { nombre, email, password } = valuesForm;
        // console.log(nombre, email, password);
        try {
            firebase.SignIn(nombre, email, password);
        } catch (error) {
            console.error('Hubo un error al registrar al usuario', error)
        }
        valuesForm({
            nombre: "",
            email: "",
            password: ""
        })
    }

    return (
        <>
            <Header />
            <div className="mt-4 flex-row">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" xs="12" lg="6" >
                            <CardGroup>
                                <Card className="p-4 ">
                                    <CardBody className="align-items-center">
                                        <Form onSubmit={handleSubmit} noValidate>
                                            <Row>
                                                <Col m="12" className="text-center">
                                                    <h1>Registro de Usuarios</h1>
                                                </Col>
                                            </Row>
                                            <br />
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i > <AiOutlineUserAdd /></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" name="nombre" className={errors.nombre && ('border-danger')} placeholder="Nombre de Usuario" id="nombre" value={nombre} onChange={handleChange} />
                                            </InputGroup>
                                            <InputGroup className="mb-4 mt-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i > <AiOutlineMail /></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="email" className={errors.email && ('border-danger')} name="email" placeholder="Correo" id="email" value={email} onChange={handleChange} />
                                            </InputGroup>
                                            <InputGroup className="mb-4 mt-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i > <AiFillLock /></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" name="password" className={errors.password && ('border-danger')} id="password" placeholder="Contraseña" value={password} onChange={handleChange} />
                                            </InputGroup>
                                            <Row>
                                                <CardBody className="text-center">
                                                    <div>
                                                        <button type="submit" className="btn btn-primary btn-block">Registrar</button>
                                                    </div>
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
        </>
    );
}

export default SignIn;

