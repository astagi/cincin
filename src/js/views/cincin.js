import Container from 'react-container';
import React from 'react';
import { Link, UI } from 'touchstonejs';
import Timers from 'react-timers';

module.exports = React.createClass({
    mixins: [Timers],
    componentDidMount () {
        let watchID = navigator.accelerometer.watchAcceleration(
            (acceleration) => {
                console.log("SUCCESS");
                this.setState({
                    x: acceleration.x,
                    y: acceleration.y,
                    z: acceleration.z,
                });
                this.setState({height: (acceleration.z < 0 ? acceleration.z * - 1 : acceleration.z) * 10});
                if (acceleration.z > 6.0 && !this.state.done) {
                    this.setState({done: true});
                    this.playSound();
                    this.showCheersPopup();
                }
                else if (acceleration.z <= 4.0 && this.state.done) {
                    this.setState({done: false});
                }
            },
            () => {
                alert("ERROR");
            },
            {
                frequency: 50
            }
        )
        this.setState({accWatchId: watchID});
    },
    getInitialState () {
        return {
            accWatchId: undefined,
            x: 0,
            y: 0,
            z: 0,
            width: 300,
            height: 100,
            done: false,
            popup: {
                visible: false
            }
        };
    },
    showCheersPopup () {
        this.setState({
            popup: {
                visible: true,
                header: 'Cheers!',
                iconName: 'ion-ios-checkmark',
                iconType: 'success'
            }
        });

        this.setTimeout(() => {
            this.setState({
                popup: {
                    visible: false
                }
            });
        }, 2000);
    },
    playSound () {
        var media = new Media(
            cordova.file.applicationDirectory + 'audio/catch-action.wav',
            () => {

            },
            () => {

            },
            () => {
            },
        );
        media.play();
    },
    componentWillUnmount() {
        if (this.state.accWatchId) {
            navigator.accelerometer.clearWatch(this.state.accWatchId);
        }
    },
    render () {
        return (
            <Container>
                <div><b>X: </b>{this.state.x}</div>
                <div><b>Y: </b>{this.state.y}</div>
                <div><b>Z: </b>{this.state.z}</div>
                <div style={{width: this.state.width, height: this.state.height, background: "blue",borderRadius: `${this.state.width}px / ${this.state.height}px`}}></div>

                <UI.Popup visible={this.state.popup.visible}>
                    <UI.PopupIcon name={this.state.popup.iconName} type={this.state.popup.iconType} />
                    <div><strong>{this.state.popup.header}</strong></div>
                </UI.Popup>
            </Container>
        );
    }
});