// import React from 'react';
import { jsPDF } from "jspdf";
import { Preguntas } from '../Preguntas'
// eslint-disable-next-line
// import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'



const generaPDF = (examen) => {
    const doc = new jsPDF('p', 'in', 'letter');


    const {calificacion, opciones, evaluacion, usuario: { nombre } } = examen
    let positionY = 1, linea, resp, positionX = 0;

    let titulo = `Nombre: ${nombre}`;
    // Calificacion: ${calificacion}`
    doc.text(1, 1, titulo)
    doc.text(6, 1, `Calificacion: ${calificacion}`)
    positionY = 1.7
    let font = doc.getFont();
    Preguntas.map((question, index) => {
        if (index === 8) {
            doc.addPage();
            positionY = 1
        }
        const { pregunta, respuestas } = question
        positionX = 1
        linea = doc
            .setFontSize(14)
            .setTextColor(0)
            .setFont(font, 'normal')
            .splitTextToSize(index + 1 + ". " + pregunta, 6.8)
        doc.text(1, positionY, linea)
        positionY += linea.length * 24 / 72
        let indexPregunta = index
        // eslint-disable-next-line
        respuestas.map((respuesta, index) => {
            resp = doc
                .setFontSize(10)
                .splitTextToSize(respuesta, 2);
            if (parseInt(opciones[indexPregunta]) === index) {
                doc.setFont(font, 'bold');
            }
            doc.text(positionX, positionY, resp);
            positionX = positionX + 2.3;
            doc.setFont(font, 'normal')
        })


        if (!evaluacion[index]) {
            doc
                .setFontSize(16)
                .setTextColor(233, 51, 51)
                .text(7.3, positionY + 0.2, 'Falso')
        } else {
            doc
                .setFontSize(16)
                .setTextColor(15, 190, 44)
                .text(7.3, positionY + 0.2, 'Verdadero')
        }
        if (resp.length <= 2) {
            // eslint-disable-next-line
            positionY += resp.length * 30 / 72
        } else {
            // eslint-disable-next-line
            positionY += resp.length * 24 / 72
        }

    })
    doc.save(`${nombre}.pdf`)

}
export default generaPDF;