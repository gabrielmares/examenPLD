import React from 'react';

export const registroContext = React.createContext();

const RegisterContext = (props) => {

    const [update, setUpdate] = React.useState(true);



    return (
        <registroContext.Provider
            value={{
                update,
                setUpdate
            }}
        >
            {props.children}
        </registroContext.Provider>

    );
}

export default RegisterContext;