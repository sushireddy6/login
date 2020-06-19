import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import NGORegister from './NGORegister';
//import DatePicker from "react-datepicker";
import {GenderInput} from 'react-gender-input';
import data from "./data.json";


class PatronRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patronName: '',
      firstName: '',
      middleName: '',
      lastName: '',
      dob: "",
      gender: "",
      emailId: "",
      phone: "",
      password: "",
      confirmPassword: "",
      verifiedEmail: "",
      verifiedPhone: "",
      verifiedCaptcha: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
  }

  handleClick(event, role) {
    console.log('self props', this.props.appContext)
    //if (this.props.appContext.state.isVerified) {

    var apiBaseUrl = { apiBaseUrl };
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    //if (this.state.password != this.state.confirmPassword) {
    //alert("password does not match");


    if (this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.emailId.length > 0 && this.state.password.length > 0) {
      if (this.state.password === this.state.confirmPassword) {
        var payload = {
          "firstName": this.state.firstName,
          "middleName": this.state.middleName,
          "lastName": this.state.lastName,
          "emailId": this.state.emailId,
          "password": this.state.password,
          "confirmPassword": this.state.confirmPassword,
          "dob": this.state.dob,
          "gender": this.state.gender,
          "phone": this.state.phone,
          "verifiedEmail": "Waiting - Confirmation",
          "verifiedPhone": "Yes - OTP",
          "verifiedCaptcha": "Yes"
        }
        axios.post('./property/{api.patrons}', payload)
          .then(function (response) {
            console.log(response);
            if (response.status === 200) {
              console.log("registration successfull");
              alert("Registration successfull!! use " + response.data.data._id + " for login purposes");
              var loginscreen = [];
              var loginButtons = [];
              var userRole = "patron";
              loginscreen.push(<Login parentContext={this} appContext={self.props.appContext}
                role={role} />);
              var loginmessage = "Not Registered yet.Go to registration";
              loginButtons.push(
                <div>
                  <MuiThemeProvider>
                    <div>
                      <RaisedButton label={"Register"} primary={true} style={style}
                        onClick={(event) => this.handleClick(event, userRole)} />
                    </div>
                  </MuiThemeProvider>
                </div>
              )
              self.props.parentContext.setState({
                loginscreen: loginscreen,
                loginButtons: loginButtons,
                loginmessage: loginmessage,
                buttonLabel: "Register",
                isLogin: true
              });
            } else {
              console.log("some error ocurred", response.status);
            }
          })
          .catch(function (error) {
            //console.log(error);
          });
      }
    } else {
      alert("Input field value is missing");
    }

    /* } else {
       alert('Please verify that you are a human!');
     }*/
    // }
  }

  render() {
    // console.log("props",this.props);
    var userhintText, userLabel;
    if (this.props.role === "patron") {
      userhintText = "Enter your EmailId";
      userLabel = "EmailId";
    } else {
      userhintText = "Enter your EmailId";
      userLabel = "Id";
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
              required
              floatingLabelText="First Name"
              onChange={(event, newValue) => this.setState({ firstName: newValue })}
            />
            <br />
            <TextField
              hintText="Enter your Middle Name"
              floatingLabelText="Middle Name"
              onChange={(event, newValue) => this.setState({ middleName: newValue })}
            />
            <br />
            <TextField
              hintText="Enter your Last Name"
              required
              floatingLabelText="Last Name"
              onChange={(event, newValue) => this.setState({ lastName: newValue })}
            />
            <br />
            <TextField        
              floatingLabelText="Date of Birth"
              type="date" className={"datecolor"}
              onChange={(event, newValue) => this.setState({ dob: newValue })}
            />
            {/* <DatePicker
              selected={this.state.date}
              onChange={this.handleChange}
            /> */}
            <br />
            {/* <TextField
              hintText="Gender"
              floatingLabelText="Gender"
              onChange={(event, newValue) => this.setState({ gender: newValue })}
            /> */}
             <GenderInput
            name="my-gender-field-name"
            onUpdate={(value) => this.setState({ gender:value})}
            value = {this.state.gender}
            /> 
            <br />
            <TextField
              hintText="Enter your Phone Number"
              floatingLabelText="Phone Number"
              onChange={(event, newValue) => this.setState({ phone: newValue })}
            />
            <br />
            <TextField
              hintText={userhintText}
              floatingLabelText={userLabel}
              onChange={(event, newValue) => this.setState({ emailId: newValue })}
            />
            <br />
            <TextField
              type="password"
              required
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <TextField
              type="password"
              required
              hintText="Enter your Password"
              floatingLabelText="Confirm Password"
              onChange={(event, newValue) => this.setState({ confirmPassword: newValue })}
            />
            <br />
            <RaisedButton label="Register" primary={true} style={style}
              onClick={(event) => this.handleClick(event, this.props.role)} />

          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default PatronRegister;
