import React, { Component } from 'react';

export default class Complete extends Component {
    componentDidMount() {
        const { history: { location: { state } } } = this.props;
        window.postMessage(JSON.stringify(state));
    }
    render() {
        return (
            <div>Complete</div>
        );
    }
}
