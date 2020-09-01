import React from 'react'
import { Card, Input, Form, Col, Row, CardGroup, CardBody, InputGroup, InputGroupText, InputGroupAddon, Button } from 'reactstrap'


import { AiOutlineMail, AiFillLock, AiOutlineUserAdd } from "react-icons/ai";
import Error from '../layout/Error' //componente para manejo de errores
// importar el hook de inicio de sesion
import useValidator from '../../hooks/useValidator'; //Hooks para validaciones
import SignInValidation from '../../rules/signInValidation'; // reglas de validacion para el registro de usuarios
import { registroContext } from '../../provider/contextRegister'

// import axios from 'axios'
import clienteAxios from '../../axiosClient';



const SignIn = () => {

    const [check, setCheck] = React.useState(false); //state para uso del check input
    // const [update, setUpdate] = React.useState(false);

    const initialState = {
        nombre: "",
        email: "",
        password: "",
        OC: false
    }
    const { valuesForm,
        errors,
        setValuesForm,
        setErrors,
        handleSubmit,
        handleChange } = useValidator(initialState, SignInValidation, register);

    const { setUpdate, userInfo } = React.useContext(registroContext)



    // destructuramos los valores del objeto en el context para asignarlos en los campos del form
    const { nombre, email, password, OC } = valuesForm;
    function register(valuesForm) {

        try {
            clienteAxios.post(`/nuevo`, valuesForm, {
                headers: {
                    'authorization': `Bearer ${userInfo.token.token}`
                }
            })
                .then(res => {
                    setUpdate(true);
                    setValuesForm(initialState);
                })
        } catch (error) {
            setErrors({
                ...errors,
                siginError: error
            })
            return console.error('Hubo un error al registrar al usuario', error)

        }

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

            <CardGroup className="col-9">
                <Card >
                    <CardBody className="align-items-center">
                        <Form onSubmit={handleSubmit} noValidate>
                            <Row>
                                <Col className="text-center p-4">
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
                                <Input type="email" className={(errors.email || errors.siginError) && ('border-danger')} name="email" placeholder="Correo" id="email" value={email} onChange={handleChange} />
                            </InputGroup>
                            {errors.siginError === "EMAIL_EXISTS" && <Error alerta={"Este correo ya esta en uso"} />}
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

        </>
    );
}

export default SignIn;

