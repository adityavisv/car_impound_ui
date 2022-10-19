import React from 'react';
import ReleaseCarForm from '../components/ReleaseCarForm';
import NavbarComponent from '../components/NavbarComponent';

class ReleaseCarPage extends React.Component {
    render = () => {
        return (
            <>
                <NavbarComponent />
                <ReleaseCarForm />
            </>
        );
    }
}

export default ReleaseCarPage;