import React from 'react'


const alertError = ({ alerta }) => {
    return (
        <div className="text-danger text-center">
            <small>{alerta}</small>
        </div>
    );
}

export default alertError;