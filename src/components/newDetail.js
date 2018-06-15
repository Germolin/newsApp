import React from 'react';
import { View, Image, StyleSheet  } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

const NewDetail = ({ details }) => {
    return (        
           <Card style={{flex: 0}}>
             <CardItem>
               <Left>
                 <Thumbnail source={{uri: details.urlToImage}} />
                 <Body>
                   <Text>{details.title}</Text>
                   <Text note>{details.publishedAt}</Text>
                 </Body>
               </Left>
             </CardItem>
             <CardItem>
               <Body>
                 <Image source={{uri: details.urlToImage}} style={{height: 200, width: 200, flex: 1}}/>
                 <Text>
                   {details.description}
                 </Text>
               </Body>
             </CardItem>
             <CardItem>
               <Left>
                 <Button transparent textStyle={{color: '#87838B'}}>
                   <Icon name="globe" />
                   <Text>{details.source.name}}</Text>
                 </Button>
               </Left>
             </CardItem>
           </Card>   
      );
};

const styles = StyleSheet .create({
    container: {
        marginVertical: 15

    },
    image: {
        height: 200, 
        flex: 1
    },
    headline: {
        textAlign: 'center',
        fontSize: 23
    }
})
export default NewDetail;

