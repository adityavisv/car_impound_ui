import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class InsufficientPrivModal extends React.Component {

    constructor(props) {
        super(props);
        const {  onHide } = this.props;
        this.state = {
            onHide
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.onHide !== this.props.onHide) {
            this.setState({
                show: this.props.onHide
            });
        }
    }

    render = () => {
        const { onHide } = this.state;
        return (
            <Modal onHide={onHide} show={true} centered>
                <Modal.Header>
                    <Modal.Title className="ms-auto">Insufficient Privilege</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    User does not have the sufficient privileges to register a new user. Press 'OK' to proceed. 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>OK</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default InsufficientPrivModal;