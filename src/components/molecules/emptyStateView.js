import React from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import { Button } from '@ui-kitten/components';
import LottieView from 'lottie-react-native';
import { scaleFont } from '_styles/mixins';
import { FONT_SIZE_18 } from '_styles/typography';
import { GRAY_DARK, GRAY_MEDIUM } from '_styles/colors';
import { Stack } from 'react-native-spacing-system';

const EmptyStateView = (props) => {

    const {
        image,
        title,
        subtitle,
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

            <View style={styles.mainViewContainer}>


                <LottieView style={styles.checkmark} source={require('_assets/animations/pointMap.json')} autoPlay loop={true} />
                <Stack size={12} />

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.body}>{subtitle}</Text>

            </View>

           

        </View>
    );
};


const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        color: GRAY_DARK,
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center'
      },
      body: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
      },
      container: {
        flex: 1,
      },
      mainViewContainer: {
        height: '80%',
        width: '100%',
        // backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
      },
      checkmark: {
        height: 80,
      },
  });

export default EmptyStateView;
