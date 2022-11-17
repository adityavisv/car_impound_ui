import React from 'react';
import { Image } from 'react-bootstrap';
import '../styles/zonelayoutreference.css';

class ZoneLayoutReference extends React.Component {
    constructor(props) {
        super(props);
            this.state = {};
        
    }

    render = () => {
        return (    
            <div className="img_container">
                <Image width="400px"  height="100%" className="layout_image" src={require("../27J003-FF-003-web-opt.gif")} rounded />
            </div>
        );
    }
}

export default ZoneLayoutReference;