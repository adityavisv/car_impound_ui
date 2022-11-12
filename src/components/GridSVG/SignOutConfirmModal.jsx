import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class SignOutConfirmModal extends React.Component {

    constructor(props) {
        super(props);
        const { show, onHide } = this.props;
        this.state = {
            show,
            onHide,
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.show  !== this.props.show) {
            this.setState({
                show: this.props.show
            });
        }
    }

    render = () => {
        const { show, onHide } = this.state;
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header>
                    <Modal.Title>Sign Out</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You will be signed out of your current session. Press 'OK' to proceed.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onHide}>OK</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default SignOutConfirmModal;