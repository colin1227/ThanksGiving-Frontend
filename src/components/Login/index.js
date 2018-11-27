import React, {Component} from 'react';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            usernameReg: "",
            passwordReg: "",
            usernameLog: "",
            passwordLog: ""

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
            const registerJson = await fetch('http://localhost:8000/auth/register',
                {method:"POST",

                body: JSON.stringify({
                    username: this.state.usernameReg,
                    password: this.state.passwordReg}),
                credentials: 'same-origin',
                headers: {'Content-Type': 'application/json'}
                })
                console.log('a 31')
                console.log(parsedUser)
            const parsedUser = await registerJson.json()
                if (parsedUser.logged === true) {
                this.props.logged = true;
                }
                else{
                    this.setState({
                        usernameReg: "",
                        passwordReg: ""
                    })
                }
        }
        catch(err){

        }
    }

    handleLogin = async(e) => {
        e.preventDefault();
        try {
            const LoginJson = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                body: JSON.stringify({
                        username: this.state.usernameLog,
                        password: this.state.passwordLog}),
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const parsedUser = await LoginJson.json()
            if(parsedUser.logged === true){
                this.props.logged = true;
            }
            else {
                this.setState({
                    usernameLog: "",
                    passwordLog: ""
                })
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
            <button fluid color='orange' size='large' type='Submit'> Register</button>
          </form> 
          <form onSubmit={this.handleLogin}>
            <input type='text' name='usernameLog' value={this.state.usernameLog} onChange={this.handleInput} placeholder='Login username' />
            <input type='password' name='passwordLog' value={this.state.passwordLog} onChange={this.handleInput} placeholder='Login password' />
            <button fluid color='orange' size='large' type='Submit'> Login </button>
          </form> 
        </div>
      )
    }
}
export default Login