import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import FounderDetails from './FounderDetails';



class NGORegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NGOName: '',
            address1: '',
            address2: '',
            country: '',
            state: '',
            city: '',
            dateofincorporation: '',
            NGOGovtId: '',
            taxRebateToDonor: '',
            taxRebateGovtId: '',
            emailId: '',
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
        var apiBaseUrl = "http://localhost:8080/api/";
        //console.log("values in register handler",role);
        var self = this;
        //To be done:check for empty values before hitting submit
        if (this.state.NGOName.length > 0 && this.state.address1.length > 0 && this.state.emailId.length > 0 && this.state.password.length > 0) {
            var payload = {
                "NGOName": this.state.NGOName,
                "address1": this.state.address1,
                "address2": this.state.address2,
                "city": this.state.city,
                "state": this.state.state,
                "country": this.state.country,
                "dateofincorporation": this.state.dateofincorporation,
                "NGOGovtId": this.state.NGOGovtId,
                "taxRebateToDonor": this.state.taxRebateToDonor,
                "taxRebateGovtId": this.state.taxRebateGovtId,
                "emailId": this.state.emailId,
                "password": this.state.password,
                "confirmPassword": this.state.confirmPassword,
                "phone": this.state.phone,
                "verifiedEmail": "Waiting - Confirmation",
                "verifiedPhone": "Yes - OTP",
                "verifiedCaptcha": "Yes"
            }

            axios.post('http://localhost:8080/api/ngo', payload)
                .then(function (response) {

                    console.log("verification", response);
                    if (response.status === 200) {
                        console.log("registration successfull");
                        alert("Registration successful!! Please use " + response.data.data._id + " for login purposes");
                        var loginscreen = [];
                        var loginButtons = [];
                        var userRole = "ngo";
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
                    console.log(error);
                });

        } else {
            alert("Input field value is missing");
        }
        /* }
         else {
             alert('Please verify that you are a human!');
         }*/
    }

    render() {
        // console.log("props",this.props);
        var userhintText, userLabel;
        if (this.props.role === "ngo") {
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
                            title=" NGO Registeration"
                        />
                        <TextField
                            hintText="Enter your NGO Name"
                            required
                            floatingLabelText="NGO Name"
                            onChange={(event, newValue) => this.setState({ NGOName: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter your address1"
                            required
                            floatingLabelText="address1"
                            onChange={(event, newValue) => this.setState({ address1: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter your address2"
                            floatingLabelText="address2"
                            onChange={(event, newValue) => this.setState({ address2: newValue })}
                        />
                        <br />

                        <TextField
                            hintText="country"
                            floatingLabelText="country"
                            onChange={(event, newValue) => this.setState({ country: newValue })}
                        />
                        <br />

                        <TextField
                            hintText="state"
                            floatingLabelText="state"
                            onChange={(event, newValue) => this.setState({ state: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter your city"
                            floatingLabelText="city"
                            onChange={(event, newValue) => this.setState({ city: newValue })}
                        />
                        <br />

                        <TextField
                            hintText="dateofincorporation"
                            type="date"
                            floatingLabelText="dateofincorporation"
                            onChange={(event, newValue) => this.setState({ dateofincorporation: newValue })}
                        />
                        <br />

                        <TextField
                            hintText="taxRebateToDonor"
                            floatingLabelText="taxRebateToDonor"
                            onChange={(event, newValue) => this.setState({ taxRebateToDonor: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="taxRebateGovtId"
                            floatingLabelText="taxRebateGovtId"
                            onChange={(event, newValue) => this.setState({ taxRebateGovtId: newValue })}
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

export default NGORegister;
