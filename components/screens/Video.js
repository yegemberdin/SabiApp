
import React, { Component } from "react";
import Carousel from "react-native-carousel-slider";
import {firebaseApp} from '../firebase'
import * as firebase from 'firebase';
import {Image, Text, View,TouchableOpacity} from 'react-native';
import { Audio } from "expo";

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
     images:[],
     isLoading: true
    };
    this.itemsRef = this.getRef().child('users');
    this.audioPlayer = new Audio.Sound();
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
        items.push(child.val().takenPhotoUrl);
        
      });
      

      

      this.setState({
        images: items,
        isLoading: false,
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);

    this._handlePlaySoundAsync();
    //console.log(this.state.images)
  }
  beforeChange(from, to) {
    console.log("beforeChange--->", from, to);
  }

  afterChange(current) {
    console.log("afterChange--->", current);
  }

  onPress(event, index) {
    console.log(event, index);
  }
  _handlePlaySoundAsync = async () => {
    
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    
    await Audio.setIsEnabledAsync(true);
    await this.audioPlayer.loadAsync({
      uri: 'http://d.kztune.com/dl/06/moldir-auelbekova_-_balapanym_(kztune.com).mp3'},
      { shouldPlay: true },
      {downloadfirst: false}
      );
   // await sound.playAsync();
  };
  stopAudio = async () => {
    await this.audioPlayer.unloadAsync()
    await this.audioPlayer.stopAsync();
    this.audioPlayer = null;
  }
 

  render() {

    console.log(this.state.isLoading)

    if (this.state.isLoading) {
      return <Text> Loading. .. </Text>
    }
    
    return (
      
      <View style={{backgroundColor:'#fdedec',flex:1,height:'100%'}}>
      <View style={{marginLeft:20, marginRight:20, marginTop:70}}>
        <Image style={{width:'100%', height:100, marginBottom:30}} source={require('../../assets/video.png')}/>
       
        
        <Carousel 
        
          dataSource={this.state.images}
          autoPlay={true}
          autoplaySpeed={1000}
          initialSlide={0}
          dots={true}
          beforeChange={(from, to) => this.beforeChange(from, to)}
          afterChange={current => this.afterChange(current)}
          dotsClass={{ backgroundColor: "blue" }}
          dotActiveStyle={{ backgroundColor: "red" }}
          onPress={(event, index) => this.onPress(event, index)}
        />
        
        
        
       
      </View>
      <View style={{flexDirection:'row', }}>
      <TouchableOpacity onPress={this._handlePlaySoundAsync}>
      <Image   
       style={{marginTop:25,  width: 50, height:70,marginLeft:180,}}    
          source={require('../../assets/music.png')}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.stopAudio}>
      <Image   
      style={{marginTop:25, width: 50, height:70, marginLeft:20, marginRight:30}}  
          source={require('../../assets/stop.png')}
          />
          </TouchableOpacity>
          </View>
      </View>
      
    );
  }
}

