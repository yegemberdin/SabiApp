import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import * as firebase from "firebase";

const myProps = Platform.select({
  android: {
    extraScrollHeight: 50,
    enableOnAndroid: true,
    keyboardShouldPersistTaps: "handled"
  },
  ios: {}
});

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", error: "", loading: false };
  }

  onLoginPress() {
    this.setState({ error: "", loading: true });

    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: "", loading: false });
        this.props.navigation.navigate("main");
      })
      .catch(() => {
        this.setState({ error: "fghjk", loading: false });
      });
  }

  onSignUpPress() {
    this.setState({ error: "", loading: true });

    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: "", loading: false });
        this.props.navigation.navigate("main");
      })
      .catch(() => {
        this.setState({ error: "fghjk", loading: false });
      });
  }

  renderButtonOrLoading() {
    return (
      <View style={styles.buttonView}>
        <Button onPress={this.onLoginPress.bind(this)}>
          <Text style={styles.buttonText}>L o g i n</Text>
        </Button>
        <Button onPress={this.onSignUpPress.bind(this)}>
          <Text style={styles.buttonText}>S i g n U p</Text>
        </Button>
      </View>
    );
  }

  render() {
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
              "https://i.pinimg.com/564x/27/23/9a/27239ae088f2341ea97bee5b818ad3f6.jpg"
          }}
        />
        <KeyboardAwareScrollView {...myProps}>
          <View style={styles.second}>
            <TextInput
              style={styles.input}
              onChangeText={email => this.setState({ email })}
              placeholder="Email"
            >
              
            </TextInput>

            <TextInput
              style={styles.input1}
              onChangeText={password => this.setState({ password })}
              placeholder="Password"
            />
          </View>
        </KeyboardAwareScrollView>

        {this.renderButtonOrLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    fontSize: 32
  },
  second: {
    marginTop: 335,
    marginBottom: 0
  },
  buttonView: {
    marginTop: 0,
    marginBottom: 40,
    flexDirection: "row"
  },
  buttonText: {
    fontSize: 15,
    fontFamily: "Papyrus",
    fontWeight: "200"
  },

  input: {
    height: 36,
    padding: 4,
    fontSize: 10,
    borderWidth: 1,
    fontFamily: "American Typewriter",
    borderColor: "#3a3a3a",
    borderRadius: 18,
    color: "#3a3a3a",
    backgroundColor: "#faf7f8",
    marginBottom: 10,
    marginTop: 0,
    marginLeft: 10,
    fontWeight: "200",
    textAlign: "center",
    alignSelf: "flex-end",

    width: 250
  },
  input1: {
    height: 36,
    padding: 4,
    fontSize: 10,
    borderWidth: 1,
    fontFamily: "American Typewriter",
    borderColor: "#3a3a3a",
    borderRadius: 18,
    color: "#3a3a3a",
    backgroundColor: "#faf7f8",
    marginBottom: 10,
    marginLeft: 10,
    textAlign: "center",
    fontWeight: "200",
    marginTop: 0,

    alignSelf: "flex-end",

    width: 250
  }
});
