import React from 'react';
import { useAuth } from '../firebase/firebase'

export const registroContext = React.createContext();

const RegisterContext = (props) => {

    const userInfo = useAuth();
    const [update, setUpdate] = React.useState(true);
    const [modal, setModal] = React.useState({
        state: false,
        mensaje: ''
    })
    return (
        <registroContext.Provider
            value={{
                update,
                userInfo,
                modal,
                setModal,
                setUpdate
            }}
        >
            {props.children}
        </registroContext.Provider>

    );
}

export default RegisterContext;