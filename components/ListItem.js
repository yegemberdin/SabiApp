import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  render() {
    return (
      //<TouchableHighlight onPress={this.props.onPress}>
        <View >
          <Text style={styles.liText}>{this.props.item.date}</Text>
        </View>
      //</TouchableHighlight>
    );
  }
}

module.exports = ListItem;
