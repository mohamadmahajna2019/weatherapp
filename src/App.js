import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Fevorite from './components/Fevorite';
import Home from './components/Home';
import Panel from './components/Panel';
import history from "./history";
import Data from "./Data.json"
import "./App.css"

export default class App extends Component {
  state={
    fevoriteList:[],
    weatherList:[],
    Api_Key:"429736441cf3572838aa10530929f7cd",
    WeatherDitails:{
        id:0,
        city:"",
        country:"",
        weather:[]
    },
    error:false,
    day:null,
    days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    findcity:false
  }
  // get data from json
  componentDidMount(){
    this.setState({weatherList:Data})
    const d = new Date()
    this.setState({day:d.getDay()})
  }
  // take the wheather from api server 
  getWeather = async (city, country) => {
     this.setState({findcity:true})
    let x=null;
    x= this.state.weatherList.find(item=> city===item.city && country===item.country)
    if(x)
    {
      this.setState({error:false})
      var object={ 
        id:x.id,
        city:x.city,
        country:x.country,
        weather:x.weather
      }
      this.setState({WeatherDitails:object})

    }
    else
    {
      this.setState({error:true})
        alert("city not found")
    }
  };
  // add the city to fevorite list
  addToFevorite=()=>{
    let x=undefined
    x=this.state.fevoriteList.find(item=> String(this.state.WeatherDitails.city)===String(item.city) && String(this.state.WeatherDitails.country)===String(item.country))
    if(!this.state.error && x===undefined)
    {
      let object={
        id:this.state.WeatherDitails.id,
        city:this.state.WeatherDitails.city,
        country:this.state.WeatherDitails.country,
        weather:this.state.WeatherDitails.weather,
      }
      this.setState({fevoriteList:[...this.state.fevoriteList,object]})
    }
    else{
      alert("exsist in fevorite list")
    }
  }
  // remuve city from fevorite list
  remuveFevorite=(remuveCity)=>{
    console.log(remuveCity);
    let newList=this.state.fevoriteList.filter(object=>remuveCity.id!==object.id)
console.log(newList);
this.setState({fevoriteList:[...newList]})
  }
  render() {
    return (
      <div className="App">
         <Router history={history}>
           <Panel/>
            <Switch>
              {/* home-page */}
              <Route
                exact
                path={"/"}
                render={(props) => (
                  <Home
                    {...props}
                    getWeather={this.getWeather}
                    addToFevorite={this.addToFevorite}
                    WeatherDitails={this.state.WeatherDitails}
                    error={this.state.error}
                    findcity={this.state.findcity}
                    day={this.state.day}
                  />
                )}
              />
              <Route
                exact
                path={"/fevorite"}
                render={(props) => (
                  <Fevorite
                    {...props}
                    fevoriteList={this.state.fevoriteList}
                    day={this.state.day}
                    remuveFevorite={this.remuveFevorite}
                  />
                )}
              />
              </Switch>
              </Router>
      </div>
    )
  }
}

