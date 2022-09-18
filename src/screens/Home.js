import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { v4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { setUUID, getIsRegistered } from "../redux/actions";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import { useFocusEffect } from "@react-navigation/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  let to = useRef(null);
  const [emergency_count, setEmergencyCount] = useState(5);
  const { uuid,is_registered } = useSelector((state) => state.userReducer);
  let isRegistered = is_registered == 'undefined' ? 'false' : is_registered.is_registered;
  const dispatch = useDispatch();
  const buttonClickedHandler = () => {
    clearTimeout(to.current);
    to.current = setTimeout(() => setEmergencyCount(5), 5000);
    setEmergencyCount(emergency_count - 1);
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getIsRegistered(uuid));
      if (is_registered != 'undefined')
        isRegistered = is_registered.is_registered;
    }, [])
  );

  useEffect(() => {
    // limpa asyncstorage
    //const clearData = async () => {
    //   await AsyncStorage.clear()
    // };
    // clearData().catch(console.error);
    const newUuid = v4();
    if (uuid.length < 1) {
      dispatch(setUUID(newUuid));
    }    
  },[]);

  function register() {
    navigation.navigate("Register");
  }

  function RenderABRegister() {
    // const isRegistered = props.isRegistered;
    if (isRegistered) {
      return (
        <AwesomeButtonRick
          style={styles.ab_register}
          type="secondary"
          width={wp('90%')}
          height={hp('10%')}
          disabled={isRegistered != 'true'}
          backgroundDarker={ isRegistered == 'false' ? "grey" : "#000" }
          backgroundColor={ isRegistered == 'false' ? "grey" : "blue" }
          textColor={ isRegistered == 'false' ? "white" : "#FFF" }
          onPress={register}
        >
          REGISTRAR DISPOSITIVO
        </AwesomeButtonRick>
      );
    } else {
      return null;
    }
  }

  return (
    <View style={styles.screen}>
      <Image style={styles.img} source={require("../../assets/logo.png")} />
      <Text style={styles.uuid}>ID DO DISPOSITIVO: {uuid}</Text>
      <Text>
        <Text style={styles.status}>STATUS DO REGISTRO: </Text>
        <Text
          style={
            isRegistered == 'true'
              ? styles.status_registered
              : styles.status_not_registered
          }
        >
          {isRegistered == 'true' ? "OK" : "NÃO REGISTRADO"}
        </Text>
      </Text>

      <AwesomeButtonRick
        style={styles.ab_denuncia}
        type="disabled"
        backgroundDarker={isRegistered == 'true' ? "#000" : "grey"}
        backgroundColor={isRegistered == 'true' ? "#00FF00" : "grey"}
        textColor={isRegistered == 'true' ? "#000" : "white"}
        disabled={isRegistered != 'true'}
        height={hp('10%')}
        width={wp('90%')}
      >
        DENÚNCIAS
      </AwesomeButtonRick>

      <AwesomeButtonRick
        style={styles.ab_atividade_suspeita}
        type="disabled"
        backgroundDarker={isRegistered == 'true' ? "#000" : "grey"}
        backgroundColor={isRegistered == 'true' ? "#FF6600" : "grey"}
        textColor={isRegistered == 'true' ? "#000" : "white"}
        disabled={isRegistered != 'true'}
        height={hp('10%')}
        width={wp('90%')}
      >
        ATIVIDADES SUSPEITAS
      </AwesomeButtonRick>

      <AwesomeButtonRick
        style={styles.ab_emergencia}
        type="disabled"
        backgroundDarker={isRegistered == 'true' ? "#000" : "grey"}
        backgroundColor={isRegistered == 'true' ? "#FF0000" : "grey"}
        textColor={isRegistered == 'true' ? "#000" : "white"}
        disabled={isRegistered != 'true'}
        width={wp('90%')}
        height={hp('10%')}
        onPress={buttonClickedHandler}
      >
        EMERGÊNCIAS
      </AwesomeButtonRick>
      <RenderABRegister />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    position: "absolute",
    top: hp('-3%'),
  },
  screen: {
    paddingTop: hp('30%'),
    justifyContent: "center",
    alignItems: "center",
  },
  uuid: {
    marginTop:hp('-10%'),
    paddingTop:hp('6%'),
    justifyContent: "center",
    fontSize: 10,
  },
  
  status: {
    justifyContent: "center",
    fontSize: 15,
  },

  status_registered: {
    justifyContent: "center",
    fontSize: 15,
    color: "green",
    fontWeight: "bold",
  },

  status_not_registered: {
    justifyContent: "center",
    fontSize: 15,
    color: "red",
    fontWeight: "bold",
  },

  ab_emergencia: {
    marginTop: hp('4%'),
    justifyContent: "center",
    alignItems: "center"
  },

  ab_text_emergencia: {
    fontSize: 15,
    fontWeight: "bold"
  },

  ab_denuncia: {
    marginTop: hp('4%'),
    justifyContent: "center",
    alignItems: "center",
  },

  ab_atividade_suspeita: {
    marginTop: hp('4%'),
    justifyContent: "center",
    alignItems: "center",
  },

  ab_register: {
    marginTop: wp('4%')
  },

  ab_no_registered: {
    marginTop: wp('4%'),
    justifyContent: "center",
    alignItems: "center",
  },
});
