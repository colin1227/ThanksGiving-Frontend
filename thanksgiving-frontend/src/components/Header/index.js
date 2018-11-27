import React, {Component} from 'react';

 
export default class Header extends Comopnent {
  constructor(){
      super()
      this.state = {

      }
  }
  render(){
      return(
          <nav>
           <a href="/">Story</a> 
           <a href="/table">Table</a> 
           <a href="/invite">Invite People</a>
          </nav>
    
      )
  }
}