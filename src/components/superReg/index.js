import React, {Component} from 'react';

class SuperReg extends Component {
    constructor(){
        super()
        this.state = {
            usernameReg: "",
            passwordReg: "",
            secureKey: "",
            userId: '',
            logged: false

        }

    }
    handleInput = (e) => {
        e.preventDefault()
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleRegister = async(e) => {
        e.preventDefault()
        try{
          const registerJson = await fetch('https://nameless-headland-14799.herokuapp.com/auth/register',
                  {method:"POST",
                    body: JSON.stringify({
                      username: this.state.usernameReg,
                      password: this.state.passwordReg,
                      secureKey: this.state.secureKey
                    }),
                  credentials: 'same-origin',
                  headers: {'Content-Type': 'application/json'}
                  })
                const parsedUser = await registerJson.json()
                  if (parsedUser.logged === true) {
                    await this.props.newUserId(parsedUser.userId, parsedUser.username, true)
                    this.props.history.push(this.props.lastPage)
                  }
                  else{
                    this.setState({
                        usernameReg: "",
                        passwordReg: "",
                        secureKey: ""
                    })
                    console.log("wrong page")
            this.props.history.push(this.props.lastPage)
            }
        }
        catch(err){

        }
    }
    render() {
      return(
        <div>
          <form onSubmit={this.handleRegister}>
            <input type='text' name='usernameReg' value={this.state.usernameReg} onChange={this.handleInput} placeholder='Register username' />
            <input type='password' name='passwordReg' value={this.state.passwordReg} onChange={this.handleInput} placeholder='Register password' />
            <input type='password' name='secureKey' value={this.state.secureKey} onChange={this.handleInput} placeholder='Admin Password' />
            <button type='Submit'> Register</button>
          </form> 
        </div>
      )
    }
}
export default SuperReg;