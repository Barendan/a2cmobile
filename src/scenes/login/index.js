import React from 'react';
import {SafeAreaView, Text, TouchableHighlight} from 'react-native';

const LoginScreen = ({navigation}) => (
  <SafeAreaView>
    <Text>Screen: Login</Text>

    <TouchableHighlight onPress={() => navigation.navigate('Home')}>
      <Text>Go to home</Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => navigation.navigate('Registration')}>
      <Text>Go to Registration</Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => navigation.navigate('Faq')}>
      <Text>Go to FAQ</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

export default LoginScreen;
