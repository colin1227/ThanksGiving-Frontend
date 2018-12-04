import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

export default class People extends Component {
    constructor(){
        super()
        this.state = {
            people: [],
            error: "",
            users: []
        }
    }
   
    gatherEveryone = async() =>{
        try{
          const pepsJson = await fetch("http://localhost:8000/people");
          const parsedPeps = pepsJson.json();
          console.log(parsedPeps)
          return parsedPeps;
        }
        catch(err){
          this.setState({
              error: err
          })
        }
    }
    giveItaSec = () => {

        this.props.newURL("/people")

    }
    componentDidMount() {
        this.giveItaSec()
        this.gatherEveryone().then((data) => {
            data.data.forEach(element => {
                this.setState({
                    people: [...this.state.people, element]
                })
            
            });
            data.allUsers.forEach(element => {
                this.setState({
                    users: [...this.state.users, element]
                })
            })
        }).catch((err)=>{
            this.setState({
                error: err
            })
        } )
    }

    render(){
        const displayEveryone = this.state.people.map((person, i) =>{
            return(
            
                <li key={i}><h3><Link to={`/${person._id}`} onClick={() => this.props.specId(person._id, "people")} >{person.name}</Link></h3></li>
                
            )
        })
        const displayUsers = this.state.users.map((user, i) =>{
            return(
                <li key={i}><h3><Link to={`/${user._id}`} onClick={() => this.props.specId(user._id, "user")} >{user.name}</Link></h3></li>
            )
        })
      return(
          <div>
            <h1>People page</h1>
            <ul>
              {displayEveryone}
              {displayUsers}
            </ul>
          </div>
      )
  }
}