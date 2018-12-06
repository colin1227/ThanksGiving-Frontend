import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Icon, Header, Button, Form, Grid } from "semantic-ui-react";
import './header.css'
import logo from './../../logo.svg';
export default class Head extends Component {
    render(){
      return(
          <nav className="bg-nav">
          <div id='theLogo'>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
            <Grid columns={7}>
              <Grid.Row>
                <Grid.Column>
                  <Link to="/">Story</Link>
                </Grid.Column> 
              
                 {this.props.logged ?
                <Grid.Column>
                  <Link to={`/${this.props.userId}`}>{this.props.name}</Link> 
                </Grid.Column>
                :
                <Link to="/nowhere"></Link>
                 }
                  {this.props.logged ? 
                      <Grid.Column>
                          <Link to="/givethanks">Give Thanks</Link>
                      </Grid.Column>
                   :
                  
                <Grid.Column>
                  <Link to={this.props.lastPage}>Give Thanks</Link>
                </Grid.Column>
               }
               {this.props.logged
               ?
                <Grid.Column>
                  <Link to="/invite">Invite People</Link>
                </Grid.Column> 
                :
                <Grid.Column>
                  <Link to={this.props.lastPage}>Invite People</Link>
                </Grid.Column>
              }
              {this.props.super ? 
                          
                <Grid.Column>
                  <Link to="/adminfood">manage food</Link>
                </Grid.Column>
              :   
                <Link to=''></Link> } 
                <Grid.Column>
                  <Link to="/people">People</Link>
                </Grid.Column>
           
                <Grid.Column>
                  <Link to="/table">Table</Link> 
                </Grid.Column>

                <Grid.Column>
                  <Link to="/thanks">Thanks</Link>
                </Grid.Column>         
              {this.props.logged ?
                <Grid.Column>
                  <Link to={this.props.lastPage} onClick={this.props.logOut}>Logout</Link> 
                </Grid.Column>
               :
                <Grid.Column>
               <Link to="/login">Login</Link>
                </Grid.Column>
              }
               </Grid.Row>
             </Grid>
          </nav>
    
      )
  }
}