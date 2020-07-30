import React from 'react'
import { NavItem, NavLink, Navbar, Nav } from 'reactstrap'

const Header = ({ usuario }) => {
    return (
        <>
            <Navbar expand="md" className="position-sticky container-fluid bg-info headers" style={usuario === 'OC' ? (null) : ({ justifyContent: 'center' })}>
                {usuario === 'OC' && (
                    <div className="col-5 collapse navbar-collapse" id="navbarSupportedContent">
                        <Nav className="mr-2" navbar>
                            <NavItem>
                                <NavLink color="light" className="color-links mr-2" href="/pld/usuarios">Usuarios</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="color-links" href="/pld/resultados">Resultados</NavLink>
                            </NavItem>

                        </Nav>
                    </div>
                )}
                <h1>Examen de PLD</h1>
            </Navbar>
        </>
    );
}

export default Header;
