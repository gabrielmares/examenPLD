import React from 'react'
import { Card, Input, Form, Col, Container, Row, CardGroup, CardBody, InputGroup, InputGroupText, InputGroupAddon, Button } from 'reactstrap'
import { AiOutlineMail, AiFillLock, AiOutlineUserAdd } from "react-icons/ai";
// import { useHistory } from "react-router-dom";
import Header from '../layout/Header'
import useValidator from '../../hooks/useValidator'; //Hooks para validaciones
import { registerUser } from '../../firebase/firebase'
import SignInValidation from '../../rules/signInValidation'; // reglas de validacion para el registro de usuarios
import clienteAxios from '../../axiosClient';
import ListUserCard from '../privates/ListUsers'
// import axios from 'axios'


// importar el hook de inicio de sesion

const SignIn = () => {

    const [check, setCheck] = React.useState(false); //state para uso del check input
    const [listUser, setListUser] = React.useState(false);

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



    React.useEffect(() => {
        // fncion que solicita al servidor la lista de usuarios registrados
        if (!listUser) {
            async function getAll() {
                await clienteAxios.get('/listadeusuarios')
                    .then(res => {
                        setListUser(res)
                    })
                    .catch(e => console.log(e))
            }
            getAll();
        }

    }, [setListUser, listUser])

    // si el objeto de lista de usuarios esta vacio, se retorna hasta que contenga algo
    if (!listUser) {
        return false
    }
    // console.log(listUser)


    // destructuramos los valores del objeto en el context para asignarlos en los campos del form
    const { nombre, email, password, OC } = valuesForm;
    async function register(valuesForm) {
        const { nombre, email, password, OC } = valuesForm;

        try {
            registerUser(nombre, email, password, OC);
        } catch (error) {
            console.error('Hubo un error al registrar al usuario', error)
        }
        setValuesForm(initialState)
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
            <Header />

            <Container fluid={true}>
                <Row className="p-4">
                    <Col lg={{ size: 3, offset: 2 }}>
                        <CardGroup>
                            <Card className="p-4">
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
                    </Col>
                    <Col lg={{  size: 5, offset: 1  }}>
                        <ListUserCard usuarios={listUser} />
                    </Col>
                </Row>

            </Container>
        </>
    );
}

export default SignIn;

