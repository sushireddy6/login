import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import NGORegister from './ngoregister';


class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      patronName:'',
      firstName:'',
      middleName:'',
      lastName:'',
      dob: "",
      gender: "",
      organisation: "",
      emailId: "",
      phone: "",
      password: "",
      verifiedEmail: "Waiting - Confirmation",
      verifiedPhone: "Yes - OTP",
      verifiedCaptcha: "Yes"
    }
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }
  handleClick(event,role){
    var apiBaseUrl = "http://localhost:8080/api/";
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if(this.state.firstName.length>0 && this.state.lastName.length>0 && this.state.emailId.length>0 && this.state.password.length>0){
      var payload={
      "firstName": this.state.firstName,
      "middleName": this.state.middleName,
      "lastName":this.state.lastName,
      "userid":this.state.emailId,
      "password":this.state.password,
      "dob": this.state.dob,
      "gender": this.state.gender,
      "organisation": this.state.organisation,
      "phone": this.state.phone,
      "verifiedEmail": "Waiting - Confirmation",
      "verifiedPhone": "Yes - OTP",
      "verifiedCaptcha": "Yes"
      }
      axios.post(apiBaseUrl+'/register', payload)
     .then(function (response) {
       console.log(response);
       if(response.data.code === 200){
        //  console.log("registration successfull");
         var loginscreen=[];
         loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
         var loginmessage = "Not Registered yet.Go to registration";
         self.props.parentContext.setState({loginscreen:loginscreen,
         loginmessage:loginmessage,
         buttonLabel:"Register",
         isLogin:true
          });
       }
       else{
         console.log("some error ocurred",response.data.code);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
    }

  }
  render() {
    // console.log("props",this.props);
    var userhintText,userLabel;
    if(this.props.role === "patron"){
      userhintText="Enter your EmailId";
      userLabel="EmailId";
    }
    else{
      userhintText="Enter your EmailId";
      userLabel="Id";
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title=" Patron Registeration"
           />
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({firstName:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Middle Name"
             floatingLabelText="Middle Name"
             onChange = {(event,newValue) => this.setState({lastName:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({lastName:newValue})}
             />
             <br/>
              <TextField
             hintText="Enter your DOB"
             floatingLabelText="DOB"
             onChange = {(event,newValue) => this.setState({dob:newValue})}
             />
           <br/>
           <TextField
             hintText="Gender"
             floatingLabelText="Gender"
             onChange = {(event,newValue) => this.setState({gender:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Organisation"
             floatingLabelText="Organisation Name"
             onChange = {(event,newValue) => this.setState({organisation:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Phone Number"
             floatingLabelText="Phone Number"
             onChange = {(event,newValue) => this.setState({phone:newValue})}
             />
           <br/>
           <TextField
             hintText={userhintText}
             floatingLabelText={userLabel}
             onChange = {(event,newValue) => this.setState({emailId:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;
