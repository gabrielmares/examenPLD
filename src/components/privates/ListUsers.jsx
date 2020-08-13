import React from 'react';
import { Card, CardTitle, Table } from 'reactstrap'

const ListUserCard = ({ usuarios }) => {
    const { data: { users } } = usuarios;
    console.log(users)
    return (
        <>
            <Card>
                <CardTitle className="text-center">
                    <h3>Usuarios Registrados</h3>
                </CardTitle>
                <Table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr id={index}>
                                <td>{user.displayName || "vacio"}</td>
                                <td>{user.email}</td>
                                <td>Acciones</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>

        </>

    );
}

export default ListUserCard;