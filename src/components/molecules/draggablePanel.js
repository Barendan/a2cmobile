import * as React from 'react';
import { Animated, Dimensions, Modal, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View, } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const DEFAULT_PANEL_HEIGHT = SCREEN_HEIGHT;

const DraggablePanel = React.forwardRef(({ visible = false, animationDuration = 500, expandable = false, hideOnPressOutside = true, overlayBackgroundColor = 'black', overlayOpacity = 0.8, borderRadius = 0, initialHeight = DEFAULT_PANEL_HEIGHT / 2, hideOnBackButtonPressed = true, hideable = true, onDismiss, children, fixPanel = false }, ref) => {
    const [animatedValue] = React.useState(new Animated.Value(0));
    const [popupVisible, togglePopupVisibility] = React.useState(false);
    const [animating, setAnimating] = React.useState(false);
    const [height] = React.useState(Math.min(initialHeight, DEFAULT_PANEL_HEIGHT));
    const [innerContentHeight, setInnerContentHeight] = React.useState(Math.min(initialHeight, DEFAULT_PANEL_HEIGHT));
    const scrollViewRef = React.useRef(null);
    React.useEffect(() => {
        if (!animating) {
            if (visible && !popupVisible) {
                show();
            }
            else if (popupVisible) {
                hide();
            }
        }
    }, [visible]);
    const show = () => {
        if (!animating) {
            animatedValue.setValue(0);
            setInnerContentHeight(Math.min(initialHeight, DEFAULT_PANEL_HEIGHT));
            setAnimating(true);
            togglePopupVisibility(true);
            Animated.timing(animatedValue, {
                toValue: height / DEFAULT_PANEL_HEIGHT,
                duration: animationDuration,
                useNativeDriver: true,
            }).start(() => {
                scrollViewRef.current?.scrollTo({
                    x: 0,
                    y: SCREEN_HEIGHT - (SCREEN_HEIGHT * height) / DEFAULT_PANEL_HEIGHT,
                    animated: false,
                });
                setAnimating(false);
            });
        }
    };
    const hide = () => {
        if (!animating) {
            setAnimating(true);
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: animationDuration,
                useNativeDriver: true,
            }).start(() => {
                scrollViewRef.current?.scrollTo({
                    x: 0,
                    y: SCREEN_HEIGHT,
                    animated: false,
                });
                togglePopupVisibility(false);
                setAnimating(false);
                onDismiss && onDismiss();
            });
        }
    };
    const onBackButtonPress = () => {
        if (Platform.OS === 'android' &&
            hideOnBackButtonPressed &&
            !animating &&
            popupVisible &&
            hideable) {
            hide();
        }
    };
    React.useImperativeHandle(ref, () => ({
        show,
        hide,
    }));
    const onScroll = (event) => {
        if (!animating) {
            const { y } = event.nativeEvent.contentOffset;
            if (!expandable &&
                y < SCREEN_HEIGHT - (SCREEN_HEIGHT * height) / DEFAULT_PANEL_HEIGHT) {
                return;
            }
            animatedValue.setValue(1 - Math.floor(y) / Math.floor(SCREEN_HEIGHT));

            if (Math.floor(y) >= Math.floor(SCREEN_HEIGHT)) {
                togglePopupVisibility(false);
                setAnimating(false);
                onDismiss && onDismiss();
            }
        }
    };
    const onScrollBeginDrag = (event) => {
        if (event.nativeEvent.contentOffset.y !== 0 && expandable) {
            setInnerContentHeight(DEFAULT_PANEL_HEIGHT);
        }
    };
    const onMomentumScrollEnd = (event) => {
        if (expandable) {
            const { y } = event.nativeEvent.contentOffset;
            if (y !== 0) {
                setInnerContentHeight(height);
            }
            else {
                setInnerContentHeight(DEFAULT_PANEL_HEIGHT);
            }
        }
    };
    return (
      <Modal
        visible={popupVisible}
        transparent
        animated={false}
        onRequestClose={onBackButtonPress}>
        <View style={styles.popupContainer}>
          <Animated.View
            style={{
              ...styles.popupOverlay,
              backgroundColor: overlayBackgroundColor,
              opacity: animatedValue.interpolate({
                inputRange: [0, height / DEFAULT_PANEL_HEIGHT],
                outputRange: [0, overlayOpacity],
                extrapolate: 'clamp',
              }),
            }}
          />
          <ScrollView
            ref={scrollViewRef}
            style={styles.scroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.scrollContainer}
            onScroll={onScroll}
            bounces={false}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={onScrollBeginDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            decelerationRate={0}
            snapToOffsets={[
              0,
              SCREEN_HEIGHT - (SCREEN_HEIGHT * height) / DEFAULT_PANEL_HEIGHT,
              SCREEN_HEIGHT,
            ]}>
            <TouchableWithoutFeedback
              disabled={!hideOnPressOutside || animating || !hideable}
              onPress={hide}>
              <View style={styles.hideContainer} />
            </TouchableWithoutFeedback>
          </ScrollView>
          <Animated.View
            style={[
              styles.popupContentContainer,
              {
                position: fixPanel ? 'relative' : 'absolute',
                paddingTop: fixPanel && Platform.OS === 'android' ? '0%' : '5%',
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius,
                transform: [
                  {
                    translateY: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -DEFAULT_PANEL_HEIGHT],
                    }),
                  },
                ],
              },

            ]}>
            <View style={styles.indicator} />
            <View
              style={[
                styles.content,
                {height: expandable ? innerContentHeight : height},
              ]}>
              {children}
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
})

const styles = StyleSheet.create({
    popupContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
    },
    popupOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    popupContentContainer: {
        backgroundColor: 'white',
        // position: 'relative', // add saved and add trip panels
        left: 0,
        right: 0,
        bottom: -DEFAULT_PANEL_HEIGHT,
        height: DEFAULT_PANEL_HEIGHT,
        alignItems: 'center',
    },
    indicator: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 60,
        height: 4,
        borderRadius: 50,
        top: -16,
    },
    scroll: {
        ...StyleSheet.absoluteFillObject,
        transform: [{ rotate: '180deg' }],
    },
    scrollContainer: {
        height: SCREEN_HEIGHT * 2,
    },
    hideContainer: {
        flex: 1,
    },
    content: {
        width: '100%',
    },
});

export default DraggablePanel;