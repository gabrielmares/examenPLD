import React from 'react';
import Admin from '../components/privates/Admin';
import RegisterContext from '../provider/contextRegister';
import Header from '../components/layout/Header'

const ResultsPage = () => {
    return (
        <RegisterContext>
            <Header />
            <Admin />
        </RegisterContext>

    );
}

export default ResultsPage;