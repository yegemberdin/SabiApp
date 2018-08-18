
'use strict';

import React, { Component } from 'react';
import ReactNative from 'react-native';
const StatusBar = require('../StatusBar');
const ActionButton = require('../ActionButton');
const ListItem = require('../ListItem');
const styles = require('../../styles.js')
import {firebaseApp} from '../firebase'
import * as firebase from 'firebase';

const {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertAndroid,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert
} = ReactNative;

// Initialize Firebase


export default class EventsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('users');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    const user = firebase.auth().currentUser;
    const itemRef=itemsRef.child(user.uid);
    itemRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().takenPhotoUrl,
          date: child.val().takenPhotoDate,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }
  showPhotoDate(){

  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }
  addPhoto(){

    
   this.props.navigation.navigate("add");
 
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Weekly photos gallery" />
        <ScrollView>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          contentContainerStyle={styles.listview} />

        <ActionButton  onPress={()=>{
            this.addPhoto();

        }} title="Add" />
        </ScrollView>

      </View>
    )
  }

 

  _renderItem(item) {
    const user = firebase.auth().currentUser;

    const onPress = () => {
    Alert.alert(
    'Photo taken date',
     item.date,
    [
     { text: 'Remove photo', onPress: (text) => this.itemsRef.child(user.uid).child(item._key).remove() },
    { text: 'Ok', onPress: (text) => console.log(item.date) }
     ]
    );
    };

    return (
      <TouchableOpacity 
        onPress={()=>{
            onPress();

        }}> 
      <Image style={{width:80, height:100, marginTop:10, marginHorizontal:10, }} source={{ uri: item.title }} />
      <View style={{flexDirection:'row'}}>
      
      <Text style={{fontFamily:'Roboto',fontStyle:'italic',fontSize: 10, color:'#E5A7A7', fontWeight:'100'}}> {item.date} </Text>
     
     </View>
      </TouchableOpacity>
    )
  }

}