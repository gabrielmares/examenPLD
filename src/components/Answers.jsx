import React from 'react'

import { Label, Input, Row } from 'reactstrap'

const Answers = ({ respuestas }) => {
    const { ID } = respuestas
    return (
        <>
            <Row className="container">
                {respuestas.map((respuesta, index) => (
                    <Label key={ID + index} className={`radio col-md-${respuestas.length <= 3 ? (respuestas.length + 1) : (respuestas.length - 1)}`}> 
                        {/* if number of answer more than 3, set 4 columns, if there are less set 3  */}
                        <Input key={index} id={index} type="radio" name={`pregunta${ID}`} /> {respuesta}
                    </Label>
                ))}
            </Row>

        </>

    );
}

export default Answers;