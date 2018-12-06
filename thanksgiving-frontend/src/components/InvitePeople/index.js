import React, { Component } from 'react';
import { Button, Form, Input, Header, Grid, Segment, Icon } from 'semantic-ui-react';
import "./invitePeople.css";
export default class InvitePeople extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
            foodBrought: [],
            error:"",
            allFood: []
        }
    }

    handleSubmit = (e) => {
      e.preventDefault()
      this.setState({
          [e.currentTarget.name]: e.currentTarget.value
      })
    }

    handleInvitation = async(e) => {
        e.preventDefault()
        try{
            await fetch("https://nameless-headland-14799.herokuapp.com/people/invite",{
                method:"POST",
                body: JSON.stringify({
                    name: this.state.name,
                    foodBrought: this.state.foodBrought,
                    userId: this.props.userId,
                    super: this.props.super
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            //const parsedResponse = await invitation.json()
            this.props.history.push('/people');
        }
        catch(err){
            this.setState({
                error: err
            })
        }
    }

    giveItaSec = () => {

        this.props.newURL("/invite")

    }

    handleSelect = async(e) => {
       try{
          if(e.currentTarget.checked === true){
            console.log(e.currentTarget.name, "line 47")
            await this.setState({
                foodBrought: [...this.state.foodBrought, e.currentTarget.name]
            })
            console.log(this.state.foodBrought, "line 50")
          }
          else{
            const index = await this.state.foodBrought.indexOf(e.currentTarget.name)
            await this.setState({
                foodBrought: this.state.foodBrought.filter((_, i)=> i !== index)
            })
            console.log(this.state.foodBrought, "line 57")
          }
        }
        catch(err){
            this.setState({
                error: err
            })
        }
    }

    getUser = async () => {
        try {
            console.log("line 23", this.props.userId)
            const response = await fetch("https://nameless-headland-14799.herokuapp.com/auth/", {
                method: "POST",
                body: JSON.stringify({ userId: this.props.userId }),
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const isLogged = await response.json();
            console.log('line 15', isLogged)
            return isLogged;
        }
        catch (err) {
            console.log("no good!!")
        }
    }
    grabFood = async() =>{
      try{
          const response = await fetch("https://nameless-headland-14799.herokuapp.com/table/");
        const dinner = await response.json();
        console.log(dinner)
        return dinner.data;
      }
      catch(err){
        this.setState({
            error: err
        })
      }
    }

    componentDidMount() {
        this.giveItaSec()
       
        this.getUser().then((data) => {
            if (data.logged === undefined) {

                this.props.history.push('/');
            }
            else {

            }
        }).catch((err) => {
            console.log(err)
            this.setState({
                error: err
            })
        })

        this.grabFood().then((data)=>{
            data.forEach(element => {
                this.setState({
                    allFood: [...this.state.allFood, element]
                })
                
            });
            console.log(this.state.allFood)
        }).catch((err)=>{
            console.log(err)
            this.setState({
                error: 'err'
            })
        })


    }

    render() {
        let foodsDisplayed = this.state.allFood.map((element, i)=>{
            return(
                <div key={i}>
                 <Grid.Row>
                  <Grid.Column>
                    <Input className="space" type="checkbox" onChange={this.handleSelect} name={element.name} value={element.name}/> {this.state.name} brought {element.name} <br/>
                  </Grid.Column>
                </Grid.Row>
                </div>
            )
        })
        return (
            <div >
                <h1>InvitePeople </h1>
                <Form onSubmit={this.handleInvitation}>
                    <Input className="space" type="text" name="name" onChange={this.handleSubmit} value={this.state.name} placeholder="what's their name?"/>
                    <Grid columns={3}>
                      
                        {foodsDisplayed}  
                      
                      
                    </Grid>
                    <Input className="space" type="submit" value="Invite" />
                </Form>
            </div>
        )
    }
}