import React, {Component} from 'react';
import { Button, Form, Input, Grid} from 'semantic-ui-react';
import './style.css'
class Register extends Component {
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

            momFirst: "" ,
            momLast: "",
            dadFirst: "",
            dadLast: "",

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
    handleInput = (e) => {
        e.preventDefault()
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleTrueFalse = (e) => {
        if(e.currentTarget.checked){
            this.setState({
                [e.currentTarget.name]: true
            })
        }
        else{
            this.setState({
                [e.currentTarget.name]: false
            })
        }
    }

    handleFoodSelect = async(e) => {
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

    handleRegister = async(e) => {
        e.preventDefault()
        try{
            const registerJson = await fetch('http://localhost:8000/auth/register',
                {method:"POST",
                body: JSON.stringify({
                    username: this.state.usernameReg,
                    password: this.state.passwordReg,

                    firstName: this.state.firstName,
                    lastName: this.state.lastName,

                    canDrink: this.state.canDrink,

                    foodBrought: this.state.foodBrought,
                     familyCode: this.state.familyCode,

                    parents:[{first:this.state.momFirst,
                              last: this.state.momLast},

                             {first: this.state.dadFirst,
                              last: this.state.dadLast}],

                    spouse: this.state.spouse,
                    spouseFirst: this.state.spouseFirst,
                    spouseLast: this.state.spouseLast,

                    kids: this.state.kids,
                    secureKey: ""
                }),
                credentials: 'same-origin',
                headers: {'Content-Type': 'application/json'}
                })
            const parsedUser = await registerJson.json()
            console.log(parsedUser, "register parsed user")
            if (parsedUser.logged === true) {
                await this.props.newUserId(parsedUser.userId, parsedUser.user.firstNameame, true)
                  this.props.history.push(this.props.lastPage)
                }
            else{
                    this.setState({
                        usernameReg: "",
                        passwordReg: ""
                    })
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
        <div className="four">
          <Grid columns={2}>
          <Form onSubmit={this.handleRegister}>
          <Grid.Row>
            <Grid.Column>
              <Input type='text' name='usernameReg' value={this.state.usernameReg} onChange={this.handleInput} placeholder='Register username' />
              <Input type='password' name='passwordReg' value={this.state.passwordReg} onChange={this.handleInput} placeholder='Register password' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
             <Input type='text' name='firstName' value={this.state.firstName} onChange={this.handleInput} placeholder='First name' />
            <Input type='text' name='lastName' value={this.state.lastName} onChange={this.handleInput} placeholder='Last name' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
            <Input type='text' name='momFirst' value={this.state.momFirst} onChange={this.handleInput} placeholder="Your Mom's First name" />
            <Input type='text' name='momLast' value={this.state.momLast} onChange={this.handleInput} placeholder="Your Mom's Last name" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
            <Input type='text' name='dadFirst' value={this.state.dadFirst} onChange={this.handleInput} placeholder="Your Dad's First name" />
            <Input type='text' name='dadLast' value={this.state.dadLast} onChange={this.handleInput} placeholder="Your Dad's Last name" />
            </Grid.Column>
          </Grid.Row>  
          <Grid.Row>
            <Grid.Column>
                <b>Are you 21?</b>
              <Input type='checkbox' name='canDrink' onChange={this.handleTrueFalse} />
              </Grid.Column>
            </Grid.Row>
            {foodsDisplayed}
          <Grid.Row>
            <Grid.Column>
            <Input type='text' name='familyCode' value={this.state.familyCode} onChange={this.handleInput} placeholder='Family code' />
            <Input type='checkbox' name='spouse' value={this.state.spouse} onChange={this.handleTrueFalse} placeholder='Do you have a spouse?' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
            <Input type='text' name='spouseFirst' value={this.state.spouseFirst} onChange={this.handleInput} placeholder="Your spouse's First Name" />
            <Input type='text' name='spouseLast' value={this.state.spouseLast} onChange={this.handleInput} placeholder="And their last name" />
            </Grid.Column>
          </Grid.Row>
            
            {this.state.addingKid ? 
            <div>
              
              <Grid.Row>
                <Grid.Column>
                <Input type='text' name='kidFirst' value={this.state.kidFirst} onChange={this.handleInput} placeholder='Register First name' />
                <Input type='text' name='kidLast' value={this.state.kidLast} onChange={this.handleInput} placeholder='Register Last name' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                <Input type='checkbox' name='canKidDrink' value={this.state.canKidDrink} onChange={this.handleTrueFalse} placeholder='Are you 21?' />
                <Input type='text' name='kidAge' value={this.state.kidAge} onChange={this.handleInput} placeholder='Age' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                <Button onClick={this.submitKid}>add {this.state.kidFirst}</Button> <Button onClick={this.cancel}>Cancel</Button>
                </Grid.Column>
              </Grid.Row>
            </div>
            :
          <Grid.Row>
            <Grid.Column>
            <Button onClick={this.newKidForm}>add kid</Button>
            </Grid.Column>
          </Grid.Row>}
            
          <Grid.Row>
            <Grid.Column>
            <Button type='Submit'> Register!</Button>
            </Grid.Column>
          </Grid.Row>
          </Form>  
          </Grid>
        </div>

      )
    }
}
export default Register;