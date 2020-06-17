import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
//import SuccessPage from './SuccessPage';

var apiBaseUrl = "http://localhost:8080/api/";
import axios from 'axios';
import SuccessPage from './SuccessPage';

class Login extends Component {
    constructor(props) {
        super(props);
        let localloginComponent = [];

        localloginComponent.push(
            <MuiThemeProvider key={"theme"}>
                <div>
                    <TextField
                        hintText="Enter your PatronId"
                        floatingLabelText="PatronId"
                        onChange={(event, newValue) => this.setState({ username: newValue })}
                    />
                    <br />
                    <TextField
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange={(event, newValue) => this.setState({ password: newValue })}
                    />
                    <br />
                    <RaisedButton label="" primary={true} style={style}
                        onClick={(event) => this.handleClick(event)} />
                </div>
            </MuiThemeProvider>
        )
        this.state = {
            username: '',
            password: '',
            menuValue: 1,
            loginComponent: localloginComponent,
            loginRole: 'patron',
            isVerified: false
        }
    }

    componentWillMount() {
        // console.log("willmount prop values",this.props);
        if (this.props.appContext.state.role !== undefined) {
            if (this.props.appContext.state.role === 'patron') {
               // console.log("in patron componentWillMount");
                let localloginComponent = [];
                localloginComponent.push(
                    <MuiThemeProvider>
                        <div>
                            <TextField
                                hintText="Enter your PatronId"
                                floatingLabelText="PatronId"
                                onChange={(event, newValue) => this.setState({ username: newValue })}
                            />
                            <br />
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({ password: newValue })}
                            />
                            <br />
                            <RaisedButton label="login" primary={true} style={style}
                                onClick={(event) => this.handleClick(event).bind(this)} />
                        </div>
                    </MuiThemeProvider>
                )
                this.setState({ menuValue: 1, loginComponent: localloginComponent, loginRole: 'patron' })
            } else if (this.props.appContext.state.role === 'ngo') {
                console.log("in ngo componentWillMount");
                var localloginComponent = [];
                localloginComponent.push(
                    <MuiThemeProvider>
                        <div>
                            <TextField
                                hintText="Enter your NGO Id"
                                floatingLabelText="NGO Id"
                                onChange={(event, newValue) => this.setState({ username: newValue })}
                            />
                            <br />
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({ password: newValue })}
                            />
                            <br />
                            <RaisedButton label="login" primary={true} style={style}
                                onClick={(event) => this.handleClick(event)} />
                        </div>
                    </MuiThemeProvider>
                )
                this.setState({ menuValue: 2, loginComponent: localloginComponent, loginRole: 'ngo' })
            }
        }
    }
    validatePatron = (patronId) => {
        var self=this
        axios.get('http://localhost:8080/api/patrons/' + patronId)
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    console.log("Login successfull");
                    self.props.appContext.setState({ loginPage: [] })
                } else if (response.data.code == 204) {
                    console.log("Username password do not match");
                    alert(response.data.success)
                } else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    validateNgo = (ngoId) => {
         var self=this
        axios.get('http://localhost:8080/api/ngo/' + ngoId)
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    console.log("Login successfull");
                    self.props.appContext.setState({ loginPage: [] })
                    //let success = [];
                    //success.push(<SuccessPage />);
                    //self.props.appContext.setState({successPage:success})
                } else if (response.data.code == 204) {
                    console.log("Username password do not match");
                    alert(response.data.success)
                } else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleClick(event) {
        console.log('self props', this.props.appContext)
        var self = this;

       // if (self.props.appContext.state.isVerified) {


            if (this.state.loginRole === "patron") {
                this.validatePatron(this.state.username)
            }
            else {
                this.validateNgo(this.state.username)
            }

       /*  }else {
            alert('Please verify that you are a human!');
        }*/
    }

    handleMenuChange(value) {
        console.log("menuvalue", value);
        var loginRole;
        var self = this;
        if (value == 1) {
            var localloginComponent = [];
            loginRole = 'patron';
            self.props.appContext.setState({ role: "patron" })
            localloginComponent.push(
                <MuiThemeProvider>
                    <div>
                        <TextField
                            hintText="Enter your PatronId"
                            floatingLabelText="Patron Id"
                            onChange={(event, newValue) => this.setState({ username: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton label="login" primary={true} style={style}
                            onClick={(event) => this.handleClick(event)} />
                    </div>
                </MuiThemeProvider>
            )
        } else if (value == 2) {
            var localloginComponent = [];
            loginRole = 'ngo';

            this.props.appContext.setState({ role: "ngo" })
            localloginComponent.push(
                <MuiThemeProvider>
                    <div>
                        <TextField
                            hintText="Enter your NGOId"
                            floatingLabelText="NGO Id"
                            onChange={(event, newValue) => this.setState({ username: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton label="login" primary={true} style={style}
                            onClick={(event) => this.handleClick(event)} />
                    </div>
                </MuiThemeProvider>
            )
        }
        this.setState({
            menuValue: value,
            loginComponent: localloginComponent,
            loginRole: loginRole
        })
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title="Login"
                    />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <div>
                        <p>Login as:</p>
                        <DropDownMenu value={this.state.menuValue}
                            onChange={(event, index, value) => this.handleMenuChange(value)}>
                            <MenuItem value={1} primaryText="Patron" />
                            <MenuItem value={2} primaryText="NGO" />
                        </DropDownMenu>
                    </div>
                </MuiThemeProvider>
                {this.state.loginComponent}
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default Login;
