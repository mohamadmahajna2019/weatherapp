import React, { Component } from 'react'

export default class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            city:"",
            country:"",
            findcity:false,
            day:null,
            days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        }
    }
    search=()=>{
        //save today day
        const d = new Date()
        this.setState({day:d.getDay()})
       // go to getWeather func
       this.props.getWeather(this.state.city,this.state.country);
       this.setState({findcity:true})
    } 
    render() {
        return (
            <div>
                <input className="inputStyle" type="text" placeholder="enter city" onChange={(e)=>this.setState({city:e.target.value})}/>
                <input className="inputStyle" type="text" placeholder="enter country" onChange={(e)=>this.setState({country:e.target.value})}/>
                {/* search city from json data */}
                <button className="buttonStyle" onClick={()=>this.search()}>search</button>
                {/* add to fevorite list */}
                <button className="buttonStyle" onClick={()=>this.props.addToFevorite()}>add to fevorite</button>

                {
                   
                   this.props.findcity || this.state.findcity?
                   // show city result search
                   <div>
                      {
                          this.props.error?
                          <div>
                              {/* error */}
                              <p>no found city</p>
                          </div>
                          :
                          <div >
                               <br/>
                              <div className="divStyle">
                              {/* show weather location ditails */}
                              <p><b>{this.props.WeatherDitails.city}, {this.props.WeatherDitails.country}</b></p>
                              <p><b>{this.state.days[this.props.day]}</b></p>
                              <p>maximum temperature {this.props.WeatherDitails.weather[this.props.day].max_temp}c</p>
                              <p>minimum temperature{this.props.WeatherDitails.weather[this.props.day].min_temp}c</p>
                              </div>
                              <br/>
                              {/* map on all days city weather */}
                              {
                                  this.props.WeatherDitails.weather.map((item,key)=>{
                                      return (<div key={key+1} className="daysWeather">
                                         <p><b>{this.state.days[key]}</b></p>
                                         <span> {item.max_temp}c</span><br/>
                                         <span>{item.min_temp}c</span> 
                                      </div>)
                                  })
                              }
                          </div>
                      }
                   </div>
                   :null
                }
            </div>
        )       
     }
    
}
