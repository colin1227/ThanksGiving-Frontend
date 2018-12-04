import React, { Component } from 'react';

export default class Table extends Component {
    constructor(){
        super()
        this.state = {
            allFood: [],
            logged: false
        }
    }
    giveItaSec = () => {
        this.props.newURL("/table")
    }

    componentDidMount() {
        this.giveItaSec()
        this.grabFood().then((data)=>{
            data.forEach(element => {
                this.setState({
                    allFood: [...this.state.allFood, element]
                })
                
            });
        })
 
    }

    likeFood = async(obj) =>{
        try{
            const request = await fetch('http://localhost:8000/auth/liked',{
                method:"PUT",
                body: JSON.stringify({
                    food: obj,
                    userId: this.props.userId
                }),
                headers: { 'Content-Type': 'application/json' }
         
            })
            const response = await request.json();
            console.log(response.data)
            
        }
        catch(err){
            console.log(err)
        }
    }
    
    grabFood = async() =>{
      try{
        const response = await fetch("http://localhost:8000/table/");
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
    //how many of that food brought
    render(){
        const displayfoods = this.state.allFood.map((element)=>{
            return(
                <div key={element._id}>
                  <b>{element.name}</b>
                  <img src={element.image} alt={element.name}/>
                  <button onClick={()=> this.likeFood(element)}>like me</button>
                </div>
            )
        })
        return(
            <div>
              <h1>Table</h1>
              {displayfoods}
            </div>
        )
    }
}