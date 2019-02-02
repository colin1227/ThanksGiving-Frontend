import React, {Component} from 'react';
//https://nameless-headland-14799.herokuapp.com/auth/
export default class User extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
            likedFood: [],
            foodBrought: [],
            thanks: [],
            kids: [],
            parents: [],
            siblings: [],
            hasSpouse: false,
            spouse: {}


        }
    }
    findUser = async() => {
        try{
            const request = await fetch("http://localhost:8000/auth/",{
                method:"POST",
                body: JSON.stringify({
                    userId: this.props.specificId
                }),
                headers: {"Content-Type": "application/json"}
            });
            const response = await request.json();
            console.log(response)
            return response;
        }
        catch(err){
            console.log(err)
        }
    }
    componentDidMount(){
        this.findUser().then((data)=>{
            this.setState({
                name: data.username,
            })
            data.likedFood.forEach(element => {
                this.setState({
                    likedFood: [...this.state.likedFood, element]
                })
            });
            data.thanks.forEach(element => {
                this.setState({
                    thanks: [...this.state.thanks, element]
                })
            })
        }).catch((err) =>{
            console.log(err)
        })

    }
    render(){
        const likedFood = this.state.likedFood.map((element, i)=>{
            return(
                <li key={i}>{element.name}</li>    
            )
        })

        const thanks = this.state.thanks.map((element, i) => {
            return (
                <div key={i}>
                    <li><b>{element.title}<br /></b>{element.body}</li>
                    
                </div>
                )
            })
    
            return(
             <div>
                <h1>{this.state.name}</h1> 
                  <br/>
                <h3>Liked Food:</h3>
                  <ol>
                    {likedFood}
                  </ol>
                  <br/>
                <h3>Thanks given:</h3>
                  <ul>
                    {thanks}
                  </ul>
             </div>
        )
    }

}