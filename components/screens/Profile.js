import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Picker,
  TextInput,
  TouchableOpacity
} from "react-native";
import DatePicker from "react-native-datepicker";
import { db } from "../firebase";
import { firebaseApp } from "../firebase";
import * as firebase from "firebase";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "2017-07-20",
      gender: "",
      name: ""
    };
    this.users = this.getRef().child("users");
    this.userr = this.users.child(firebase.auth().currentUser.uid);
  }

  getRef() {
    return db.ref();
  }
  writeToDB(name, gender, birthDate) {
    const user = firebase.auth().currentUser;

    db.ref("users/" + user.uid).update({
      name: name,
      gender: gender,
      birthDate: birthDate

      //some more user data
    });
  }
  listenForItems(userr) {
    userr.on("value", snap => {
      

      snap.forEach(child => {
        this.setState({
          name: child.val().name,
          gender: child.val().gender,
          date: child.val().birthDate
        });
      });
    });
  }

  handleNameChange = event => {
    this.setState({
      name: event
    });
  };

  profilePageSave() {
    this.writeToDB(this.state.name, this.state.gender, this.state.date);

    this.props.navigation.navigate("add");
  }
  // componentDidMount(){
  //this.listenForItems(this.userr);
  //}

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.topBar, { backgroundColor: "#D4EEF0" }]}>
          <Text
            style={[
              styles.text,
              { marginTop: 20, marginLeft: 18, fontSize: 24 }
            ]}
          >
            Profile page
          </Text>
          <View style={styles.topBar2}>
            <Image
              style={styles.babyIcon}
              source={require("../../assets/baby.jpeg")}
            />
            <View style={styles.topbar2Content}>
              <TextInput
                style={[
                  styles.text,
                  { marginLeft: 10, fontSize: 16, width: 150 }
                ]}
                label="Name"
                value={this.state.name}
                onChangeText={this.handleNameChange}
                placeholder="baby name"
              />
            </View>
          </View>
        </View>
        <View style={styles.profileInfo}>
          <View style={styles.gender}>
            <Text style={[styles.textDescriptionContent]}> Пол </Text>

            <Picker
              stye={styles.picker}
              selectedValue={this.state.gender}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ gender: itemValue })
              }
            >
              <Picker.Item label="girl" value="girl" />
              <Picker.Item label="boy" value="boy" />
            </Picker>
          </View>

          <Text style={[styles.textDescriptionContent, { marginLeft: 18 }]}>
            {" "}
            Туған күні{" "}
          </Text>
          <DatePicker
            style={{
              width: 300,
              marginLeft: 18,
              marginTop: 10
            }}
            date={this.state.date}
            mode="date"
            placeholder="туған күні"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.profilePageSave();
            }}
          >
            <Image
              style={{
                marginTop: 25,
                alignSelf: "flex-end",
                width: 45,
                height: 40
              }}
              source={require("../../assets/okey.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  topBar: {
    flexDirection: "column",
    height: 190
  },
  topBar2: {
    flexDirection: "row",
    alignItems: "center"
  },
  topbar2Content: {
    flexDirection: "column",
    borderBottomWidth: 2,
    borderColor: "white",
    marginLeft: 10
  },
  text: {
    color: "#444"
  },
  babyIcon: {
    width: 101,
    height: 96,
    marginTop: 20,
    marginLeft: 13
  },
  profileInfo: {},
  textDecription: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: 16,
    marginTop: 20,
    marginLeft: 18
  },
  textDescriptionContent: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: 16,
    marginTop: 20,
    color: "#E5E5E5"
  },
  gender: {
    marginLeft: 18
  },
  picker: {
    height: 10,
    width: 310
  },

  okeyIcon: {
    width: 40,
    height: 30,
    tintColor: "white"
  }
});
export default Profile;
