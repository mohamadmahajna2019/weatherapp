import React, { Component } from 'react'

export default class Fevorite extends Component {  
    render() {
        return (
            <div>
               {
                  //    map on fevorite list
                   this.props.fevoriteList.map((item,i)=>{
                       return (<div className="divStyle" style={{marginBottom:"2%"}}>
                           <p><b>{item.city}</b></p>
                           <p>{item.weather[this.props.day].max_temp}c</p>
                           <p>{item.weather[this.props.day].min_temp}c</p>
                           {/* on click remuve from fevorite list */}
                           <div onClick={()=>this.props.remuveFevorite(item)}><b>remuve from fevorite</b></div>
                       </div>)
                   })
               }
            </div>
        )
    }
}
