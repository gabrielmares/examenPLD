import React from 'react'
import { registroContext } from '../../provider/contextRegister'
import { Modal, ModalFooter, ModalBody, Button } from 'reactstrap'


const ModalDialog = () => {

    const { modal, setModal } = React.useContext(registroContext);
    const { state, mensaje } = modal;
    const toggle = () => setModal({
        state: !modal.state,
        mensaje: ''
    });
    return (
        <Modal isOpen={state} className="modal-dialog modal-dialog-centered">
            <ModalBody>
                {mensaje}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalDialog;