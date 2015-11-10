import React from 'react/addons';
import {
	Container,
	createApp,
	UI,
	View,
	ViewManager
} from 'touchstonejs';

// App Config
// ------------------------------

const PeopleStore = require('./stores/people')
const peopleStore = new PeopleStore()

var App = React.createClass({
	mixins: [createApp()],

	childContextTypes: {
		peopleStore: React.PropTypes.object
	},

	getChildContext () {
		return {
			peopleStore: peopleStore
		};
	},

	render () {
		let appWrapperClassName = 'app-wrapper device--' + (window.device || {}).platform

		return (
			<div className={appWrapperClassName}>
				<div className="device-silhouette">
					<ViewManager name="app" defaultView="main">
						<View name="main" component={MainViewController} />
						<View name="transitions-target-over" component={require('./views/transitions-target-over')} />
					</ViewManager>
				</div>
			</div>
		);
	}
});

// Main Controller
// ------------------------------

var MainViewController = React.createClass({
	render () {
		return (
			<Container>
				<ViewManager name="main" defaultView="tabs">
					<View name="tabs" component={TabViewController} />
				</ViewManager>
			</Container>
		);
	}
});

// Tab Controller
// ------------------------------

var lastSelectedTab = 'lists'
var TabViewController = React.createClass({
	getInitialState () {
		return {
			selectedTab: lastSelectedTab
		};
	},

	onViewChange (nextView) {
		lastSelectedTab = nextView

		this.setState({
			selectedTab: nextView
		});
	},

	selectTab (value) {
		let viewProps;

		this.refs.vm.transitionTo(value, {
			transition: 'instant',
			viewProps: viewProps
		});

		this.setState({
			selectedTab: value
		})
	},

	render () {
		let selectedTab = this.state.selectedTab
		let selectedTabSpan = selectedTab

		if (selectedTab === 'lists' || selectedTab === 'list-simple' || selectedTab === 'list-complex' || selectedTab === 'list-details') {
			selectedTabSpan = 'lists';
		}

		if (selectedTab === 'transitions' || selectedTab === 'transitions-target') {
			selectedTabSpan = 'transitions';
		}

		return (
			<Container>
				<ViewManager ref="vm" name="tabs" defaultView={selectedTab} onViewChange={this.onViewChange}>
					<View name="lists" component={require('./views/cincin')} />
					<View name="controls" component={require('./views/controls')} />
				</ViewManager>
				<UI.Tabs.Navigator>
					<UI.Tabs.Tab onTap={this.selectTab.bind(this, 'lists')} selected={selectedTabSpan === 'lists'}>
						<span className="Tabs-Icon Tabs-Icon--lists" />
						<UI.Tabs.Label>Lists</UI.Tabs.Label>
					</UI.Tabs.Tab>
					<UI.Tabs.Tab onTap={this.selectTab.bind(this, 'controls')} selected={selectedTabSpan === 'controls'}>
						<span className="Tabs-Icon Tabs-Icon--controls" />
						<UI.Tabs.Label>Controls</UI.Tabs.Label>
					</UI.Tabs.Tab>
				</UI.Tabs.Navigator>
			</Container>
		);
	}
});

function startApp () {
	if (window.StatusBar) {
		window.StatusBar.styleDefault();
	}
	React.render(<App />, document.getElementById('app'));
}

if (!window.cordova) {
	startApp();
} else {
	document.addEventListener('deviceready', startApp, false);
}
