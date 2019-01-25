import React, {Component} from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
class Login extends Component {
    constructor(){
        super()
        this.state = {
            usernameLog: "",
            passwordLog: "",
            userId: "",
            logged: false

        }

    }
    handleInput = (e) => {
        e.preventDefault()
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }
    goToRegisterPage = () => {
        this.props.history.push("/register")
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
            <Form onSubmit={this.handleLogin}>
                <Input type='text' name='usernameLog' value={this.state.usernameLog} onChange={this.handleInput} placeholder='Login username' />
                <Input type='password' name='passwordLog' value={this.state.passwordLog} onChange={this.handleInput} placeholder='Login password' />
                <Button type='Submit'> Login </Button>
            </Form>
            <a onClick={this.goToRegisterPage} href=" ">dont have an account</a> 
        </div>
      )
    }
}
export default Login;