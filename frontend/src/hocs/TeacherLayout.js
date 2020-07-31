import React, {useEffect} from 'react';
import TeacherNav from '../components/TeacherNav';

import {checkAuthenticated, loadUser} from '../actions/auth';
import {connect} from 'react-redux';

function TeacherLayout(props) {

    useEffect(() => {
        props.checkAuthenticated();
        props.loadUser();
    }, [props]);

    return (
        <div>
            <TeacherNav />
            {props.children}
        </div>
    )
}

export default connect(null, {checkAuthenticated, loadUser})(TeacherLayout);
