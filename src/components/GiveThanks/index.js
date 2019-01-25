import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';
import "./give.css"
export default class GiveThanks extends Component {
    constructor(){
        super()
        this.state = {
            title: "",
            body: ""
        }
    }
    giveItaSec = () => {

        this.props.newURL("/givethanks")

    }
    getUser = async () => {
        try {
            const response = await fetch("https://nameless-headland-14799.herokuapp.com/auth/", {
                method: "POST",
                body: JSON.stringify({ userId: this.props.userId }),
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const isLogged = await response.json();
            return isLogged;
        }
        catch (err) {
            console.log("no good!!")
        }
    }
    componentDidMount() {
        this.giveItaSec()
        this.getUser().then((data) => {
            if (data.logged === undefined) {
                console.log("yep")
                this.props.history.push('/login');
            }
            else {
            }
        }).catch((err) => {
            console.log(err)
            this.setState({
                error: err
            })
        })
    }
    handleSubmit =(e) =>{
        e.preventDefault()
        this.setState({
          [e.currentTarget.name] : e.currentTarget.value
      })
    }
    handleThankfulness = async(e) =>{
        e.preventDefault()
        console.log("is this happening")
        try{
        
            const sendIt = await fetch("https://nameless-headland-14799.herokuapp.com/thanks/thankful/",{
            method:"POST",
            body: JSON.stringify({thanks:{
                title: this.state.title,
                body: this.state.body},
                author: this.props.name,
                userId: this.props.userId
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        
        const parsedData = await sendIt.json();
        if(parsedData.accepted === true){
            console.log("got here?")
            this.props.history.push("/thanks")
        }
        else{
          console.log("Nope!")
        }
      }
      catch(err){

      }
    }
    render() {
        return (
            <div className="backG">
                <h1>Give thanks </h1>
                <Form onSubmit={this.handleThankfulness}>
                    <Input type="text" className="left title" name="title" onChange={this.handleSubmit} value={this.state.title} placeholder="title"/><br/>
                    <Input type="body" className="body" name="body" onChange={this.handleSubmit} value={this.state.body} placeholder="body" /><br/>
                    <Input type="submit" className="right" value="Submit your thankfulness" />
                </Form>
            </div>
            

        )
    }
}