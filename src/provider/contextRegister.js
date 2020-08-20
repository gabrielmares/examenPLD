import React from 'react';
import {  useAuth } from '../firebase/firebase'

export const registroContext = React.createContext();

const RegisterContext = (props) => {
    // const infoToken = GetInfo();
    const userInfo = useAuth();
    const [update, setUpdate] = React.useState(true);


    return (
        <registroContext.Provider
            value={{
                update,
                userInfo,
                setUpdate
            }}
        >
            {props.children}
        </registroContext.Provider>

    );
}

export default RegisterContext;