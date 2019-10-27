import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar'
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import moment from 'moment'
import { getCityWeather } from '../redux/action';
import weatherIcon from '../asset/icon'
import WeatherCard from './weatherCard'

const useStyles = theme => ({
	root: {
		flexGrow: 1,
	},
	toolbar: {
		backgroundColor: '#3f51b5',
		color: '#ffffff'
	}
  });

class DisplayWeather extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			displayWeather: [],
			storedWeather: [],
			detailWeather:[],
			timeZone: 0,
			open: false,
			detailDate: '',
			city: '',
			country: ''
		};
    }

	componentDidMount() {
		this.props.dispatch(getCityWeather())
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		if(this.props.filter !== prevProps.filter){
			this.props.dispatch(getCityWeather(this.props.filter))
		}
		if(this.props.weather !== prevProps.weather){
			if(!_.isEmpty(this.props.weather)){
				const storedWeather = this.props.weather.list
				const timeZone = this.props.weather.city.timezone
				this.setState({
					storedWeather,
					timeZone,
					city: this.props.weather.city.name,
					country: this.props.weather.city.country
				})
			}else{
				this.setState({
					storedWeather: [],
					timeZone: 0,
					city: '',
					country:  ''
				})
			}
		}
		if(this.state.storedWeather !== prevState.storedWeather){
			if(!_.isEmpty(this.state.storedWeather)){
				const displayWeather = []
				this.state.storedWeather.forEach((value, index) => {
					if(index % 8 === 0){
						displayWeather.push(value)
					}
				})
				this.setState({
					displayWeather
				})
			}else{
				this.setState({
					displayWeather: []
				})
			}
		}
	}

	addDefaultIconSrc(ev){
		ev.target.src = weatherIcon._01d
	}

	showMoreWeather(date){
		const { storedWeather, timeZone } = this.state
		const detailWeather = []
		storedWeather.forEach((value, index) => {
			const itemDate = moment((value.dt + timeZone) * 1000).utc().format('YYYY-MM-DD')
			if(itemDate === date){
				detailWeather.push(value)
			}
		})
		this.setState({
			detailWeather,
			open: true,
			detailDate: date
		})
	}

	handleClose(){
		this.setState({
			open: false
		})
	}

	handleDisappear(){
		this.setState({
			detailWeather: [],
			detailDate: ''
		})
	}
	
	render() {
		const { displayWeather, detailWeather, open, detailDate, timeZone, city, country } = this.state;
		const { fetching, classes } = this.props;
		return fetching ? (<CircularProgress className={classes.progress} />) : (
			<div>
				<Typography variant="h4" component="p" gutterBottom={true}>City: {city}, {country}</Typography>
				<Grid container className={classes.root} justify="flex-start" spacing={2}>
                    {_.isEmpty(displayWeather) ? (<Typography variant="h6" component="p">No weather info found</Typography>) : displayWeather.map((value, index) => {
						return(
							<WeatherCard value={value} timeZone={timeZone} key={`weatherCard_${index}`} onShowMoreWeather={(date) => this.showMoreWeather(date)} haveMore={true}></WeatherCard>
                    )})}
                </Grid>
				<Dialog fullScreen open={open} onExit={() => this.handleDisappear()} TransitionComponent={Slide}>
					<Toolbar className={classes.toolbar}>
						<IconButton edge="start" color="inherit" onClick={() => this.handleClose()} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" component="p">{detailDate.substring(0,10)}</Typography>
					</Toolbar>
					<Container>
						<Box my={2}>
							<Grid container className={classes.root} justify="flex-start" spacing={2}>
								{detailWeather.map((value, index) => {
									return(
										<WeatherCard value={value} timeZone={timeZone} key={`weatherCard_${index}`} onShowMoreWeather={(date) => {}} haveMore={false}></WeatherCard>
								)})}
							</Grid>
						</Box>
					</Container>
				</Dialog>
			</div>
		)
	}
}

DisplayWeather.propTypes = {
	weather: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
	fetching: PropTypes.bool.isRequired,
	filter: PropTypes.string
};

DisplayWeather.defaultProps = {
	weather: {},
	fetching: false
};

const mapStateToProps = state => {
	return {
	  weather: state.weather.weather,
	  fetching: state.weather.isFetching
	}
  }

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(DisplayWeather));