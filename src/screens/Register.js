import React, { useEffect } from "react";
import { View, Text, StyleSheet, BackHandler, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function Register({ navigation }) {

  // const buttonClickedHandler = () => {};

  const backAction = () => {
    navigation.navigate("Home",{camingFromRegister:true});
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );
  
  useEffect(() => {});

  function register() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>
        PROCURE UM POLICIAL NA DELEGACIA DA PM OU EM UMA VIATURA E PESSA PARA
        REGISTRAR O SEU APLICATIVO
      </Text>
      <QRCode value={`${global.URL_BASE}/device_uuid=${global.UUID}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: "green",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    flexWrap: "wrap",
  },
});
