import React from 'react'
import { Card, Input, Form, Col, Container, Row, CardGroup, CardBody, InputGroup, InputGroupText, InputGroupAddon, Button } from 'reactstrap'
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { loginUser } from '../../firebase/firebase'
import ExamenPage from '../../pages/Exam'
import ResultsPage from '../../pages/Results'
// import clienteAxios from '../../axiosClient'
// import { registroContext } from '../../provider/contextRegister'

import useValidator from '../../hooks/useValidator'; //Hooks para validaciones


import userValidation from '../../rules/userValidation'; // reglas de validacion para el inicio de sesion
import Private, { PrivateUser } from '../privates';


const initialState = {
    email: "",
    password: ""
}


const Login = (props) => {
    let history = useHistory();

    const { valuesForm,
        errors,
        handleSubmit,
        handleChange, setErrors } = useValidator(initialState, userValidation, loginfn);


    // extraer el context para el spinner de carga de datos



    const { email, password } = valuesForm;
    async function loginfn(valuesForm) {
        const { email, password } = valuesForm;
        try {
            await loginUser(email, password)
                .then(auth => {
                    if (auth.claims.oficial) {
                        history.push('/pld/resultados');
                        return <Private exact path='/pld/resultados' component={ResultsPage} />
                    }
                    history.push('/inicio');
                    return <PrivateUser exact path='/inicio' component={ExamenPage} />

                })
                .catch(error => {
                    console.error(error);
                })

        } catch (error) {
            console.error('Hubo un error al registrar al usuario', error);
            if (error.code === "auth/wrong-password") {
                setErrors({
                    ...errors,
                    password: "La contraseña no es valida"
                })
            }
            if (error.code === "auth/user-not-found") {
                setErrors({
                    ...errors,
                    email: "El correo que ingreso no es valido"
                })
            }
            if (error.code === "auth/too-many-requests") {
                setErrors({
                    ...errors,
                    intentos: "has excedido el maximo de intentos fallidos, espera 15 minutos"
                })
            }
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
                                    <Form onSubmit={handleSubmit} noValidate>
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
                                        <div className="d-flex justify-content-center">
                                            {errors.email && <small className="text-danger">{errors.email}</small>}
                                        </div>
                                        <InputGroup className="mb-4 mt-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i > <AiFillLock /></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" className={errors.password && ('border-danger')} name="password" id="password" placeholder="Contraseña" value={password} onChange={handleChange} />
                                        </InputGroup>
                                        <div className="d-flex justify-content-center">
                                            {errors.password && <small className="text-danger">{errors.password}</small>}
                                        </div>

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
                <div className="d-flex justify-content-center">
                    {errors.intentos && <small className="text-danger">{errors.intentos}</small>}
                </div>
            </Container>
        </div>
    );
}

export default Login;

