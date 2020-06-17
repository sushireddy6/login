import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import Login from './Login';
import PatronRegister from './PatronRegister';
import NGORegister from './NGORegister';
import { GoogleLogin } from 'react-google-login';
import Recaptcha from 'react-recaptcha';

const style = {
    margin: 15,
};
const CLIENT_ID = '775684393066-67blu30nk3updqa3erog6908b10p7v3n.apps.googleusercontent.com';

class Loginscreen extends Component {
    constructor(props) {
        super(props);
        let loginButtons = [];
        loginButtons.push(
            <div key={"Login-Div"}>
                <MuiThemeProvider>
                    <div>
                        <RaisedButton label={"Register"} primary={true} style={style}
                            onClick={(event) => this.handleClick(event)} />
                    </div>
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <div>
                        <GoogleLogin
                            clientId={CLIENT_ID}
                            buttonText='Sign in with Google'
                            onSuccess={this.login}
                            onFailure={this.handleLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            responseType='code,token'
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        )

        this.state = {
            username: '',
            password: '',
            loginscreen: [],
            loginmessage: '',
            loginButtons: loginButtons,
            isLogin: true,
            isGoogleLoggedIn: false,
            googleAccessToken: ''
        }
    }

    componentWillMount() {
        var loginscreen = [];
        loginscreen.push(<Login parentContext={this} appContext={this.props.appContext} key={"LoginScreen"} />);
        var loginmessage = "Not registered yet, Register Now";
        this.setState({
            loginscreen: loginscreen,
            loginmessage: loginmessage
        })
    }

    login(response) {
        if (response.Zi.access_token) {
            this.setState(state => ({
                isGoogleLoggedIn: true,
                googleAccessToken: response.Zi.access_token
            }));
        }
    }


    handleLoginFailure(response) {
        alert('Failed to log in')
    }

    handleClick(event) {
        let userRole = this.props.appContext.state.role;
        var loginmessage;
        if (this.state.isLogin) {
            let loginscreen = [];
            if (userRole === "patron") {
                loginscreen.push(<PatronRegister parentContext={this} appContext={this.props.appContext}
                    role={userRole} />);
            } else {
                loginscreen.push(<NGORegister parentContext={this} appContext={this.props.appContext}
                    role={userRole} />);
            }

            loginmessage = "Already registered.Go to Login";
            let loginButtons = [];
            loginButtons.push(
                <div key="login-button">
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton label={"Login"} primary={true} style={style}
                                onClick={(event) => this.handleClick(event, userRole)} />
                        </div>
                    </MuiThemeProvider>

                    <MuiThemeProvider>
                        <div>
                            <GoogleLogin
                                clientId={CLIENT_ID}
                                buttonText='Sign in with Google'
                                onSuccess={this.login}
                                onFailure={this.handleLoginFailure}
                                cookiePolicy={'single_host_origin'}
                                responseType='code,token'
                            />
                        </div>
                    </MuiThemeProvider>


                </div>
            )
            this.setState({
                loginscreen: loginscreen,
                loginmessage: loginmessage,
                loginButtons: loginButtons,
                isLogin: false
            })
        } else {
            let loginscreen = [], loginButtons = [];
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
            loginscreen.push(<Login parentContext={this} appContext={this.props.appContext} role={userRole} />);
            loginmessage = "Not Registered yet.Go to registration";
            this.setState({
                loginscreen: loginscreen,
                loginmessage: loginmessage,
                loginButtons: loginButtons,
                isLogin: true
            })
        }
    }

    onLoadRecaptcha() {
        console.log("Captcha loaded");
    }

    verifyCallback(response) {
        console.log('self props', this.props.appContext)
        this.props.appContext.setState({ isVerified: true })
        console.log('self props1', this.props.appContext)
    }

    render() {
        return (
            <div className="loginscreen" key="loginscreen">
                {this.state.loginscreen}
                <div>
                    {this.state.loginmessage}
                    {this.state.loginButtons}
                    <div className="text-center g-recaptcha">
                    <Recaptcha 
                        sitekey="6LePTaUZAAAAAFjyZHJH_Bt0NiHAH4H9tOZSeq2n"
                        render="explicit"
                        onloadCallback={this.onLoadRecaptcha}
                        verifyCallback={this.verifyCallback}
                    />
                    </div>
                </div>

            </div>
        );
    }
}

export default Loginscreen;
