import React from 'react';
// import RegisterContext from '../provider/contextRegister'
import Login from '../components/signin/Login'

const LoginPage = (props) => {
    return (
        <>
            <Login {...props} />
        </>
    );
}

export default LoginPage;