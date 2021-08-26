import React, { useState } from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { Avatar, List, Text, Divider } from 'react-native-paper';
import { Inset, Stack } from 'react-native-spacing-system';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { Picker } from '@react-native-picker/picker';
import PropTypes from 'prop-types';

import { CloseButton } from '_atoms';
import { BLUE, GRAY_DARK } from '_styles/colors';

const styles = StyleSheet.create({
  surface: {
    height: verticalScale(55),
    width: '100%',
    padding: moderateScale(6),
    borderColor: GRAY_DARK,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    elevation: 10,
    borderWidth: 1,
  },
  solidBorderStyle: {
    borderStyle: 'solid',
  },
  dashedBorderStyle: {
    borderStyle: 'dashed',
  },
  cardIcon: {
    backgroundColor: 'transparent',
    // marginLeft: moderateScale(-5),
  },
  optionsHolder: {
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  cardOptionsIcon: {
    backgroundColor: 'transparent',
    // marginRight: moderateScale(-6),
    fontSize: moderateScale(14),
  },
  optionStyleTitle: {
    fontSize: moderateScale(14),
    color: BLUE,
  },
  title: {
    fontSize: moderateScale(14),
  },
  subtitle: {
    fontSize: moderateScale(10),
    marginTop: moderateScale(-2),
    paddingBottom: moderateScale(6),
  },
  requiredCard: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
  },
});

const DropDownPickerCard = props => {
  const {
    required,
    showBorder,
    solidBorder,
    dashedBorder,
    cardIcon,
    title,
    description,
    mulitple,
    optionsList,
    selectedValue,
    onOptionSelected,
    onChecked,
    ...rest
  } = props;

  const [showOptions, setShowOptions] = useState(false);

  const optionSelected = option => {
    onOptionSelected(option);
    setShowOptions(false);
  };

  const heightAnim = React.useRef(new Animated.Value(60)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: showOptions ? verticalScale(200) : verticalScale(50),
      duration: 250, // <-- animation duration
      useNativeDriver: false,
    }).start();
  }, [showOptions]);

  const viewHeight = {
    height: heightAnim,
  };

  return (
    <View>
      <TouchableHighlight onPress={() => setShowOptions(!showOptions)}>
        <Inset vertical={moderateScale(4)} horizontal={moderateScale(12)}>
          <Animated.View
            style={[
              styles.surface,
              props.showBorder && props.dashedBorder
                ? styles.dashedBorderStyle
                : required
                ? styles.requiredCard
                : styles.solidBorderStyle,
              viewHeight,
            ]}>
            {!showOptions && (
              <List.Item
                titleStyle={styles.title}
                title={title + (required ? '*' : '')}
                description={selectedValue}
                descriptionStyle={styles.subtitle}
                descriptionNumberOfLines={2}
                left={props => (
                  <Avatar.Icon
                    {...props}
                    size={moderateScale(34)}
                    color="black"
                    icon={cardIcon}
                    style={styles.cardIcon}
                  />
                )}
                right={props => (
                  <View style={styles.optionsHolder}>
                    <TouchableHighlight
                      onPress={() => setShowOptions(!showOptions)}>
                      <Avatar.Icon
                        {...props}
                        size={moderateScale(34)}
                        color={BLUE}
                        icon={'arrow-down-drop-circle'}
                        style={styles.cardOptionsIcon}
                      />
                    </TouchableHighlight>
                  </View>
                )}
              />
            )}

            {showOptions && (
              <>
                <CloseButton onPress={() => setShowOptions(!showOptions)} />

                <ScrollView showsVerticalScrollIndicator={false}>
                  {optionsList.map(currentOption => (
                    <View key={currentOption.label}>
                      <TouchableHighlight
                        onPress={() => optionSelected(currentOption)}>
                        <Text style={styles.optionStyleTitle}>
                          {currentOption.label}
                        </Text>
                      </TouchableHighlight>
                      <Divider />
                    </View>
                  ))}
                </ScrollView>
              </>
            )}
          </Animated.View>
        </Inset>
      </TouchableHighlight>
    </View>
  );
};

DropDownPickerCard.defaultProps = {
  align: 'center',
  cardContentProps: {},
};

DropDownPickerCard.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * Card Icon
   */
  cardIcon: PropTypes.string,
  /**
   * Card Title
   */
  title: PropTypes.string,
  /**
   * Card Description Text
   */
  description: PropTypes.string,
  /**
   * Whether to show border
   */
  showBorder: PropTypes.bool,
  /**
   * Whether to solid border
   */
  solidBorder: PropTypes.bool,
  /**
   * Whether to dashed border
   */
  dashedBorder: PropTypes.bool,
  /**
   * Additional props to pass to the CardContent component
   */
  cardContentProps: PropTypes.object,
};
export default DropDownPickerCard;
