import Container from 'react-container';
import React from 'react';
import Tappable from 'react-tappable';
import Timers from 'react-timers';
import { Link, UI } from 'touchstonejs';

module.exports = React.createClass({
	mixins: [Timers],
	statics: {
		navigationBar: 'main',
		getNavigation () {
			return {
				title: 'Controls'
			}
		}
	},

	getInitialState () {
		return {
			selectedGlass: localStorage.getItem("selectedGlass") || 'pint',
			selectedBeverage: localStorage.getItem("selectedBeverage") || 'beer'
		}
	},

	handleGlassChange (glass) {
		let selectedItem = glass;
		localStorage.setItem('selectedGlass', glass);
		this.setState({
			selectedGlass: selectedItem
		});

	},

	handleBeverageChange (beverage) {
		let selectedItem = beverage;
		localStorage.setItem('selectedBeverage', beverage);
		this.setState({
			selectedBeverage: selectedItem
		});

	},

	render () {
		let { alertbar } = this.state;
		return (
			<Container scrollable>
				<UI.Group hasTopGutter>
					<UI.GroupHeader>Choose your beverage</UI.GroupHeader>
					<UI.SegmentedControl value={this.state.selectedBeverage} onChange={this.handleBeverageChange} hasGutter options={[
						{ label: 'Beer', value: 'beer' },
						{ label: 'Champagne', value: 'champagne' },
						{ label: 'Cocktail', value: 'cocktail' },
						{ label: 'Absinthe', value: 'absinthe' }
					]} />
				</UI.Group>

				<UI.Group hasTopGutter>
					<UI.GroupHeader>Choose your glass</UI.GroupHeader>
					<UI.SegmentedControl value={this.state.selectedGlass} onChange={this.handleGlassChange} hasGutter options={[
						{ label: 'Pint', value: 'pint' },
						{ label: 'Chalice', value: 'chalice' },
						{ label: 'Glass', value: 'glass' },
					]} />
				</UI.Group>
			</Container>
		);
	}
});
