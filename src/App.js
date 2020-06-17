import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Loginscreen';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPage: [],
            role: "patron",
            isVerified:false,
            successPage:[]
        }
    }

    componentWillMount() {
        let loginPage1 = [];
        loginPage1.push(<LoginScreen appContext={this} key={"login-screen"} />);
        this.setState({
            loginPage: loginPage1
        })
    }

    render() {
        return (
            <div className="App">
                {this.state.loginPage}
                {this.state.successPage}

            </div>
        );
    }
}

export default App;
