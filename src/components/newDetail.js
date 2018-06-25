import React from 'react';
import { View, Image, StyleSheet, WebView, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, H3 } from 'native-base';

class NewDetail extends React.PureComponent {
    render() {
      return (        
           <Card style={styles.card}>
             <CardItem>
               <Body>
                 <Image source={{uri: this.props.details.urlToImage}} style={styles.image}/>
               </Body>
             </CardItem>
             <CardItem>
               <Left>
                 <H3>{this.props.details.title}</H3>
               </Left>
             </CardItem>
           </Card>   
      )
    }
};

const styles = StyleSheet .create({
    container: {
        marginVertical: 15
    },
    card: {
      width: "100%",
      padding: 0
    },
    image: {
        height: 200, 
        width: '100%',
        flex: 1
    },
    headline: {
        textAlign: 'center',
        fontSize: 23
    },
    imageContainer: {
      padding: 0
    }
})
export default NewDetail;
