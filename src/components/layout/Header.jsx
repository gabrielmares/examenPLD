import React from 'react'
import { NavItem, Navbar, Nav, Button, Tooltip } from 'reactstrap'
import { logOut } from '../../firebase/firebase'
import { useHistory, NavLink } from 'react-router-dom';
import { registroContext } from '../../provider/contextRegister'

const Header = (props) => {
    let history = useHistory();
    const { userInfo } = React.useContext(registroContext);
    const [tooltipOpen, setTooltipOpen] = React.useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    if (userInfo.pending) {
        return false
    }
    // console.log(userInfo)
    // console.log()
    const { name, oficial } = userInfo.token.claims


    const closeSession = () => {
        logOut()
        history.push('/');
    }




    return (
        <>
            <Navbar expand="lg" className="container-fluid bg-info headers" style={oficial ? (null) : ({ justifyContent: 'center' })}>

                <div className="float-right col-5 collapse navbar-collapse" id="navbarSupportedContent">
                    {oficial && (
                        <Nav className="mr-2" navbar>
                            <NavItem>
                                <NavLink color="light" className="color-links mr-2" to="/pld/registro">Usuarios</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="color-links" to="/pld/resultados">Resultados</NavLink>
                            </NavItem>
                        </Nav>
                    )}
                    {/* <Button color="white" onClick={getToken}>Get Token</Button> */}
                </div>

                <h1 className="mr-auto">Examen de PLD</h1>

                <Button color="info" type="input" id="infoClose" onClick={closeSession}>
                    <span className="name" >{name}</span>
                    <Tooltip placement="bottom" isOpen={tooltipOpen} autohide={false} target="infoClose" toggle={toggle}>
                        Salir del examen
                     </Tooltip>
                </Button>
            </Navbar>
        </>
    );
}

export default Header;
