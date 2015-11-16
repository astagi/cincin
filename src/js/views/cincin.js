import Container from 'react-container';
import React from 'react';
import { Link, UI } from 'touchstonejs';
import Timers from 'react-timers';
import getBarStore from '../stores/barstore'

module.exports = React.createClass({
    mixins: [Timers],
    componentDidMount () {
        let watchID = navigator.accelerometer.watchAcceleration(
            (acceleration) => {
                this.setState({height: (acceleration.z < 0 ? 1 : acceleration.z) * 10});
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
            {frequency: 50}
        )
        this.setState({accWatchId: watchID});
    },
    getInitialState () {
        let selectedGlass = localStorage.getItem("selectedGlass") || 'pint';
        let selectedBeverage = localStorage.getItem("selectedBeverage") || 'beer';

        let barStore = getBarStore();

        selectedBeverage = barStore['beverages'][selectedBeverage];
        selectedGlass = barStore['glasses'][selectedGlass];

        return {
            accWatchId: undefined,
            x: 0,
            y: 0,
            z: 0,
            width: window.screen.width,
            height: 100,
            done: false,
            popup: {
                visible: false
            },
            beverage: selectedBeverage,
            glass: selectedGlass
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
            cordova.file.applicationDirectory + 'audio/' + this.state.glass.sound,
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
                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    marginTop: (300 - this.state.glass.height) + 50,
                    backgroundColor: this.state.beverage.color,
                }}>
                </div>
                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "150",
                    marginTop: (300 - this.state.glass.height),
                    backgroundColor: this.state.beverage.foam || this.state.beverage.color,
                    borderRadius: `${this.state.width}px / ${this.state.height}px`
                }}>
                </div>
                <div style={{
                    position: "absolute",
                    width: this.state.width,
                    height: this.state.height,
                    marginTop: (300 - this.state.glass.height),
                    backgroundColor: this.state.beverage.topColor,
                    borderRadius: `${this.state.width}px / ${this.state.height}px`
                }}>
                </div>

                <UI.Popup visible={this.state.popup.visible}>
                    <UI.PopupIcon name={this.state.popup.iconName} type={this.state.popup.iconType} />
                    <div><strong>{this.state.popup.header}</strong></div>
                </UI.Popup>
            </Container>
        );
    }
});
