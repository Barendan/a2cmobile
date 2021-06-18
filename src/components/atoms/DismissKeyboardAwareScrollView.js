import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const DismissKeyboardAwareScrollView = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardAwareScrollView;
