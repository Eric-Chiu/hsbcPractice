import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';
import moment from 'moment'
import weatherIcon from '../asset/icon'

const useStyles = theme => ({
    paper: {
        height: 'auto',
        width: '100%',
    },
    card: {
        boxShadow: 'none',
        maxHeight: '100%',
        textAlign: 'left'
    },
    media: {
        width: '100%'
    },
    avatar: {
        backgroundColor: '#00ccff'
    },
    content: {
        color: '#ffffff'
    },
    infoContainer: {
        textAlign: 'center'
    },
    weatherMax: {
        height: 84,
        backgroundImage: `url(${weatherIcon.maxTemp})`,
        backgroundColor: '#de6667',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    weatherMin: {
        height: 84,
        backgroundImage: `url(${weatherIcon.minTemp})`,
        backgroundColor: '#86b1d3',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    weatherCondition: {
        height: 84,
        backgroundImage: `url(${weatherIcon.conditions})`,
        backgroundColor: '#0072bb',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    weatherWind: {
        height: 84,
        backgroundImage: `url(${weatherIcon.wind})`,
        backgroundColor: '#7d7d7d',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
  });

  class WeatherCard extends React.Component {

    addDefaultIconSrc(ev){
		ev.target.src = weatherIcon._01d
    }

    showMoreWeather(date){
        this.props.onShowMoreWeather(date)
    }

    displayWindDirection(degree){
        const deg = Number(degree)
        let dircetion = 'N'
        if(deg >= 0 && deg < 15){
            dircetion = 'N'
        } else if(deg >= 15 && deg < 35){
            dircetion = 'NNE'
        } else if(deg >= 35 && deg < 55){
            dircetion = 'NE'
        } else if(deg >= 55 && deg < 75){
            dircetion = 'ENE'
        } else if(deg >= 75 && deg < 105){
            dircetion = 'E'
        } else if(deg >= 105 && deg < 125){
            dircetion = 'ESE'
        } else if(deg >= 125 && deg < 145){
            dircetion = 'SE'
        } else if(deg >= 145 && deg < 165){
            dircetion = 'SSE'
        } else if(deg >= 165 && deg < 195){
            dircetion = 'S'
        } else if(deg >= 195 && deg < 215){
            dircetion = 'SSW'
        } else if(deg >= 215 && deg < 235){
            dircetion = 'SW'
        } else if(deg >= 235 && deg < 255){
            dircetion = 'WSW'
        } else if(deg >= 255 && deg < 285){
            dircetion = 'W'
        } else if(deg >= 285 && deg < 305){
            dircetion = 'WNW'
        } else if(deg >= 305 && deg < 325){
            dircetion = 'NW'
        } else if(deg >= 325 && deg < 345){
            dircetion = 'NNW'
        } else if(deg >= 345 && deg <= 360){
            dircetion = 'N'
        }
        return dircetion
    }
    
    render(){
        const { value, timeZone, classes, haveMore } = this.props
        return (
                <Grid item xs={12} sm={6} lg={4}>
                    <Paper className={classes.paper}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                <Avatar aria-label="weather" className={classes.avatar}>
                                    <img
                                        className={classes.media}
                                        src={weatherIcon[`_${value.weather[0].icon}`]}
                                        title={value.weather[0].main}
                                        alt={value.weather[0].main}
                                        onError={this.addDefaultIconSrc}
                                    />
                                </Avatar>
                                }
                                action={ haveMore ? (
                                    <IconButton aria-label="see more">
                                        <ChevronRight />
                                    </IconButton>
                                ) : null }
                                title={haveMore ? moment((value.dt + timeZone) * 1000).utc().format('YYYY-MM-DD') : moment((value.dt + timeZone) * 1000).utc().format('YYYY-MM-DD HH:mm:ss')}
                                subheader={moment((value.dt + timeZone) * 1000).utc().format('dddd')}
                                onClick={(e) => this.showMoreWeather(moment((value.dt + timeZone) * 1000).utc().format('YYYY-MM-DD'))}
                            />
                            <CardContent className={classes.content}>
                                <Typography variant="h5" component="h2" color="textSecondary">Details</Typography>
                                <div className={classes.weatherMax}>
                                    <div className={classes.infoContainer}>
                                        <Typography variant="h6" component="p">Max Temperature: </Typography>
                                        <Typography variant="h5" component="p"> {value.main.temp_max} &#8451; </Typography>
                                    </div>
                                </div>
                                <div className={classes.weatherMin}>
                                    <div className={classes.infoContainer}>
                                            <Typography variant="h6" component="p">Min Temperature: </Typography>
                                            <Typography variant="h5" component="p"> {value.main.temp_min} &#8451; </Typography>
                                    </div>
                                </div>
                                <div className={classes.weatherCondition}>
                                    <div className={classes.infoContainer}>
                                            <Typography variant="h6" component="p">Conditions: </Typography>
                                            <Typography variant="h5" component="p"> {value.weather[0].description} </Typography>
                                    </div>
                                </div>
                                <div className={classes.weatherWind}>
                                    <div className={classes.infoContainer}>
                                            <Typography variant="h6" component="p">Wind: </Typography>
                                            <Typography variant="h5" component="p"> {value.wind.speed} m/s {this.displayWindDirection(value.wind.deg)}</Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
        )
    }
  }

  export default withStyles(useStyles)(WeatherCard);