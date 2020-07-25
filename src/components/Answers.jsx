import React from 'react'

import { Label, Input, Row } from 'reactstrap'

const Answers = ({ respuestas }) => {
    const { ID } = respuestas
    // console.log(respuestas)
    return (
        <>
            <Row className="container">
                <Label className="radio col-sm-3">
                    <Input type="radio" name={`pregunta${ID}`} /> {respuestas[0]}
                </Label>
                <Label className="radio col-sm-3">
                    <Input type="radio" name={`pregunta${ID}`} />{respuestas[1]}
                </Label>
                <Label className="radio col-sm-3">
                    <Input type="radio" name={`pregunta${ID}`} />{respuestas[2]}
                </Label>
                <Label className="radio col-sm-3">
                    <Input type="radio" name={`pregunta${ID}`} />{respuestas[3]}
                </Label>

            </Row>

        </>

    );
}

export default Answers;