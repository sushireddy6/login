import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class FounderDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      founderFirstName:'',
      founderMiddleName:'',
      founderLastName:'',
      dob: '',
      gender: '',
      emailId: '',
      phone: "",
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
    if(this.state.NGOName.length>0 && this.state.address1.length>0 && this.state.emailId.length>0 && this.state.password.length>0){
      var payload={
      "founderFirstName":this.state.founderFirstName,
      "founderMiddleName":this.state.founderMiddleName,
      "founderLastName":this.state.founderLastName,
      "emailId":this.state.emailId,
      "dob": this.state.dob,
      "phone": this.state.phone,
      "gender": this.state.gender,
      "verifiedEmail": "Waiting - Confirmation",
      "verifiedPhone": "Yes - OTP",
      "verifiedCaptcha": "Yes"
      }
      axios.post(apiBaseUrl+'/ngoregister', payload)
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
    if(this.props.role === "ngo"){
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
             title=" NGO Registeration"
           />
           <TextField
             hintText="founderFirstName"
             floatingLabelText="founderFirstName"
             onChange = {(event,newValue) => this.setState({founderFirstName:newValue})}
             />
           <br/>
           <TextField
             hintText="founderMidddleName"
             floatingLabelText="founderMiddleName"
             onChange = {(event,newValue) => this.setState({founderMiddleName:newValue})}
             />
           <br/>
           <TextField
             hintText="founderLastName"
             floatingLabelText="founderLastName"
             onChange = {(event,newValue) => this.setState({founderLastName:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Date of Birth"
             floatingLabelText="Date of Birth"
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
             hintText={userhintText}
             floatingLabelText={userLabel}
             onChange = {(event,newValue) => this.setState({emailId:newValue})}
             />
           <br/>
           <TextField
             type = "number"
             hintText="Enter your Phone Number"
             floatingLabelText="Phone Number"
             onChange = {(event,newValue) => this.setState({phone:newValue})}
             />
           <br/>
           
        
           <RaisedButton label="Next" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default FounderDetails;
