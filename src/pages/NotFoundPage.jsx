import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NotFoundPage extends React.Component {
    render = () => {
        return (
            <Container>
                <h1>You've landed at a wrong page! Press <Link to="/">here</Link> to go back home. </h1>
            </Container>
        )
    }
}

export default NotFoundPage;