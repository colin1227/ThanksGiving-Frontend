import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Bulletin from "./Thanks";
import Table from "./Table";
import People from "./People";
import History from "./History";
import Login from './Login';
import GiveThanks from "./GiveThanks";
import InvitePeople from "./InvitePeople";
import Header from "./Header";
import SuperReg from "./superReg";
import AdminFood from "./food";
import User from "./userPage";
import Person from "./personPage";
import './container.css'

export default class Container extends Component {
    constructor(){
        super()
        this.state = {
            userId: "",
            name: "",
            logged: false,
            lastPage: "/",
            super: false,
            specificUsername: "",
            specificPerson: "",
            specificId: "",
            error: ""
            
        }
    }
    logOut = async() => {
        try { 
            await this.setState({
                userId: '',
                logged: false,
                super: false
            })
            if(this.state.lastPage === "/givethanks"){
                this.props.history.push("/thanks")
            }
            else if (this.state.lastPage === "/invite"){
                this.props.history.push("/people")
            }
            //conditionals for /invite and /givethanks
            // and make it work in general
            else{
                this.props.history.push(this.state.lastPage)
            }
        }
        catch(err){

        }
    }
    newUserId = async(id, username,superr) =>{
        try{
          await this.setState({
            userId: id,
            logged: true,
            name: username,
            super: superr
          })

        }
        catch(err){
          console.log("error", err)
        }

        }
    specId = async(id) => {
        try{   
            await this.setState({
                specificId: id
            })
        }
        catch(err){
            console.log(err)
            this.setState({
                error: err
            })
        }
    }
    newURL = async(value) =>{
        try{
              await this.setState({
                lastPage: value
              })
        }
        catch(err){
            console.log("adfasdf")
        }
    }
    render(){
        return(
            <div className='bg'>
                {/* {this.state.super ? <p>super</p> : <p>not super</p>}
                {this.state.userId}
                {this.state.lastPage} */}
            <Header logged={this.state.logged} lastPage={this.state.lastPage} super={this.state.super} logOut={this.logOut} userId={this.state.userId} name={this.state.name}/>
          <Switch>
                <Route exact path="/"
                    render={(routeProps) => {
                        return (
                            <History {...routeProps} {...this.props} newURL={this.newURL} userId={this.state.userId} logged={this.state.logged} lastPage={this.state.lastPage} />
                        )
                    }} /> 
                <Route exact path="/thanks"
                    render={(routeProps) => {
                        return (
                            <Bulletin {...routeProps} {...this.props} newURL={this.newURL} userId={this.state.userId} logged={this.state.logged} lastPage={this.state.lastPage} />
                        )
                    }} /> 
                <Route exact path="/givethanks"
                    render={(routeProps) => {
                        return (
                            <GiveThanks {...routeProps} {...this.props} newURL={this.newURL} userId={this.state.userId} logged={this.state.logged} lastPage={this.state.lastPage} />
                        )
                    }} />

                <Route exact path="/table"
                    render={(routeProps) => {
                        return (
                            <Table {...routeProps} {...this.props} newURL={this.newURL} userId={this.state.userId} logged={this.state.logged} lastPage={this.state.lastPage} />
                        )
                    }} />

                <Route exact path="/adminfood"
                    render={(routeProps) => {
                        return (
                            <AdminFood {...routeProps} {...this.props} newURL={this.newURL} userId={this.state.userId} super={this.state.super} logged={this.state.logged} lastPage={this.state.lastPage} />
                        )
                    }} />

                <Route exact path="/people"
                    render={(routeProps) => {
                        return (
                            <People {...routeProps} {...this.props} newURL={this.newURL} userId={this.state.userId} logged={this.state.logged} lastPage={this.state.lastPage} specId={this.specId}/>
                        )
                    }} />    
                <Route exact path="/invite"
                    render={(routeProps) => {
                        return (
                            <InvitePeople {...routeProps} {...this.props} newURL={this.newURL} userId={this.state.userId} logged={this.state.logged} lastPage={this.state.lastPage} />
                        )
                    }} /> 

                    <Route exact path={`/${this.state.userId}`}
                        render={(routeProps) => {
                            return (
                                <User {...routeProps} {...this.props} newURL={this.newURL} userId={this.state.userId} logged={this.state.logged} lastPage={this.state.lastPage} specificId={this.state.specificId}/>
                            )
                        }} /> 
                    <Route exact path={`/user/${this.state.specificId}`}
                        render={(routeProps) => {
                            return (
                                <User {...routeProps} {...this.props} newURL={this.newURL} userId={this.state.userId} logged={this.state.logged} lastPage={this.state.lastPage} specificId={this.state.specificId}/>
                            )
                        }} /> 

                    <Route exact path={`/people/${this.state.specificId}`}
                        render={(routeProps) => {
                            return (
                                <Person {...routeProps} {...this.props} newURL={this.newURL} userId={this.state.userId} logged={this.state.logged} lastPage={this.state.lastPage} specificId={this.state.specificId}/>
                            )
                        }} />

                <Route exact path="/login" render={(routeProps)=>(
                        <Login {...routeProps} {...this.props} newUserId={this.newUserId} lastPage={this.state.lastPage}/>
                )} />
                <Route exact path="/adminregister" render={(routeProps)=>(
                        <SuperReg {...routeProps} {...this.props} newUserId={this.newUserId} lastPage={this.state.lastPage}/>
                )} />
              
          </Switch>
            </div>
        )
    }
}