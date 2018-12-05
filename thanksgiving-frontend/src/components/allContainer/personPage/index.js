import React, { Component } from 'react';

export default class person extends Component {
    constructor(){
        super()
        this.state = {
            name:"",
            foodBrought: []
        }
    }
    fetchPerson = async() =>{
        try{
            const request = await fetch("")
            const response = await request.json();
            return response;
        }
        catch(err){
            console.log(err)
        }
    }
    componentDidMount(){
        this.fetchPerson().then((data)=>{
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