const { Container, Row, Form } = require("react-bootstrap")

class ReleaseForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <Container>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Name *</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Row>
                </Form>
            </Container>
        )
    }
}