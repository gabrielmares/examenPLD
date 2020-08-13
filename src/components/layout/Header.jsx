import React from 'react'
import { NavItem, NavLink, Navbar, Nav, Button, Tooltip } from 'reactstrap'
import { logOut, useAuth } from '../../firebase/firebase'
import { useHistory } from 'react-router-dom';

const Header = () => {
    let history = useHistory();
    const UserInfo = useAuth();
    const [tooltipOpen, setTooltipOpen] = React.useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    if (UserInfo.pending) {
        return false
    }
    const { displayName, photoURL } = UserInfo.user
    let typeUser = Boolean(photoURL);
    // console.log(displayName)

    const closeSession = () => {
        logOut()
        history.push('/');
    }

    return (
        <>
            <Navbar expand="lg" className="container-fluid bg-info headers" style={typeUser ? (null) : ({ justifyContent: 'center' })}>

                <div className="float-right col-5 collapse navbar-collapse" id="navbarSupportedContent">
                    {typeUser && (
                        <Nav className="mr-2" navbar>
                            <NavItem>
                                <NavLink color="light" className="color-links mr-2" href="/pld/registro">Usuarios</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="color-links" href="/pld/resultados">Resultados</NavLink>
                            </NavItem>
                        </Nav>
                    )}
                </div>

                <h1 className="mr-auto">Examen de PLD</h1>

                <Button color="info" type="input" id="infoClose" onClick={closeSession}>
                    <span className="name" >{displayName}</span>
                    <Tooltip placement="bottom" isOpen={tooltipOpen} autohide={false} target="infoClose" toggle={toggle}>
                        Salir del examen
                     </Tooltip>
                </Button>
            </Navbar>
        </>
    );
}

export default Header;
