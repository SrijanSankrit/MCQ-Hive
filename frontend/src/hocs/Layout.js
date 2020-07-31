import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {checkAuthenticated, loadUser} from '../actions/auth';

import Navbar from '../components/Navbar';

function Layout(props) {

    useEffect(() => {
        props.checkAuthenticated();
        props.loadUser();
    },[props]);

    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    )
}

export default connect(null, {checkAuthenticated, loadUser})(Layout);
