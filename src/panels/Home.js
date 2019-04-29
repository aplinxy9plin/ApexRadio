import React from 'react';
import { Panel, Button, Group, Div, PanelHeader, List, Cell, FixedLayout, ScreenSpinner } from '@vkontakte/vkui';
import Icon48Play from '@vkontakte/icons/dist/48/play';
import Icon48Pause from '@vkontakte/icons/dist/48/pause';
import ReactPlayer from 'react-player'

class Home extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			songs: [],
			value: 24,
			play: false,
			play_icon: <Icon48Play fill="#fff"/>
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
		.catch(() => {
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
						style={{display: 'none'}}
						controls={false}
						fileConfig={{forceAudio: true}}
						url='http://webcast.apexradio.ru:8000/NvkzMp3' 
						playing={this.state.play} 
						volume={this.state.value}
					/>
					<Div style={{padding: 0, width: "100%", height: '80px', }}>
						{/* <FormLayout style={{width: "70%"}}>
							<Slider
								min={0}
								max={1}
								// step={0.2}
								value={parseFloat(this.state.value)}
								onChange={value => this.setState({value})}
								top="Уровень звука"
							/>
						</FormLayout> */}
						{/* <div style={{marginTop: "10px", width: "100%"}}>
							<h1>{this.state.songs.length > 0 ? this.state.songs[0].name : "Загрузка..."}</h1>
						</div> */}
						<center>
						<Div style={{padding: 0}}>
							<Button 
								level={this.props.client === 'client_light' ? 'primary' : 'secondary'}
								onClick={() => this.setState({
									play: !this.state.play, 
									play_icon: !this.state.play ? <Icon48Pause fill="#fff"/> : <Icon48Play fill="#fff"/>
								})} 
								style={{height: "50px", marginTop: "15px"}} 
								before={this.state.play_icon}
							/>
						</Div>
						</center>
					</Div>
				</FixedLayout>
				
			</Panel>
		)
	}
}

export default Home;
