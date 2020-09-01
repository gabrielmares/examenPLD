
import React from 'react';

export const respuestasContext = React.createContext();

const HandleAnswer = (props) => {

    const [answer, setAnswer] = React.useState({
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
        11: ""

    });

    const [evaluar, setEvaluar] = React.useState(false);
    const [print, setPrint] = React.useState(false);

    const [option, setOption] = React.useState({
        respuesta0: "",
        respuesta1: "",
        respuesta2: "",
        respuesta3: "",
        respuesta4: "",
        respuesta5: "",
        respuesta6: "",
        respuesta7: "",
        respuesta8: "",
        respuesta9: "",
        respuesta10: "",
        respuesta11: ""

    })
    const [evaluacion, setEvaluacicon] = React.useState([])


    const handleQuestion = e => {
        setOption({
            ...option,
            [e.target.name]: e.target.id
        })
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
                option,
                print,
                setPrint,
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