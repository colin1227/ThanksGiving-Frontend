import React , { Component } from 'react';
import { List } from 'semantic-ui-react'
export default class Bulletin extends Component {
    constructor(){
        super()
        this.state = {
            allThanks: [],
            currentThanks: [],
            thanks: 0,
            pages: 1,
            page: 0,
            test: false
            
        }
    }
    giveItaSec = () =>{

         this.props.newURL("/thanks")

    }
    getThanks = async() => {
        try {
            const allThanks = await fetch("https://nameless-headland-14799.herokuapp.com/thanks/");
          const parsed = await allThanks.json();
          console.log(parsed)
          return parsed;
        }

        catch(err){
            console.log(err)
        }
    }
    countCurrentThanksIndex = async() => {
        try{
           this.setState({
              pages: this.state.allThanks.length - 1
          })
          for(let i = 0; i < 5; i++){
              this.setState({
                  currentThanks: [...this.state.currentThanks, this.state.allThanks[(this.state.page * 5) + i]]
              })
          }
          this.setState({
              test: true
          })
        }
        catch(err){
            
        }
    }
    componentDidMount (){
        this.giveItaSec()
        this.getThanks().then((data) => {
            this.setState({
                thanks: 0
            })
            data.data.forEach(element => {
                this.setState({
                    allThanks: [...this.state.allThanks, element],
                    thanks: this.state.thanks + 1
                })
                
                
            });
            console.log("line 55")
        }).catch((err)=>{
            console.log("err")
            console.log(err)
        });
        console.log("line 60")
        this.countCurrentThanksIndex();
        console.log("line 62")
        
    }
    
    render(){
        const displayedThanks = this.state.allThanks.map((element, i)=>{
          return(
            <List unordered key={i}>
              <List.Item><b>{element.title}</b></List.Item>
              <List.Item> {element.body}</List.Item>
            </List>
          )
        })

        return(
            <div>
              <h1>Thanks page</h1>

              {displayedThanks}
              
            </div>
        )
    }
}