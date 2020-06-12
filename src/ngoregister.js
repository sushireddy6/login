import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class NGORegister extends Component {
  constructor(props){
    super(props);
    this.state={
      NGOName:'',
      address1:'',
      address2:'',
      city:'',
      state:'',
      country:'',
      founderFirstName:'',
      founderMiddleName:'',
      founderLastName:'',
      dob: '',
      gender: '',
      doincorporation:'',
      NGOGovtId:'',
      taxRebateToDonor:'',
      taxRebateGovtId:'',
      organisation: '',
      emailId: '',
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
    if(this.state.NGOName.length>0 && this.state.address1.length>0 && this.state.emailId.length>0 && this.state.password.length>0){
      var payload={
      "NGOName": this.state.NGOName,
      "address1": this.state.address1,
      "address2":this.state.address2,
      "city":this.state.city,
      "state":this.state.state,
      "country":this.state.country,
      "founderFirstName":this.state.founderFirstName,
      "founderMiddleName":this.state.founderMiddleName,
      "founderLastName":this.state.founderLastName,
      "doincorporation":this.state.doincorporation,
      "NGOGovtId":this.state.NGOGovtId,
      "taxRebateToDonor":this.state.taxRebateToDonor,
      "taxRebateGovtId":this.state.taxRebateGovtId,
      "emailId":this.state.emailId,
      "password":this.state.password,
      "dob": this.state.dob,
      "organisation": this.state.organisation,
      "phone": this.state.phone,
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
             hintText="Enter your NGO Name"
             floatingLabelText="NGO Name"
             onChange = {(event,newValue) => this.setState({NGOName:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your address1"
             floatingLabelText="address1"
             onChange = {(event,newValue) => this.setState({address1:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your address2"
             floatingLabelText="address2"
             onChange = {(event,newValue) => this.setState({address2:newValue})}
             />
             <br/>
              <TextField
             hintText="Enter your city"
             floatingLabelText="city"
             onChange = {(event,newValue) => this.setState({city:newValue})}
             />
           <br/>
           <TextField
             hintText="state"
             floatingLabelText="state"
             onChange = {(event,newValue) => this.setState({state:newValue})}
             />
           <br/>
           <TextField
             hintText="country"
             floatingLabelText="country"
             onChange = {(event,newValue) => this.setState({country:newValue})}
             />
           <br/>
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
             hintText="doincorporation"
             floatingLabelText="doincorporation"
             onChange = {(event,newValue) => this.setState({doincorporation:newValue})}
             />
           <br/>
           <TextField
             hintText="NGOGovtId"
             floatingLabelText="NGOGovtId"
             onChange = {(event,newValue) => this.setState({NGOGovtId:newValue})}
             />
           <br/>
           <TextField
             hintText="taxRebateToDonor"
             floatingLabelText="taxRebateToDonor"
             onChange = {(event,newValue) => this.setState({taxRebateToDonor:newValue})}
             />
           <br/>
           <TextField
             hintText="taxRebateGovtId"
             floatingLabelText="taxRebateGovtId"
             onChange = {(event,newValue) => this.setState({taxRebateGovtId:newValue})}
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

export default NGORegister;
