import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			popout: null,
			theme: 'client_light'
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				case 'VKWebAppUpdateConfig':
					let schemeAttribute = document.createAttribute('scheme');
					schemeAttribute.value = e.detail.data.scheme ? e.detail.data.scheme : 'client_light';
					document.body.attributes.setNamedItem(schemeAttribute);
					console.log(schemeAttribute.value)
					this.setState({theme: schemeAttribute.value})
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	popout = (e) => {
		this.setState({popout: e})
	}

	render() {
		return (
			<View activePanel={this.state.activePanel} popout={this.state.popout}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} popout={this.popout} client={this.state.theme} />
			</View>
		);
	}
}

export default App;
