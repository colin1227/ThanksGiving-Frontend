import React, {Component} from 'react';
import { Link } from 'react-router-dom';
 
export default class Header extends Component {
    render(){
      return(
          <nav>
           <Link to="/">Story</Link> 
              {this.props.logged ? <div>
                  <Link to="/givethanks">Give Thanks</Link>
                  <Link to="/invite">Invite People</Link>
                  <Link to={`/${this.props.userId}`}>{this.props.name}</Link> 
                  </div>
                   :
                  <div>
                  <Link to={this.props.lastPage}>Give Thanks</Link>
                  <Link to={this.props.lastPage}>Invite People</Link>
                  </div>
              }
              {this.props.super ? <Link to="/adminfood">manage food</Link>: <Link to=''></Link> } 
           <Link to="/people">People</Link>
           <Link to="/table">Table</Link> 
           <Link to="/thanks">Thanks</Link>         
              {this.props.logged ?
               <Link to={this.props.lastPage} onClick={this.props.logOut}>Logout</Link> :
               <Link to="/login">Login</Link>}
          </nav>
    
      )
  }
}