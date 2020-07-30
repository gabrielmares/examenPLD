import React from 'react'
import { Card, Input, Form, Col, Container, Row, CardGroup, CardBody, InputGroup, InputGroupText, InputGroupAddon, Button } from 'reactstrap'
import { AiOutlineMail, AiFillLock, AiOutlineUserAdd } from "react-icons/ai";
// import { useHistory } from "react-router-dom";
import Header from '../layout/Header'
import useValidator from '../../hooks/useValidator'; //Hooks para validaciones
import { registerUser } from '../../firebase/firebase'
import SignInValidation from '../../rules/signInValidation'; // reglas de validacion para el registro de usuarios


const initialState = {
    nombre: "",
    email: "",
    password: "",
    OC: false
}

// importar el hook de inicio de sesion

const SignIn = () => {

    const [check, setCheck] = React.useState(false);

    const { valuesForm,
        errors,
        setValuesForm,
        handleSubmit,
        handleChange } = useValidator(initialState, SignInValidation, register);


    const { nombre, email, password } = valuesForm;
    async function register(valuesForm) {
        const { nombre, email, password, OC } = valuesForm;
        // console.log(nombre, email, password);
        try {
            registerUser(nombre, email, password, OC);
        } catch (error) {
            console.error('Hubo un error al registrar al usuario', error)
        }
        setValuesForm(initialState)
    }

    return (
        <>
            <Header />
            <div className="mt-4 flex-row">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6" xs="9" lg="5" >
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
                                            <InputGroup className="justify-content-left pl-2">
                                                <Col>
                                                    <Input type="checkbox" name="OC" value={check} onChange={() => setCheck(!check)} />Oficial de Cumplimiento
                                                </Col>
                                            </InputGroup>
                                            <Row>
                                                <CardBody>
                                                    <Col className=" d-flex justify-content-center">
                                                        <Button color="primary" type="submit" block className="col-lg-6 col-md-9 col-xs-12">Registrar</Button>
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
        </>
    );
}

export default SignIn;

