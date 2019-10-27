import React from 'react';
import { withStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import './App.css';
import ElevationScroll from './component/elevationScroll';
import DisplayWeather from './component/displayWeather';

const useStyles = theme => ({
  appBar: {},
  title: {
    flexGrow: 1,
    display: 'block',
    textAlign: 'left',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: 'auto%',
    marginLeft: theme.spacing(3),
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
})

class App extends React.Component {
  constructor(props) {
		super(props);
		
		this.state = {
      cityName: ''
    };

    this.changeCityName = this.changeCityName.bind(this)
  }

  changeCityName(event){
    const newVlaue = event.target.value
    this.setState({
      cityName: newVlaue
    })
  }

  render(){
    const {classes} = this.props
    return (
      <div className="App">
        <CssBaseline />
        <ElevationScroll {...this.props}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography className={classes.title} variant="h6" noWrap>Weather</Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={this.changeCityName}
                />
              </div>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
        <Container>
          <Box my={2}>
            <DisplayWeather filter={this.state.cityName} />
          </Box>
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(App);
