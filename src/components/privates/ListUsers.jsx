import React from 'react';
import { Card, CardHeader, UncontrolledTooltip, Button, Table, CardBody, Modal, ModalBody, ModalFooter } from 'reactstrap'
import clienteAxios from '../../axiosClient';
import { MdClear, MdRefresh, } from 'react-icons/md';
import { registroContext } from '../../provider/contextRegister'
import { ResetPassword } from '../../firebase/firebase'
// import ModalDialog from '../../components/layout/modal'
// import axios from 'axios';
// import dotenv from 'dotenv'
// dotenv.config();




const ListUserCard = () => {
    const [listUser, setListUser] = React.useState(false);
    const { update, setUpdate, userInfo } = React.useContext(registroContext)
    const [modal, setModal] = React.useState(false);

    // console.log(userInfo)
    React.useEffect(() => {
        if (update || !userInfo.pending) {
            async function getAll() {
                await clienteAxios.get('/usuarios', {
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
        }
        setUpdate(false);
    }, [setListUser, update, setUpdate, userInfo]);





    // si el objeto de lista de usuarios esta vacio, se retorna hasta que contenga algo
    if (userInfo.pending || !listUser) {
        return false
    }
    const { data: { users } } = listUser;
    // console.log(listUser)


    // funcion que refresca la contraseña del usuario
    const toRefresh = async (email) => {
        // console.log(email)
        try {
            const reset = await ResetPassword(email);
            console.log(reset)
            if (reset === 200) {
                setModal(true)
            }

        } catch (error) {
            console.error(error)
        }

    }

    // funcion para eliminar la cuenta registrada a un usuario
    const toDelete = async uid => {
        await clienteAxios.delete(`/delete`, {
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

    const toggle = () => setModal(!modal);
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

                            {users && users.map((user, index) => {
                                const { email, displayName, uid } = user
                                return (

                                    <tr key={index}>
                                        <th>{displayName || "vacio"}</th>
                                        <td>{email}</td>
                                        <td className="text-center">
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
                                                    onClick={() => toDelete(uid)}
                                                />
                                                <UncontrolledTooltip placement="bottom" target="eliminar">
                                                    Borrar Usuario
                                            </UncontrolledTooltip>
                                            </Button>
                                        </td>
                                    </tr>

                                )
                            })
                            }
                        </tbody>
                    </Table>
                </CardBody>
            </Card>


            <Modal isOpen={modal}>
                <ModalBody>
                   Se envio un correo de restablecimiento
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </>

    );
}

export default ListUserCard;


// const ModalDialog = () => {

//     return (
//         <>

//         </>
//     )
// }