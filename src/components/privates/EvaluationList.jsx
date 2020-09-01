import React from 'react'
import { Container, Form } from 'reactstrap'
import styled from '@emotion/styled';
import generaPDF from '../PDF'
// import ReactPDF from '@react-pdf/renderer'


const Titulo = styled.a`
    font-size:1.5rem;
    color: #000;
    margin: 0;
    :hover {
        cursor: pointer;
    }
`;

const ExamenXD = styled.li`
    padding: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;

`;



const TextoDescripcion = styled.p`
    font-size: 1.4rem;
    margin: 0;
    color: #000;
`


const ListaEvaluaciones = ({ examenes }) => {
    // const history = useHistory();
    const [pdf, setPdf] = React.useState({
        data: '',
        funcion: false
    });
    // const [get, toGet] = React.useState(false);


    React.useEffect(() => {
        if (pdf.funcion) {
            // eslint-disable-next-line
            const generatePDF = generaPDF(pdf.data);
            //    generatePDF();
        }
        setPdf(false);
    }, [pdf])





    const sendTo = (examen) => {

        setPdf({
            data: examen,
            funcion: true
        })



    }


    return (
        <Container color="white" className="move-up">
            <Form className="bg-white p-4">
                <blockquote className="text-center">
                    <p className="mt-4 h2">Listado de evaluaciones</p>
                </blockquote>
                {examenes.map((examen, index) => (

                    // <h1 key={index}>{examen.usuario.nombre}</h1>
                    < ExamenXD key={index} className="shadow" >
                        <Titulo onClick={() => sendTo(examen)}>{examen.usuario.nombre}</Titulo>
                        <TextoDescripcion>{(examen.calificacion)}</TextoDescripcion>
                    </ExamenXD>
                ))}
            </Form>
        </Container >
    );
}

export default ListaEvaluaciones;