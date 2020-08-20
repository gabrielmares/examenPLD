import React from 'react';
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../firebase/firebase'
// import LayOut from '../layout/index'
// import ExamenPage from '../../pages/Exam'

const Private = ({ component: Component, ...props }) => {

    // const history = useHistory();

    const { user, pending, token } = useAuth();

    if (pending) {
        return false;
    }

    if (!user) {
        return <Redirect to="/" />
    }
    if (!token.claims.oficial) {
        // history.push('/inicio')
        return <Redirect exact to='/inicio' />
    }
    return (
        <Component {...props} usuario={user} />
    );
}

export default Private;

export const PrivateUser = ({ component: Component, ...props }) => {

    const { user, pending } = useAuth();

    if (pending) {
        return false;
    }

    if (!user) {
        return <Redirect to="/" />
    }

    return (
        <Component {...props} usuario={user} />
    );
}