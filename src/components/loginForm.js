import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Container, Header, Content, Form, Item, Input, Button, Spinner } from 'native-base';

export default class LoginForm extends Component {
  
    state = { 
        email: "",
        password: "",
        error: "",
        loading: false
    }

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error:"", loading: true })

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLogginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onLogginSuccess.bind(this))
                .catch(this.onLogginFail.bind(this));

            });
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
                value={this.state.email} 
                onChangeText={email => this.setState({email})}
                placeholder="Email" 
                />
                </Item>
                <Item>
                <Input
                    secureTextEntry 
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
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