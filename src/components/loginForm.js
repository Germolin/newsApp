import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Container, Header, Content, Form, Item, Input, Button, Spinner } from 'native-base';
import { connect } from "react-redux";
import { emailChanged, passwordChanged, loginUser } from "../actions";



 class LoginForm extends Component {
  
    onEmailChange(text) {
        this.props.emailChanged(text);
    }
    
    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    state = { 
        email: "",
        password: "",
        error: "",
        loading: false
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password })
    }

    onLogginSuccess() {
       this.setState({
           email: "",
           password: "",
           loading: false,
           error: ""
       });
    }

    onLogginFail() {
        this.setState({error: "Auth failed", loading: false})
    }

    renderButton() {
        if(this.state.loading) {
            return <Spinner color="blue"/>
        }
        
        return (
            <Button onPress={this.onButtonPress.bind(this)} primary>
                <Text>
                    Login                        
                </Text>
            </Button>
        )
    }
    
    render() {
        return (
        <Container>
            <Content>
            <Form>
                <Item>
                <Input
                autoCorrect={false}
                value={this.props.email} 
                onChangeText={this.onEmailChange.bind(this)}
                placeholder="Email" 
                />
                </Item>
                <Item>
                <Input
                    secureTextEntry 
                    placeholder="Password"
                    value={this.props.password}
                    onChangeText={this.onPasswordChange.bind(this)}
                />
                </Item>
                <Item last>
                    {this.renderButton()}
                </Item>
            </Form>
            <Text>
                {this.state.error}                     
            </Text>
            </Content>
        </Container>
        );
    }
}

const mapStateToprops = (state) => {
    return {
        email: state.auth.email,
        password: state.auth.password
    }
}

export default connect(mapStateToprops, { emailChanged, passwordChanged, loginUser })(LoginForm)