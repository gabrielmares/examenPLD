import React from 'react';
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../firebase/firebase'

const Private = ({ component: Component, ...props }) => {

    const { isSignedIn, user, pending } = useAuth();

    if (pending) {
        return false;
    }

    if (!isSignedIn) {
        return <Redirect to="/" />
    }

    return (
        <Component {...props} usuario={user} />
    );
}

export default Private;