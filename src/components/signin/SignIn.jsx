import React from 'react'
import { Card, Input, Form, Col, Container, Row, CardGroup, CardBody, InputGroup, InputGroupText, InputGroupAddon, Button } from 'reactstrap'
import { AiOutlineMail, AiFillLock, AiOutlineUserAdd } from "react-icons/ai";
import Header from '../layout/Header'
import useValidator from '../../hooks/useValidator'; //Hooks para validaciones
import SignInValidation from '../../rules/signInValidation'; // reglas de validacion para el registro de usuarios
import ListUserCard from '../privates/ListUsers'
import HandleAnswer from '../../provider/contextAnswers'
import axios from 'axios'

// importar el hook de inicio de sesion

const SignIn = () => {

    const [check, setCheck] = React.useState(false); //state para uso del check input
    const [update, setUpdate] = React.useState(false);

    const initialState = {
        nombre: "",
        email: "",
        password: "",
        OC: false
    }
    const { valuesForm,
        errors,
        setValuesForm,
        handleSubmit,
        handleChange } = useValidator(initialState, SignInValidation, register);



    // destructuramos los valores del objeto en el context para asignarlos en los campos del form
    const { nombre, email, password, OC } = valuesForm;
    async function register(valuesForm) {
        // eslint-disable-next-line
        const { nombre, email, password, OC } = valuesForm;
        try {
            // el registro de usuarios es por API REST, de la otra manera registraba al usuario y cerraba la sesion activa
            //en este metodo, registra, sin cambiar la sesion activa
            await axios.post(`${process.env.REACT_APP_URL_REGISTER}=${process.env.REACT_APP_APIKEY}`, {
                email,
                password,
                displayName: nombre,
                photoURL: function user(OC) {
                    if (OC) {
                        return 1
                    }
                    return 0
                }
            })
            // registerUser(nombre, email, password, OC);
        } catch (error) {
            console.error('Hubo un error al registrar al usuario', error)
        }
        setUpdate(true);
        setValuesForm(initialState);
    }
    /*funcion que revisa cuando se registra a un usuario normal o un administrador*/

    const handleCheck = e => {
        setCheck(!check)
        setValuesForm({
            ...valuesForm,
            [e.target.name]: !check
        })
    }



    return (
            <>
            {/* <Container fluid={true}> */}
                {/* <Row className="p-4"> */}
                    {/* <Col > */}
                        <CardGroup>
                            <Card >
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
                                                <Input type="checkbox" name="OC" checked={OC} value={OC} onChange={e => handleCheck(e)} />Oficial de Cumplimiento
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
                    {/* </Col> */}
                    {/* <Col lg={{ size: 4, offset: 1 }}>
                        <ListUserCard actualizar={setUpdate} validar={update} />
                    </Col> */}
                {/* </Row>

            </Container> */}
        </>
    );
}

export default SignIn;

