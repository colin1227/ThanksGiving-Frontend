import React, { Component } from 'react';

export default class History extends Component {
    giveItaSec = () =>{
        this.props.newURL("/")
    }
    componentDidMount(){
        this.giveItaSec()
    }
      render(){
        return(
            <div>
                <h1>History Page</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis eligendi error ad? Quod fugit eius temporibus totam deserunt minima aliquid cupiditate id sunt neque! Rerum atque modi facere magnam sint?</p>
            </div>
        )
      }
}

 
