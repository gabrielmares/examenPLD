import React from 'react'
import { NavItem, NavLink, Navbar, Nav, NavbarText } from 'reactstrap'

const Header = ({ usuario }) => {
    // console.log(usuario)
    return (
        <>
            <Navbar expand="md" className="position-sticky container-fluid bg-info headers" style={usuario === 'OC' ? (null) : ({ justifyContent: 'center' })}>
                {/* <div className="container"> */}
                    {usuario === 'OC' && (
                        <div className="col-5 collapse navbar-collapse" id="navbarSupportedContent">
                        <Nav className="mr-2" navbar>
                            <NavItem>
                                <NavLink color="light" className="color-links mr-2" href="/pld/usuarios">Usuarios</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="color-links" href="/pld/resultados">Resultados</NavLink>
                            </NavItem>
                                {/* <li className="nav-item">
                                    <a className="nav-link" href="#!"></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#!">Usuarios</a>
                                </li> */}
                            </Nav>
                        </div>
                    )}
                {/* <NavbarText className="text-header"></NavbarText> */}
                <h1>Examen de PLD</h1>
               {/* <NavbarText></NavbarText> */}
            </Navbar>
        </>
    );
}

export default Header;
