import React from 'react'
<<<<<<< HEAD
import { NavItem, NavLink, Navbar, Nav, Button, Tooltip } from 'reactstrap'
import { logOut } from '../../firebase/firebase'

const Header = ({ usuario }) => {

    const [tooltipOpen, setTooltipOpen] = React.useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    const { displayName, photoURL } = usuario
    let typeUser = Boolean(photoURL);
    // console.log(typeUser)
    return (
        <>
            <Navbar expand="lg" full className="container-fluid bg-info headers" style={typeUser ? (null) : ({ justifyContent: 'center' })}>

                <div className="float-right col-5 collapse navbar-collapse" id="navbarSupportedContent">
                    {typeUser && (
=======
import { NavItem, NavLink, Navbar, Nav } from 'reactstrap'

const Header = ({ usuario }) => {
    return (
        <>
            <Navbar expand="md" className="position-sticky container-fluid bg-info headers" style={usuario === 'OC' ? (null) : ({ justifyContent: 'center' })}>
                {usuario === 'OC' && (
                    <div className="col-5 collapse navbar-collapse" id="navbarSupportedContent">
>>>>>>> 6221ecb9ba349cefa26ab73acd5cbcfbc94b981a
                        <Nav className="mr-2" navbar>
                            <NavItem>
                                <NavLink color="light" className="color-links mr-2" href="/pld/usuarios">Usuarios</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="color-links" href="/pld/resultados">Resultados</NavLink>
                            </NavItem>

                        </Nav>
<<<<<<< HEAD
                    )}
                </div>

                <h1 className="mr-auto">Examen de PLD</h1>

                <Button color="info" type="input" id="infoClose" onClick={() => logOut()}>
                    <span className="name" > {displayName}</span>
                    <Tooltip placement="bottom" isOpen={tooltipOpen} autohide={false} target="infoClose" toggle={toggle}>
                        Salir del examen
                     </Tooltip>
                </Button>
=======
                    </div>
                )}
                <h1>Examen de PLD</h1>
>>>>>>> 6221ecb9ba349cefa26ab73acd5cbcfbc94b981a
            </Navbar>
        </>
    );
}

export default Header;
