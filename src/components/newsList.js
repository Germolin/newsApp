import React, { Component } from 'react';
import { ScrollView, FlatList, Text } from 'react-native';
import NewDetail from './newDetail';
import { Container, Content, Fab, Icon, Button } from 'native-base';
import { connect } from 'react-redux';
import { loadNews } from '../actions';
import { Actions } from 'react-native-router-flux';

class NewsList extends Component {

    state = { news: []};

    componentDidMount() {
        this.props.dispatch(loadNews())
    }

    render() {
      return (
         <Container>
            <Content>
              <FlatList
                data={this.props.news}
                renderItem={({item, index}) => <NewDetail key={index} details={item} />} 
               />
               <Fab
                active={true}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#9ea5af' }}
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
    news: state.news.news
  }
};

export default connect(mapStateToProps)(NewsList);
