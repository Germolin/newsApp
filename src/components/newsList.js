import React, { Component } from 'react';
import { ScrollView, FlatList, Text } from 'react-native';
import NewDetail from './newDetail';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../actions';

class NewsList extends Component {

    state = { news: [] };

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
                data={this.props.categories}
                renderItem={({item, index}) => <Text key={index}>{item}</Text>} 
               />
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
