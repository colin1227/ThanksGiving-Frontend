import React, {Component} from 'react';
import { Button, Form, Input, Header, Grid, Segment, Icon } from 'semantic-ui-react';
class Login extends Component {
    constructor(){
        super()
        this.state = {
            usernameReg: "",
            passwordReg: "",
            usernameLog: "",
            passwordLog: "",
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
                    secureKey: ""
                }),
                credentials: 'same-origin',
                headers: {'Content-Type': 'application/json'}
                })
                console.log('a 31')
            const parsedUser = await registerJson.json()
            console.log(parsedUser, "register parsed user")
            if (parsedUser.logged === true) {
                await this.props.newUserId(parsedUser.userId, parsedUser.username, true)
                  console.log('42')
                  this.props.history.push(this.props.lastPage)
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
            const LoginJson = await fetch("https://nameless-headland-14799.herokuapp.com/auth/login", {
                method: "POST",
                body: JSON.stringify({
                        username: this.state.usernameLog,
                        password: this.state.passwordLog}),
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const parsedUser = await LoginJson.json();
            if(parsedUser.logged === true){
                if(parsedUser.super === true){
                  await this.props.newUserId(parsedUser.userId, parsedUser.username, true)
                  console.log(parsedUser.username, "logged in 1")
                  this.props.history.push(this.props.lastPage); 
                }
                else{
                await this.props.newUserId(parsedUser.userId, parsedUser.username, false)
                console.log(parsedUser.username, "logged in 2")
                this.props.history.push(this.props.lastPage); 
                }     
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
          <Form onSubmit={this.handleRegister}>
            <Input type='text' name='usernameReg' value={this.state.usernameReg} onChange={this.handleInput} placeholder='Register username' />
            <Input type='password' name='passwordReg' value={this.state.passwordReg} onChange={this.handleInput} placeholder='Register password' />
            <Button type='Submit'> Register</Button>
          </Form> 
          <Form onSubmit={this.handleLogin}>
            <Input type='text' name='usernameLog' value={this.state.usernameLog} onChange={this.handleInput} placeholder='Login username' />
            <Input type='password' name='passwordLog' value={this.state.passwordLog} onChange={this.handleInput} placeholder='Login password' />
            <Button type='Submit'> Login </Button>
          </Form> 
        </div>
      )
    }
}
export default Login;