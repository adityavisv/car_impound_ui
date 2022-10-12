import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavbarComponent from '../components/NavbarComponent';
import SearchForm from '../components/SearchForm';

export default class SearchPage extends React.Component {
    render = () => {
        return (
            <>
                <NavbarComponent />
                <SearchForm />
            </>
        );
    }
}