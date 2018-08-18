
import React from 'react';
import {
  ActivityIndicator,
  
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import { Button } from "react-native-paper";

import DatePicker from 'react-native-datepicker';
import { db } from '../firebase';
import { firebaseApp } from '../firebase';
import * as firebase from 'firebase';

console.disableYellowBox = true;

export default class AddScreen extends React.Component {
  state = {
    image: null,
    uploading: false,
    date: ''
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
      
      
        <Image
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            resizeMode: "cover"
          }}
          source={{
            uri:
              "https://i.pinimg.com/originals/02/ec/3e/02ec3e370b30403bc5f66f8a1e720aed.png"
          }}
        />
        <View style={{marginTop:80, height:120, width:150, marginRight:95}}>
        {this._maybeRenderImage()}
           {this._maybeRenderUploadingOverlay()}
          </View>
        
        
          <View style={styles.buttonView}>
          <TouchableOpacity onPress={this._takePhoto}>
            <Text> Camera </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._pickImage}>
            <Text> Camera roll </Text>   
            </TouchableOpacity>     

           
          </View>
        <DatePicker
          style={{
            width: 220,
            marginLeft:40
          }}
          date={this.state.date}
          mode="date"
          placeholder="photo taken date"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {
            this.setState({ date: date });
          }}/>
           
        <Button
          onPress={() => {
            this.savePhotoToDB();
          }}
        >

          <Text >SAVE TO PROFILE</Text>
          </Button>
       
          
        
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center'
            }
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          width: 150,
          height:150,
          borderRadius: 3,
          elevation: 2,
          marginLeft:50,
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden'
          }}
        >
          <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
        </View>
        <ScrollView />
      </View>
    );
  };
[Photo]
_share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [ 4, 3 ]
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [ 4, 3 ]
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
  writeToDB(photoDate, photoUrl) {
    const user = firebase.auth().currentUser;
    const usersRef = db.ref('users');
    const userRef = usersRef.child(user.uid);
    userRef.push({
      takenPhotoDate: photoDate,
      takenPhotoUrl: photoUrl
    });
  }

  savePhotoToDB() {
    this.writeToDB(this.state.date, this.state.image);
    this.props.navigation.navigate('events');
  }
}

async function uploadImageAsync(uri) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase.storage().ref().child(uuid.v4());

  const snapshot = await ref.put(blob);
  return snapshot.downloadURL;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },

      save: {
        backgroundColor: 'white',
        width:220,
        marginLeft:75,
       

  },
 
   buttonView: {
    marginTop: 50,
    height:30,
    flexDirection: "row",
    backgroundColor:"white",
    
    
      },
  buttonText: {
    fontSize: 15,
    fontFamily: "Papyrus",
    fontWeight: "200",
    alignText: 'left',
  },
});