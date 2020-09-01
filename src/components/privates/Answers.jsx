import React from 'react'
import { respuestasContext } from '../../provider/contextAnswers'
import { Label, Input, Row } from 'reactstrap'


const Answers = ({ respuestas }) => {


    const { handleQuestion } = React.useContext(respuestasContext);

    const { ID } = respuestas


    return (
        <>
            <Row className="container pt-4">
                {respuestas.map((respuesta, index) => (
                    <Label key={ID + index} className={`radio col-md-${respuestas.length <= 3 ? (respuestas.length + 1) : (respuestas.length - 1)}`}>
                        {/* if number of answer more than 3, set 4 columns, if there are less set 3  */}
                        <Input key={index} id={index} type="radio" name={`${ID}`} value={respuesta} onChange={handleQuestion} /> {respuesta}
                    </Label>

                ))}

                {/* {evaluar ? (evaluacion[ID] ? (<AiOutlineCheck color="green" />) : (<AiOutlineClose color="red" />)) : null} */}
            </Row>

        </>

    );
}

export default Answers;