import React, { Component } from 'react';
import "./history.css"
export default class History extends Component {
    // constructor(props){
    //     super(props)
    //     this.props.newURL = this.props.newURL("/").bind(this)
    // }
    giveItaSec = () =>{
        return this.props.newURL("/")
    }
    componentDidMount(){
        this.giveItaSec()
    }
    four = (anHour) => {
        return anHour * 40 * 4 * 12
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


 
