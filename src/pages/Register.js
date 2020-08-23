import React from 'react';
import ListUserCard from '../components/privates/ListUsers';
import SignIn from '../components/signin/SignIn';
import RegisterContext from '../provider/contextRegister';
import Header from '../components/layout/Header'
import { Row } from 'reactstrap'
import ModalDialog from '../components/privates/Modal'

// const NewListCard = React.lazy(() => import('../components/privates/ListUsers'));

const Registerpage = () => {

    return (
        <RegisterContext>
            <Header />
            <Row className="col-12 mt-4">
                <div className="offset-2 col-4">
                    <SignIn />
                </div>
                <div className="col-4">
                    <ListUserCard />
                </div>
            </Row>
            <ModalDialog />
        </RegisterContext>

    );
}

export default Registerpage;