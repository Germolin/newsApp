import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    AppRegistry
  } from 'react-native';
import LabelSelect from 'react-native-label-select';
import { connect } from "react-redux";
import { saveCategories } from "../actions"

class ConfigComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        arr: [{
          name: 'business',
          isSelected: false,
          value: 1
        }, {
          name: 'entertainment',
          isSelected: false,
          value: 2
        }, {
          name: 'general',
          isSelected: false,
          value: 3
        }, {
          name: 'health',
          isSelected: false,
          value: 4
        }, {
          name: 'science',
          isSelected: false,
          value: 5
        }, {
          name: 'sports',
          isSelected: false,
          value: 6
        }, {
          name: 'technology',
          isSelected: false,
          value: 7
        }]
      };
      this.selectConfirm = this.selectConfirm.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
    }
    selectConfirm(list) {
      let {arr} = this.state;
      console.log(list);
      for (let item of list) {
        let index = arr.findIndex(ele => ele === item);
        if (~index) arr[index].isSelected = true;
        else continue;
      }
      this.setState({arr: arr});
      this.props.saveCategories(list)
    }
    deleteItem(item) {
      let {arr} = this.state;
      let index = arr.findIndex(a => a === item);
      arr[index].isSelected = false;
      this.setState({arr: arr});
    }
    render() {
      return (
        <View style={styles.container}>
          <LabelSelect
            title="Seleccione categorías"
            ref="select"
            cancelText="Cancelar"
            confirmText="Confirmar"
            style={styles.labelSelect}
            onConfirm={this.selectConfirm}
          >
            {this.state.arr.filter(item => item.isSelected).map((item, index) =>
              <LabelSelect.Label
                key={'label-' + index}
                data={item}
                onCancel={() => {this.deleteItem(item);}}
              >{item.name}</LabelSelect.Label>
            )}
            {this.state.arr.filter(item => !item.isSelected).map((item, index) =>
              <LabelSelect.ModalItem
                key={'modal-item-' + index}
                data={item}
              >{item.name}</LabelSelect.ModalItem>
            )}
          </LabelSelect>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: '#e3eeee'
    },
    labelSelect: {
      marginTop: 5,
      marginBottom: 20,
      padding: 5,
      borderWidth: 1,
      borderRadius: 6,
      borderStyle: 'dashed',
      borderColor: '#6dc2a2'
    },
    text: {
      fontSize: 16,
      color: 'rgb(13, 131, 144)'
    }
  });

  const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
  }
  
  export default connect(mapStateToProps, { saveCategories })(ConfigComponent)
