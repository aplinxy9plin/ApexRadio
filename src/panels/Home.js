import React from 'react';
import { Panel, FormLayout, Slider, Button, Group, Div, PanelHeader, List, Cell, FixedLayout, ScreenSpinner } from '@vkontakte/vkui';
import Icon48Play from '@vkontakte/icons/dist/48/play';
import Icon48Pause from '@vkontakte/icons/dist/48/pause';
import ReactPlayer from 'react-player'

class Home extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			songs: [],
			value: 24,
			play: true,
			play_icon: <Icon48Pause fill="#fff"/>
		}
	}
	componentDidMount(){
		this.props.popout(<ScreenSpinner />)
		fetch("https://apexradiobackend.herokuapp.com/get")
		.then(response => response.json())
		.then(data => {
			this.setState({
				songs: data
			})
			this.props.popout(null)
		})
		.catch(err => {
			this.setState({
				songs: {
					name: "Ошибка загрузки плейлиста",
					time: null
				}
			})
			this.props.popout(null)
		})
	}
	render(){
		return(
			<Panel id={this.props.id}>
				<PanelHeader>Apex Radio</PanelHeader>
				<Group title="Указано московское время">
					<List style={{marginBottom: "85px"}}>
						{
							this.state.songs && this.state.songs.map((song, i) => 
								<Cell key={i} asideContent={song.time}>{song.name}</Cell>
							)
						}
					</List>
				</Group>
				<FixedLayout vertical="bottom">
					<ReactPlayer 
						url='http://webcast.apexradio.ru:8000/NvkzMp3' 
						playing={this.state.play} 
						volume={this.state.val}
					/>
					<div style={{width: "100%", background: "#fff", height: '80px', display: "flex"}}>
						<FormLayout style={{width: "70%"}}>
							<Slider
								min={0}
								max={1}
								step={0.01}
								value={Number(this.state.value)}
								onChange={value => this.setState({value})}
								top="Уровень звука"
							/>
						</FormLayout>
						<Div style={{padding: 0}}>
							<Button 
								onClick={() => this.setState({
									play: !this.state.play, 
									play_icon: !this.state.play ? <Icon48Pause fill="#fff"/> : <Icon48Play fill="#fff"/>
								})} 
								style={{height: "50px", marginTop: "20px"}} 
								before={this.state.play_icon}
							/>
						</Div>
					</div>
				</FixedLayout>
				
			</Panel>
		)
	}
}

export default Home;
