import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator ,Text,Button,StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.js';
import QuizScreen from './screens/QuizScreen.js';
import ResultScreen from './screens/ResultScreen.js';


const Stack = createNativeStackNavigator();

export const App = ()=> { 

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
      </>
  );

};
