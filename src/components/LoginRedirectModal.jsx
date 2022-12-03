import React from 'react';
import { Modal, Button } from 'react-bootstrap';
class LoginRedirectModal extends React.Component {
    render = () => {
        const { shouldShowRedirectLoginModal, hideRedirectLoginModal } = this.props;
        return (
            <Modal show={shouldShowRedirectLoginModal} onHide={hideRedirectLoginModal}>
                    <Modal.Header>
                        <Modal.Title>Session Expired</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Your session has expired, redirecting to login screen. Press 'OK' to proceed.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={hideRedirectLoginModal}>OK</Button>
                    </Modal.Footer>
                </Modal>
        )
    }
}

export default LoginRedirectModal;