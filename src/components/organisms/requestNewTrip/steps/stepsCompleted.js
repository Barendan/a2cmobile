import React from 'react';
import { View, Animated, Text } from 'react-native';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';

import styles from './styles';
import { APP_COLOR } from '_styles/colors';
import { Stack } from 'react-native-spacing-system';

const StepsCompleted = (props) => {

    const {
        title,
        subtitle,
        onPress,
        buttonText
    } = props;

    const transition = new Animated.Value(0);

    React.useEffect(() => {
        Animated.timing(transition, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false
        }).start();
    }, []);


    return (
        <View style={styles.container}>

            <View style={styles.completedformContainer}>


                <LottieView style={styles.checkmark} source={require('_assets/animations/check.json')} autoPlay loop={true} />
                <Stack size={12} />

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.body}>{subtitle}</Text>

            </View>

            <Stack size={12} />

            <View style={styles.footer}>
                <Button
                    title={buttonText}
                    size="large"
                    style={styles.forwardButton}
                    onPress={onPress}>
                    {buttonText}
                </Button>
            </View>

        </View>
    );
};

export default StepsCompleted;
