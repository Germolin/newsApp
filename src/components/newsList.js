import React, { Component } from 'react';
import { ScrollView, FlatList, Text } from 'react-native';
import NewDetail from './newDetail';
import { Container, Content, Fab, Icon, Button } from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Actions } from 'react-native-router-flux';

class NewsList extends Component {

    state = { news: []};

    componentWillMount() {
        fetch('https://newsapi.org/v2/top-headlines?country=co&apiKey=f168520dd2014a82ac4cd695a9016e1f')
             .then(response => response.json())
             .then(data => this.setState({ news: data.articles }));
        
    }

    render() {
      return (
         <Container>
            <Content>
              <FlatList
                data={this.state.news}
                renderItem={({item, index}) => <NewDetail key={index} details={item} />} 
               />
               <Fab
                active={true}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="topRight"
                onPress={() => Actions.config()}
              >
                <Icon name="cog" />
              </Fab>
            </Content>
        </Container> 
      );
    }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
};

export default connect(mapStateToProps, actions)(NewsList);
