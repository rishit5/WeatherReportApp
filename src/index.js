import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './styles.css';

class App extends React.Component {
    render() {
       return (
        <div className="mainbox">
            <div className="outerbox">
                <div className="leftbox">
                    <h1>Weather Finder</h1>
                    <p>Find out the temperature, <br></br> weather conditions and more</p>
                </div>
                <WorkingComponent />
            </div>
        </div>)
    }
};
class WorkingComponent extends React.Component {
    state = {
        city: null,
        country: null,
        apikey: "4507a943a3c63cffe294b4adbeb5bd3c",
        weather: null
    }
    handleChange = (event, value) => {
        console.log('Im here');
        if(value === 'city'){
            this.setState({
                city: event.target.value
            })
        }else if(value === 'country') {
            this.setState({
                country: event.target.value
            })
        }
}
    handleClick = () => {
        console.log('Im herer 2')
        if(this.state.city) {
            if(this.state.country){
                axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&APPID=${this.state.apikey}`)
                    .then((response) => {
                        this.setState({
                            weather: response.data
                        })
                    })
            }else {
                axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=${this.state.apikey}`)
                    .then((response) => {
                        this.setState({
                            weather: response.data
                        })
                        console.log(response.data)
                    })
            }
        }
    }
    render() {
        return(
            <div className="rightbox">
                <input placeholder="City" onChange={(event, value) => this.handleChange(event, 'city')}></input>
                <input placeholder="Country" onChange={(event, value) => this.handleChange(event, 'country')}></input>
                <button type="button" onClick={this.handleClick}>Find Weather</button>
                {this.state.weather && 
                <div className="result">
                    <div className="tinybox"><span className="attribute">Location:</span>   {this.state.weather.name}, {this.state.weather.sys.country}</div>
                    <div className="tinybox"><span className="attribute">Temperature:</span>          {parseInt(( this.state.weather.main.temp_max + this.state.weather.main.temp_min )/ 2 - 273)}°C</div>
                    <div className="tinybox"><span className="attribute">Humidity:</span>   {this.state.weather.main.humidity} %</div>
                    <div className="tinybox"><span className="attribute">Conditions:</span>    {this.state.weather.weather[0].main}</div>                    
                </div>
                }
            </div>
        )
    }
}
export default App;
ReactDOM.render(<App />, document.getElementById('root'));