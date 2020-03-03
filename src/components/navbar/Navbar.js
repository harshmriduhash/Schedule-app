import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <div className="mt2 mb2">
            <Link to='/' className="f4 fw7 black-90 link">{props.text}</Link>
        </div>
    );
}

export default Navbar;