import React from 'react';
import ListUserCard from '../components/privates/ListUsers';
import SignIn from '../components/signin/SignIn';
import RegisterContext from '../provider/contextRegister';
import Header from '../components/layout/Header'


const Registerpage = () => {
    return (
        <>
            <RegisterContext>
                <Header />
                <div className="row p-4">
                    <div className="offset-1 col-4">
                        <SignIn />
                    </div>
                    <div className="offset-1 col-4">
                        <ListUserCard />
                    </div>
                </div>
            </RegisterContext>
        </>

    );
}

export default Registerpage;