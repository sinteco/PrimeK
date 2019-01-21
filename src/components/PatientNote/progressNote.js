import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class progressNote extends Component {
    render() {
        return (
            <div>
                <p>form input</p>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(progressNote);