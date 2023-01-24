import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

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
        const { t } = this.props;
        return (
            <Modal onHide={onHide} show={true} centered>
                <Modal.Header>
                    <Modal.Title className="ms-auto">{t("insufficient_priv_modal_title")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {t("insufficient_priv_modal_body")}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>{t("insufficient_priv_modal_btn_ok")}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default withTranslation()(InsufficientPrivModal);