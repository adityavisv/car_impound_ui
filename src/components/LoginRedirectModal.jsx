import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
class LoginRedirectModal extends React.Component {
    render = () => {
        const { shouldShowRedirectLoginModal, hideRedirectLoginModal, t } = this.props;
        return (
            <Modal show={shouldShowRedirectLoginModal} onHide={hideRedirectLoginModal} centered>
                    <Modal.Header>
                        <Modal.Title className="ms-auto">{t("login_redirect_modal_title")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {t("login_redirect_modal_body")}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={hideRedirectLoginModal}>{t("login_redirect_modal_btn_ok")}</Button>
                    </Modal.Footer>
                </Modal>
        )
    }
}

export default withTranslation()(LoginRedirectModal);