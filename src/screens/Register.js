import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { DEV_API_BASE, PROD_API_BASE } from "@env";
import { useSelector } from "react-redux";

if (__DEV__) {
  var URL_BASE = DEV_API_BASE;
} else {
  var URL_BASE = PROD_API_BASE;
}

export default function Qrcode({ navigation }) {
  const { uuid } = useSelector((state) => state.userReducer);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ citizen_device_id: data, central_device_id: uuid }),
      };
      fetch(URL_BASE + "/register_device.json", requestOptions)
        .then((response) => response.json())
        .then((respData) => (respData.status == "ok") ? navigation.navigate("Home"):null);
    } catch (error) {}
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Aperte para scanear novamente"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

// import React, { useEffect } from "react";
// import { View, Text, StyleSheet, BackHandler, Alert } from "react-native";
// import QRCode from "react-native-qrcode-svg";

// export default function Register({ navigation }) {

//   // const buttonClickedHandler = () => {};

//   const backAction = () => {
//     navigation.navigate("Home",{camingFromRegister:true});
//     return true;
//   };

//   const backHandler = BackHandler.addEventListener(
//     "hardwareBackPress",
//     backAction
//   );

//   useEffect(() => {});

//   function register() {
//     navigation.navigate("Home");
//   }

//   return (
//     <View style={styles.screen}>
//       <Text style={styles.title}>
//         PROCURE UM POLICIAL NA DELEGACIA DA PM OU EM UMA VIATURA E PESSA PARA
//         REGISTRAR O SEU APLICATIVO
//       </Text>
//       <QRCode value={`${global.URL_BASE}/device_uuid=${global.UUID}`} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     paddingTop: 150,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     padding: 10,
//     marginBottom: 20,
//     backgroundColor: "green",
//     fontSize: 20,
//     color: "white",
//     textAlign: "center",
//     flexWrap: "wrap",
//   },
// });
