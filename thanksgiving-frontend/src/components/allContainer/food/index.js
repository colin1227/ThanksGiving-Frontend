import React, {Component} from "react";
import { Button, Form, Input, Header, Grid, Segment, Icon } from 'semantic-ui-react';

export default class Food extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
            image: "",
            editName: "",
            editImage: "",
            originalName: "",
            option:"",
            error:"",
            allFood: []
        }
    }
    componentDidMount() {
        this.grabFood().then((data)=>{
            data.forEach(element => {
                this.setState({
                    allFood: [...this.state.allFood, element]
                })
            });
        })
    }
    changeOptions = async(elem) => {
        try{
         console.log(elem)
          await this.setState({
            edit: true
          })
          await this.setState({
            originalName: elem.name,
            editName: elem.name,
            editImage: elem.image
          })  
          console.log(this.state.originalName)
          
              console.log("editName", this.state.editName)
        }
        catch(err){
            console.log(err)
            this.setState({
                error: "error changing option"
            })
        }
    }
    handleInput = (e) => { 
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    grabFood = async () => {
        try {
            const response = await fetch("http://localhost:8000/table/");
            const dinner = await response.json();
            console.log(dinner)
            return dinner.data;
        }
        catch (err) {
            this.setState({
                error: err
            })
        }
    }

    createFood = async(e) => {
        e.preventDefault()
        try{
             await fetch('http://localhost:8000/table/insert',{
                method: "POST",
                credentials: "include",
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify({
                    name: this.state.name,
                    image: this.state.image,
                    super: this.props.super
                })
            });
            //const response = await foodJson.json();
            this.props.history.push("/table")
        }
        catch(err){
            console.log("should see an error page but i guess youre seeing this")
        }
    }
    editFood = async(e) => {
        e.preventDefault()
        try{
             await fetch('http://localhost:8000/table/edit',{
                method: "PUT",
                credentials: "include",
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify({
                    originalName: this.state.originalName,
                    editName: this.state.editName,
                    editImage: this.state.editImage,
                    super: this.props.super
                })
            });
            //const response = await foodJson.json();
            this.props.history.push("/table")
        }
        catch(err){
            this.setState({
                error: err
            })
        }
    }
    deleteFood = async(name, e) => {
        e.preventDefault()
        try{
            const foodJson = await fetch('http://localhost:8000/table/remove',{
                method: "DELETE",
                credentials: "include",
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify({
                    originalName: name,
                    super: this.props.super
                })
            });
            const response = await foodJson.json();
            console.log(response)
            this.props.history.push("/table")
        }
        catch(err){
            console.log(err)
            this.setState({
                error: err
            })
        }
    }
    render(){
        const editOrDelete = this.state.allFood.map((element)=>{
            return(
                <div key={element._id}>
                    <b>{element.name}</b>
                    <Button onClick={ this.changeOptions.bind(null, element)}>edit exisiting food</Button>
                    <Button onClick={this.deleteFood.bind(null, element.name)}>delete food </Button>
                </div>
            )
        })
        return(
            <div>
                <h1>CRUD foods here</h1>
                {editOrDelete}
                {this.state.edit ? 
                    <Form onSubmit={this.editFood}>
                        <Input type='text' name="editName" value={this.state.editName} onChange={this.handleInput} placeholder="name of food" />
                        <Input type='text' name="editImage" value={this.state.editImage} onChange={this.handleInput} placeholder="url of image" />
                        <Input type='submit' value="Edit food"/> 
                    </Form>
                    :
                    <Form onSubmit={this.createFood}>
                        <Input type='text' name="name" value={this.state.name} onChange={this.handleInput} placeholder="name of food" />
                        <Input type='text' name="image" value={this.state.image} onChange={this.handleInput} placeholder="url of image" />
                        <Input type='submit' value="Create food" />
                    </Form>
            }

            </div>
        )
    }
}