import React from 'react';
import { Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import Register from './src/screens/Register';
import Qrcode from './src/screens/Qrcode';
import { Provider } from 'react-redux';
import { Store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createStackNavigator();
export default function App (){
  return(
    <Provider store = { Store }>
    <PersistGate loading={<Text>Aguarde...</Text>} persistor={persistor}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}></Stack.Screen>
        <Stack.Screen name="Register" component={Register}></Stack.Screen>
        <Stack.Screen name="Qrcode" component={Qrcode}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </PersistGate>
    </Provider>
  )
}
