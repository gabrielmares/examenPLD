import React from 'react';
import { Card, CardHeader, UncontrolledTooltip, Button, Table, CardBody, Row } from 'reactstrap'
import clienteAxios from '../../axiosClient';
import { MdClear, MdRefresh, } from 'react-icons/md';
import { registroContext } from '../../provider/contextRegister'
import { ResetPassword } from '../../firebase/firebase'





const ListUserCard = () => {

    const { update, setUpdate, userInfo, setModal, listUser, setListUser } = React.useContext(registroContext)

    React.useEffect(() => {
        if (update && userInfo.token ) {
            function getAll() {
                clienteAxios.get('/usuarios', {
                    headers: {
                        'authorization': `Bearer ${userInfo.token.token}`
                    }
                })
                    .then(res => {
                        setListUser(res)
                    })
                    .catch(e => console.log(e))
            }
            getAll();
            setUpdate(false);
        }

    }, [setListUser, update, setUpdate, userInfo, listUser]);



    // console.log(userInfo.pending)

    // si el objeto de lista de usuarios esta vacio, se retorna hasta que contenga algo
    if (userInfo.pending || !listUser) {
        return false
    }
    // debugger
    const { data: { users } } = listUser;

    // console.log(listUser)


    // funcion que refresca la contraseña del usuario
    const toRefresh = async (email) => {
        try {
            const reset = await ResetPassword(email);
            if (reset === 200) {
                return setModal({
                    state: true,
                    mensaje: `se envio un mensaje al ${email} para restablecer su contraseña`
                })

            }

        } catch (error) {
            console.error(error)
        }

    }

    // funcion para eliminar la cuenta registrada a un usuario
    const toDelete = (uid, email) => {
        clienteAxios.delete(`/delete`, {
            params: {
                uid
            },
            headers: {
                'authorization': `Bearer ${userInfo.token.token}`
            }
        })
            .then(res => {
                setUpdate(true);
                return setModal({
                    state: true,
                    mensaje: `se elimino el usuario ${email}`
                })

            })
            .catch(e => {
                console.error(e)
            })


    }


    return (
        <>

            <Card style={{width:700}}>
                <CardHeader className="text-center"><b>Usuarios Registrados</b></CardHeader>
                <CardBody>
                    <Table bordered responsive style={{ display: 'block', overflowY: 'scroll', height: '700px' }} >
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>

                            {users && users.map((user, index) => {
                                const { email, displayName, uid } = user
                                return (

                                    <tr key={index}>
                                        <th>{displayName || "vacio"}</th>
                                        <td>{email}</td>
                                        <td>
                                            <Row>
                                                {/* Boton de actualizar contraseña con tooltip */}
                                                <Button color="link"
                                                    name={uid}
                                                    onClick={() => toRefresh(email)}
                                                >
                                                    <MdRefresh
                                                        id="actualizar"
                                                        type="button"
                                                        size="20px"
                                                        color="blue"

                                                    />
                                                    <UncontrolledTooltip placement="bottom" target="actualizar">
                                                        Restablecer contraseña
                                            </UncontrolledTooltip>

                                                </Button>
                                                {/* Boton de eliminar con tooltip */}
                                                <Button color="link"

                                                >
                                                    <MdClear
                                                        id="eliminar"
                                                        type="button"
                                                        color="red"
                                                        size='20px'
                                                        name={uid}
                                                        onClick={() => toDelete(uid, email)}
                                                    />
                                                    <UncontrolledTooltip placement="bottom" target="eliminar">
                                                        Borrar Usuario
                                            </UncontrolledTooltip>
                                                </Button>
                                            </Row>
                                        </td>
                                    </tr>

                                )
                            })
                            }
                        </tbody>
                    </Table>
                </CardBody>
            </Card>



        </>

    );
}

export default ListUserCard;

