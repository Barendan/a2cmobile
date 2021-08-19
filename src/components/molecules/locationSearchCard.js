import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';
import { Inset, Stack } from 'react-native-spacing-system';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { LocationSearchPanel } from '_organisms';
import { LocationService } from '_helpers';
import {
  GRAY_DARK,
  START_LOCATION_COLOR,
  MID_LOCATION_COLOR,
  END_LOCATION_COLOR,
} from '_styles/colors';

const styles = StyleSheet.create({
  surface: {
    padding: moderateScale(2),
    height: verticalScale(80),
    width: '100%',
    elevation: 10,
    borderWidth: 1,
    borderColor: GRAY_DARK,
    borderRadius: 10,
    padding: moderateScale(10),
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  solidBorderStyle: {
    borderStyle: 'solid',
  },
  dashedBorderStyle: {
    borderStyle: 'dashed',
  },
  callIcon: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  tripPathDetails: {
    marginLeft: -5,
  },
  titleStyle: {
    fontSize: 18,
    color: '#47494d',
    marginTop: -6,
  },
  descriptionStyle: {
    color: 'red',
  },
  startLocationIcon: {
    backgroundColor: START_LOCATION_COLOR,
    marginVertical: moderateScale(50),
    marginRight: 10,
  },
  midLocationIcon: {
    backgroundColor: MID_LOCATION_COLOR,
    marginVertical: moderateScale(50),
    marginRight: 10,
  },
  endLocationIcon: {
    backgroundColor: END_LOCATION_COLOR,
    marginVertical: moderateScale(50),
    marginRight: 10,
  },
  plusIcon: {
    backgroundColor: 'transparent',
    marginVertical: moderateScale(40),
    marginRight: -5,
  },
  titleWrapper: {
    borderBottomColor: '#6f99bf',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    color: '#366999',
    fontSize: 14,
    marginBottom: 10,
  },
  currentLocationView: {
    fontWeight: 'bold',
    color: '#366999',
    fontSize: 14,
    marginBottom: 10,
  },
  locationSelectorView: {
    flex: 1,
    flexDirection: 'column',
  },
  requiredCard: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  inputLabel: {
    color: '#8F9BB3',
    fontSize: moderateScale(10),
  },
});

const LocationSearchCard = props => {
  const { t } = useTranslation();

  const {
    required,
    showBorder,
    solidBorder,
    dashedBorder,
    title,
    description,
    locationIndex,
    onAddressSelected,
    onPress,
    disableClick,
    icon,
    iconColor,
    ...rest
  } = props;

  const stopStyle = index => {
    switch (index) {
      case 0:
        return styles.startLocationIcon;
        break;
      case 1:
        return styles.endLocationIcon;
        break;
      default:
        return styles.midLocationIcon;
    }
  };

  const [showOptions, setShowOptions] = useState(false);

  const optionSelected = option => {
    onOptionSelected(option);
    setShowOptions(false);
  };

  const heightAnim = React.useRef(new Animated.Value(60)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: showOptions ? moderateScale(200) : moderateScale(60),
      duration: 250, // <-- animation duration
      useNativeDriver: false,
    }).start();
  }, [showOptions]);

  const viewHeight = {
    height: heightAnim,
  };

  const onPlaceSelected = addr => {
    onAddressSelected(addr);
    setShowOptions(false);
  };

  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableHighlight
        onPress={() =>
          disableClick ? onPress() : setShowOptions(!showOptions)
        }>
        <Inset all={moderateScale(12)}>
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
                title={title + (required ? '*' : '')}
                titleStyle={{
                  fontSize: moderateScale(16),
                }}
                description={() => (
                  <Text style={styles.inputLabel}>{description} </Text>
                )}
                descriptionNumberOfLines={4}
                left={props => (
                  <Avatar.Icon
                    {...props}
                    size={moderateScale(20)}
                    color="black"
                    style={
                      icon
                        ? {
                            backgroundColor: iconColor,
                          }
                        : stopStyle(locationIndex)
                    }
                  />
                )}
                right={props => (
                  <Avatar.Icon
                    size={scale(30)}
                    icon={icon || 'plus'}
                    color="black"
                    style={styles.plusIcon}
                  />
                )}
              />
            )}

            {/* 


                        {showOptions && <View style={styles.locationSelectorView}>

                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>{title+ (required ? '*' : '')}</Text>
                                <View style={styles.currentLocationView}>
                                    <AvatarButton icon={"crosshairs-gps"} iconColor="black" buttonText={t('use_current_location')} onPress={() => LocationService.getLocation()} />
                                </View>
                            </View>

                            <Stack size={6} />
                                
                            <LocationService.googlePlacesAutoInput placeholder={t('search_location')} lang={'en'} onPlaceSelected={(v) => onPlaceSelected(v)} />
                            <Stack size={6} />
                        </View>} */}
          </Animated.View>
        </Inset>
      </TouchableHighlight>

      <LocationSearchPanel
        displayPanel={showOptions}
        onPanelDismiss={() => setShowOptions(false)}
        panelHeader={title + (required ? '*' : '')}
        onPlaceSelected={v => onPlaceSelected(v)}
      />
    </View>
  );
};

LocationSearchCard.defaultProps = {
  align: 'center',
  cardContentProps: {},
};

LocationSearchCard.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * Card Title
   */
  title: PropTypes.string,
  /**
   * Card Description Text
   */
  description: PropTypes.string,
  /**
   * The address locationIndex, from, mid or end address
   */
  locationIndex: PropTypes.node.isRequired,
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
export default LocationSearchCard;
