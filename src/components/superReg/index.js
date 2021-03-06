import React, {Component} from 'react';
import { Button, Form, Input, Grid} from 'semantic-ui-react';

class SuperReg extends Component {
    constructor(){
        super()
        this.state = {
            usernameReg: "",
            passwordReg: "",

            secureKey: "",

            userId: '',
            logged: false,
            familyCode: "",

            firstName: "",
            lastName: "",

            canDrink: false,
            allFood: [],
            foodBrought: [],

            spouse: false,
            spouseFirst: "",
            spouseLast: "",
            kids: [],

            addingKid: false,
            kidFirst:"",
            kidLast:"",
            kidAge: "",
            canKidDrink: false

        }

    }

    grabFood = async() =>{
      try{
          const response = await fetch("http://localhost:8000/table");
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

    handleInput = (e) => {
        e.preventDefault()
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleRegister = async(e) => {
        e.preventDefault()
        try{
          //'https://nameless-headland-14799.herokuapp.com/auth/register'
          const registerJson = await fetch('http://localhost:8000/auth/register',
                  {method:"POST",
                    body: JSON.stringify({
                      username: this.state.usernameReg,
                      password: this.state.passwordReg,
                      secureKey: this.state.secureKey
                    }),
                  credentials: 'same-origin',
                  headers: {'Content-Type': 'application/json'}
                  })
                const parsedUser = await registerJson.json()
                  if (parsedUser.logged === true) {
                    await this.props.newUserId(parsedUser.userId, parsedUser.username, true)
                    this.props.history.push(this.props.lastPage)
                  }
                  else{
                    this.setState({
                        usernameReg: "",
                        passwordReg: "",
                        secureKey: ""
                    })
                    console.log("wrong page")
            this.props.history.push(this.props.lastPage)
            }
        }
        catch(err){

        }
    }

    newKidForm = () =>{
      this.setState({
          addingKid: true
      })
  }

  cancel = () =>{
      this.setState({
          addingKid: false,
          kidFirst:"",
          kidLast:"",
          kidAge: "",
          canKidDrink: false
      })
  }
  submitKid = () =>{
      this.setState({
          kids:[...this.state.kids,
              {firstName: this.state.kidLast,
              lastName: this.state.kidFirst,
              age: this.state.kidAge,
              canDrink: this.state.canKidDrink}],
              addingKid: false,
              kidFirst:"",
              kidLast:"",
              kidAge: "",
              canKidDrink: false
          })
  }

  componentWillMount(){
    this.grabFood().then((data)=>{
        data.forEach(element => {
            this.setState({
                allFood: [...this.state.allFood, element]
            })
            
        });
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
                <Input className="space" type="checkbox" onChange={this.handleFoodSelect} name={element.name} value={element.name}/> {this.state.firstName} brought {element.name} <br/>
              </Grid.Column>
            </Grid.Row>
            </div>
        )
    })
      return(
        <div>
          <Form onSubmit={this.handleRegister}>
            <Input type='text' name='usernameReg' value={this.state.usernameReg} onChange={this.handleInput} placeholder='Register username' />
            <Input type='password' name='passwordReg' value={this.state.passwordReg} onChange={this.handleInput} placeholder='Register password' />
            <Input type='text' name='firstName' value={this.state.firstName} onChange={this.handleInput} placeholder='Register First name' />
            <Input type='text' name='lastName' value={this.state.lastName} onChange={this.handleInput} placeholder='Register Last name' />
            <Input type='checkbox' name='canDrink' onChange={this.handleTrueFalse} placeholder='Are you 21?' />
            {foodsDisplayed}
            <Input type='text' name='familyCode' value={this.state.familyCode} onChange={this.handleInput} placeholder='Family code' />
            <Input type='checkbox' name='spouse' value={this.state.spouse} onChange={this.handleTrueFalse} placeholder='Do you have a spouse?' />
            <Input type='text' name='spouseFirst' value={this.state.spouseFirst} onChange={this.handleInput} placeholder="Your spouse's First Name" />
            <Input type='text' name='spouseLast' value={this.state.spouseLast} onChange={this.handleInput} placeholder="And their last name" />
            <Input type='password' name='secureKey' value={this.state.secureKey} onChange={this.handleInput} placeholder='Admin Password' />

            {this.state.addingKid ? 
            <div>
                <Input type='text' name='kidFirst' value={this.state.kidFirst} onChange={this.handleInput} placeholder='Register First name' />
                <Input type='text' name='kidLast' value={this.state.kidLast} onChange={this.handleInput} placeholder='Register Last name' />
                <Input type='checkbox' name='canKidDrink' value={this.state.canKidDrink} onChange={this.handleTrueFalse} placeholder='Are you 21?' />
                <Input type='text' name='kidAge' value={this.state.kidAge} onChange={this.handleInput} placeholder='Age' />
                <Button onClick={this.submitKid}>add {this.state.kidFirst}</Button> <Button onClick={this.cancel}>Cancel</Button>
            </div>
            :
            <Button onClick={this.newKidForm}>add kid</Button>}
            <Button type='Submit'> Register!</Button>
          </Form>  
        </div>
      )
    }
}
export default SuperReg;

