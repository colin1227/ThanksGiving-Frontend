import React, { Component } from 'react';
//https://nameless-headland-14799.herokuapp.com/people/person
export default class person extends Component {
    constructor(){
        super()
        this.state = {
            name:"",
            foodBrought: [],
            parents: []
        }
    }
    fetchKid = async() =>{
        try{
            const request = await fetch("http://localhost:8000/people/person")
            const response = await request.json();
            return response;
        }
        catch(err){
            console.log(err)
        }
    }
    componentDidMount(){
        this.fetchKid().then((data)=>{
            this.setState({
                name: data.name
            })
            data.foodBrought.forEach(element => {
                this.setState({
                    foodBrought: [...this.state.foodBrought, element]
                })
                
            });
        })
    }
    render(){
        const displayedFood = this.state.foodBrought.map((element)=>{
            return(
                <li>{element.name}<br/>
                  <img src={element.image} alt={element.name}/></li>
                
            )
        })
        return(
            <p><b>{this.state.name}</b>brought <ul>{displayedFood}</ul></p>
        )
    }
}