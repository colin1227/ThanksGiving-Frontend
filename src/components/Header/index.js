import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './header.css'
import logo from './../../logo.svg';
export default class Head extends Component {
    render(){
      return(
          <nav className="bg-nav">
          
          <div id='theLogo'>
          <h2>Thanksgivings</h2>
            <img src={logo} className="App-logo" alt="logo" />
          </div>

            <div className="over">
                <div className="sub">
                  <Link to="/">Story</Link>
                </div> 
                
                 {this.props.logged ?
                <div className="sub">
                  <Link to={`/${this.props.specificId}`}>{this.props.name}</Link> 
                </div>
                :
                <Link to="/nowhere"></Link>
                 }
                  {this.props.logged ? 
                      <div className="sub">
                          <Link to="/givethanks">Give Thanks</Link>
                      </div>
                   :
                  
                <div className="sub">
                  <Link to={this.props.lastPage}>Give Thanks</Link>
                </div>
               }
               {this.props.logged
               ?
                <div className="sub">
                  <Link to="/invite">Invite People</Link>
                </div> 
                :
                <div className="sub">
                  <Link to={this.props.lastPage}>Invite People</Link>
                </div>
              }
              {this.props.super ? 
                          
                <div className="sub">
                  <Link to="/adminfood">manage food</Link>
                </div>
              :   
                <Link to=''></Link> } 
                <div className="sub">
                  <Link to="/people">People</Link>
                </div>
           
                <div className="sub">
                  <Link to="/table">Table</Link> 
                </div>

                <div className="sub">
                  <Link to="/thanks">Thanks</Link>
                </div>         
              {this.props.logged ?
                <div className="sub">
                  <Link to={this.props.lastPage} onClick={this.props.logOut}>Logout</Link> 
                </div>
               :
                <div className="sub">
               <Link to="/login">Login</Link>
                </div>
              }
              </div>
          </nav>
      )
  }
}