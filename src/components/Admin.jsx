import React from 'react';
import Header from './layout/Header';



const Admin = () => {
    const User = localStorage.getItem('Usuario');
    return (
        <>
            <Header usuario={User} />
            <h1>Desde la administracion</h1>
        </>

    );
}

export default Admin;