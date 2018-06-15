import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import NewDetail from './newDetail';
import { Container, Content } from 'native-base';


class NewsList extends Component {

    state = { news: [] };

    componentWillMount() {
        fetch('https://newsapi.org/v2/top-headlines?country=co&apiKey=f168520dd2014a82ac4cd695a9016e1f')
             .then(response => response.json())
             .then(data => this.setState({ news: data.articles }));
        
    }

    renderNews() {
        return this.state.news.map(ar => <NewDetail key={ar.url} details={ar} />);
    }

    render() {
      return (
         <Container>
            <Content>
              <ScrollView contentContainerStyle={{flexGrow: 1,justifyContent: 'center'}}>
                {this.renderNews()}
              </ScrollView>
            </Content>
        </Container> 
      );
    }
}

export default NewsList;
