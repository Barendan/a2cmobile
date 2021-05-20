import React from 'react';
import {View, Text, Switch, KeyboardAvoidingView, Platform} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import TextContent from '../../components/textContent';
import styles from './styles';
import Input from '../../components/input';
import Button from '../../components/button';
import { Colors } from '../../libs/color';

const LoginScreen = ({navigation, route}) => {

  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isVisible, setVisible] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  async function onLogin() {
    
  }

  return (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height" }
    style={styles.keyboardAvoidViewing}
  >
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TextContent
            fontSize={50}
            style={styles.title}
          >
            Mercy Care 
        </TextContent>
      </View>
      <View style={styles.spacing}>
        <Input 
          placeholder={'email'}
          containerStyle={{ backgroundColor: Colors.Grey}}
          value={email}
          onChange={setEmail}
          leftComponent={<Icon size={18} name="person-outline" />}
        />
      </View>
      <View style={styles.spacing}>
        <Input 
          placeholder={'password'}
          secureTextEntry={!isVisible}
          containerStyle={{ backgroundColor: Colors.Grey}}
          value={password}
          onChange={setPassword}
          leftComponent={<Icon size={18} name="lock-closed-outline" />}
          rightComponent={<Icon onPress={() => setVisible(previousState => !previousState)} size={18} name= {isVisible ? "eye-off-outline" : "eye-outline"} />}
        />
      </View>
      <Button style={{ marginTop: 10 }} onClick={onLogin} state="primary" variant="solid">
        <TextContent
          color={Colors.White}
          fontWeight={'700'}
          textAlign="center"
        >
          Sign In 
        </TextContent>
      </Button>

      <View style={styles.forgotPass}>
        <TextContent
            color={Colors.Brand}
            fontWeight={'400'}
            textAlign="center"
          >
           Forgot Password
          </TextContent>
          <View style={styles.thumbContainer}>
            <TextContent
              color={Colors.Brand}
              fontWeight={'400'}
              textAlign="center"
              style={{ marginRight: 5 }}
            >
              Save login
            </TextContent>
            <Switch
              trackColor={{ false: Colors.Green, true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor={Colors.Green}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
      </View>
      <View style={styles.footer}>
            <TextContent
                fontWeight={'400'}
                textAlign="center"
                style={{ marginRight: 5 }}
              >
                By registering, you agree to our
              </TextContent>
              <View style={styles.toRow}>
                <TextContent
                  color={Colors.Brand}
                  fontWeight={'500'}
                  textAlign="center"
                  style={{ marginRight: 5 }}
                >
                  Terms of Service
                </TextContent>
                <TextContent
                  fontWeight={'400'}
                  textAlign="center"
                  style={{ marginRight: 5 }}
                >
                  and
                </TextContent>
                <TextContent
                  color={Colors.Brand}
                  fontWeight={'500'}
                  textAlign="center"
                  style={{ marginRight: 5 }}
                >
                  privacy policy
                </TextContent>
              </View>
              <TextContent
                color={Colors.Brand}
                fontWeight={'400'}
                textAlign="center"
                style={{ marginTop: 8 }}
              >
                FAQs
              </TextContent>
          </View>

    </View>
   
  </KeyboardAvoidingView>
)
  }

export default LoginScreen;