import React, { Component } from 'react';
import "./history.css"
export default class History extends Component {
    giveItaSec = () =>{
        this.props.newURL("/")
    }
    componentDidMount(){
        this.giveItaSec()
    }
      render(){
        return(
            <div className="backG">
                <h1>History Page</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis eligendi error ad? Quod fugit eius temporibus totam deserunt minima aliquid cupiditate id sunt neque! Rerum atque modi facere magnam sint?</p>
            </div>
        )
      }
}

 
