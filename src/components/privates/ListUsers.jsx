import React from 'react';
import { Card, CardHeader, UncontrolledTooltip, Button } from 'reactstrap'
import clienteAxios from '../../axiosClient';
import { MdClear, MdRefresh, } from 'react-icons/md';
import { registroContext } from '../../provider/contextRegister'



const ListUserCard = () => {
    // const { update, setUpdate } = actualizar;
    const [listUser, setListUser] = React.useState(false);
    const { update, setUpdate } = React.useContext(registroContext)

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
    }, [setListUser, update, setUpdate])

    // si el objeto de lista de usuarios esta vacio, se retorna hasta que contenga algo
    if (!listUser) {
        return false
    }
    const { data: { users } } = listUser;

    console.log(users)
    const toRefresh = uid => {
        console.log('actualizar', uid)
    }

    const toDelete = async uid => {
        let respuesta = await clienteAxios('/eliminarusuario', {
            params: {
                uid
            }
        });
        if (respuesta.request.status === 200) {
            setUpdate(true);
        }
    }



    return (
        <>
            <Card>

                <CardHeader className="text-center"><b>Usuarios Registrados</b></CardHeader>
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr className="text-center">
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Accion</th>
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
                </table>
            </Card>

        </>

    );
}

export default ListUserCard;