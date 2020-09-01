import React from 'react';
// import EvaluationResult from '../components/privates/Evaluation';
import ListaEvaluaciones from '../components/privates/EvaluationList'
import RegisterContext from '../provider/contextRegister';
// import { Row, Col } from 'reactstrap'
import Header from '../components/layout/Header'
import { ListExamen } from '../firebase/firebase'

const ResultsPage = () => {

    // const [examenesLista, setExamenesLista] = useState(false)
    // const [update, getupdate] = useState(true)

    const lista = ListExamen();

    const { pending, examenes } = lista;

    if (pending) {
        return false;
    }

    // console.log(examenes)



    return (
        <RegisterContext>
            <Header />
            <ListaEvaluaciones examenes={examenes} />
        </RegisterContext>

    );
}

export default ResultsPage;