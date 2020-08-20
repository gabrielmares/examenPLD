import React from 'react';
import { Card, CardHeader, UncontrolledTooltip, Button, Table, CardBody } from 'reactstrap'
import clienteAxios from '../../axiosClient';
import { MdClear, MdRefresh, } from 'react-icons/md';
import { registroContext } from '../../provider/contextRegister'
// import { getToken } from '../../firebase/firebase'
// import axios from 'axios';
// import dotenv from 'dotenv'
// dotenv.config();




const ListUserCard = () => {
    const [listUser, setListUser] = React.useState(false);
    const { update, setUpdate, userInfo } = React.useContext(registroContext)

    React.useEffect(() => {
        // fncion que solicita al servidor la lista de usuarios registrados
        if (update) {
            async function getAll() {
                await clienteAxios.get('/listadeusuarios')
                    .then(res => {
                        setListUser(res)
                    })
                    .catch(e => console.log(e))
            }
            getAll();
        }
        setUpdate(false);
    }, [setListUser, update, setUpdate]);

    // si el objeto de lista de usuarios esta vacio, se retorna hasta que contenga algo
    if (!listUser) {
        return false
    }
    const { data: { users } } = listUser;
    // console.log(listUser)


    // funcion que refresca la contraseña del usuario
    const toRefresh = uid => {

        console.log(userInfo.token.token)
    }

    // funcion para eliminar la cuenta registrada a un usuario
    const toDelete = async uid => {
        await clienteAxios.delete(`api/delete`, {
            params: {
                uid
            },
            headers: {
                'authorization': `Bearer ${userInfo.token.token}`
            }
        })
            .then(res => {
                setUpdate(true);
            })
            .catch(e => {
                console.error(e)
            })


    }

   
    return (
        <>

            <Card>
                <CardHeader className="text-center"><b>Usuarios Registrados</b></CardHeader>
                <CardBody>
                    <Table bordered responsive size="sm" >
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th className="text-center">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => {
                                const { email, displayName, uid } = user
                                return (
                                    <tr key={index}>
                                        <th>{displayName || "vacio"}</th>
                                        <td>{email}</td>
                                        <td className="text-center">
                                            {/* Boton de actualizar contraseña con tooltip */}
                                            <Button color="link"
                                                name={uid}
                                                onClick={e => toRefresh(e)}
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
                                                    onClick={() => toDelete(uid)}
                                                />
                                                <UncontrolledTooltip placement="bottom" target="eliminar">
                                                    Borrar Usuario
                                            </UncontrolledTooltip>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>

        </>

    );
}

export default ListUserCard;