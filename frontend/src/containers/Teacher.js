import React from 'react'
import {connect} from 'react-redux';
import TeacherNav from '../components/TeacherNav';

function Teacher({user}) {

    return (
        <div>
            <TeacherNav />
            Teacher Dashboard
        </div>
    )
}

const mapStateToProps = state => ({
    user : state.auth.user,
})

export default connect(mapStateToProps)(Teacher);
