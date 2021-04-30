import React from 'react';
import { TouchableHighlight, Image } from 'react-native';
import Voice from '@react-native-voice/voice';

const SpeechToText = ({ handleSpeechText }) => {
  const startVoice = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error('voice error:', e);
    }
  };

  return (
    <TouchableHighlight onPress={startVoice}>
      <Image
        style={{ margin: 10, width: 30, height: 30 }}
        source={{
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
        }}
      />
    </TouchableHighlight>
  );
};

export default SpeechToText;
