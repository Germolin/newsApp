import React, { Component } from 'react';
import { Text, Keyboard } from 'react-native';
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

    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password })
    }

    state = {
        loading: false
    }
    onLogginSuccess() {
       this.setState({
           email: "",
           password: "",
           loading: false
       });
    }

    onLogginFail() {
        this.setState({error: "Auth failed", loading: false})
    }

    renderButton() {
        if(this.props.loading) {
            return <Spinner color="blue"/>
        }
        
        return (
            <Button
                onPress={this.onButtonPress.bind(this)}
                style={styles.formButton}>
                <Text style={styles.buttonText}>
                    Login                        
                </Text>
            </Button>
        )
    }
    
    renderError() {
        if(this.props.error){
            return (
                <Text>
                    {this.props.error}
                </Text>
            )
        }
    }

    render() {
        return (
        <Container>
            <Content contentContainerStyle={styles.container}>
                <Form style={styles.form} >
                    <Item style={styles.formInputContainer}>
                        <Input
                        autoCapitalize='none'
                        style={styles.formInput}
                        autoCorrect={false}
                        value={this.props.email} 
                        onChangeText={this.onEmailChange.bind(this)}
                        placeholder="Email"
                        
                        />
                    </Item>
                    <Item style={styles.formInputContainer}>
                        <Input
                            style={styles.formInput}
                            secureTextEntry 
                            placeholder="Password"
                            value={this.props.password}
                            onChangeText={this.onPasswordChange.bind(this)}
                            onSubmitEditing={Keyboard.dismiss}
                        />
                    </Item>
                    <Item style={styles.formButtonContainer}>
                        {this.renderButton()}
                    </Item>
                </Form>
                {this.renderError()}                     
            </Content>
        </Container>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2b313a"
    },
    form: {
        width: "85%",
        backgroundColor: "#39404c",
        justifyContent: "center",
        borderRadius: 10,
        borderColor: 'transparent',
        paddingBottom: 10
    },
    formInputContainer: {
        width: "90%",
        borderWidth: 0,
        borderColor: 'transparent'
    },
    formInput: {
        textAlign: "center",
        color: "#446699"
    },
    formButtonContainer: {
        justifyContent: "center",
        borderWidth: 0,
        borderColor: 'transparent'
    },
    formButton: {
        width: "50%",
        borderColor: 'transparent',
        borderRadius: 10,
        backgroundColor: "#ACC1E5",
        alignItems: "center"
    },
    buttonText: {
        textAlign: "center",
        fontSize: 16,
        width: "100%"
    }

}

const mapStateToprops = (state) => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
    }
}

export default connect(mapStateToprops, { emailChanged, passwordChanged, loginUser })(LoginForm)