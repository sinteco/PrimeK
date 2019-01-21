import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class patientNote extends Component {
    render() {
        return (
            <div>
                <p>notes list</p>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(patientNote);