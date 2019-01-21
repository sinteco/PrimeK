import React, { Component } from 'react';
import { connect } from 'react-redux';

class historyAndPhysical extends Component {
    render() {
        return (
            <div>
                <p>form input</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps,)(historyAndPhysical);