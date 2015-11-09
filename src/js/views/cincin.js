import React from 'react';

module.exports = React.createClass({
    componentDidMount () {
        let watchID = navigator.accelerometer.watchAcceleration(
            (acceleration) => {
                console.log("SUCCESS");
                this.setState({
                    x: acceleration.x,
                    y: acceleration.y,
                    z: acceleration.z,
                });
            },
            () => {
                alert("ERROR");
            },
            {
                frequency: 200
            }
        )
        this.setState({accWatchId: watchID});
    },
    getInitialState: function() {
        return {
            accWatchId: undefined,
            x: 0,
            y: 0,
            z: 0
        };
    },
    componentWillUnmount() {
        if (this.state.accWatchId) {
            navigator.accelerometer.clearWatch(this.state.accWatchId);
        }
    },
    render () {
        return (
            <div>
                <div><b>X: </b>{this.state.x}</div>
                <div><b>Y: </b>{this.state.y}</div>
                <div><b>Z: </b>{this.state.z}</div>
            </div>
        );
    }
});