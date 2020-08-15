
import React from 'react';

export const respuestasContext = React.createContext();

const HandleAnswer = (props) => {

    const [answer, setAnswer] = React.useState({
        respuesta0: "",
        respuesta1: "",
        respuesta2: "",
        respuesta3: "",
        respuesta4: "",
        respuesta5: "",
        respuesta6: "",
        respuesta7: "",
        respuesta8: "",
        respuesta9: ""
    });

    const [evaluar, setEvaluar] = React.useState(false);


    const [evaluacion, setEvaluacicon] = React.useState([])


    const handleQuestion = e => {
        setAnswer({
            ...answer,
            [e.target.name]: e.target.value
        })
    }


    return (
        <respuestasContext.Provider
            value={{
                answer,
                evaluacion,
                evaluar,
                setEvaluar,
                setEvaluacicon,
                setAnswer,
                handleQuestion
            }}

        >
            {props.children}
        </respuestasContext.Provider>
    );
}

export default HandleAnswer;