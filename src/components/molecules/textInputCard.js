<<<<<<< HEAD
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {
  Avatar,
  Card,
  Surface,
  IconButton,
  Divider,
  List,
} from 'react-native-paper';

import Counter from 'react-native-counters';

import PropTypes from 'prop-types';
import { Inset, Stack } from 'react-native-spacing-system';
=======
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Surface, List } from 'react-native-paper';
import { Inset, Stack } from 'react-native-spacing-system';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
>>>>>>> b1fe9eb (scale styles of each individual new trip component)

import { BLUE, GRAY_DARK, GRAY_LIGHT } from '_styles/colors';
import { GRAY_MEDIUM } from '_styles';

const styles = StyleSheet.create({
  surface: {
<<<<<<< HEAD
    padding: 2,
    height: 220,
    width: '100%',
    // elevation: 10,
    borderWidth: 1,
    borderColor: GRAY_DARK,
    borderRadius: 10,
    // padding: 10,
=======
    height: verticalScale(200),
    width: '100%',
    borderWidth: 1,
    borderColor: GRAY_DARK,
    borderRadius: 10,
    padding: moderateScale(8),
>>>>>>> b1fe9eb (scale styles of each individual new trip component)
    justifyContent: 'flex-start',
  },
  solidBorderStyle: {
    borderStyle: 'solid',
  },
  dashedBorderStyle: {
    borderStyle: 'dashed',
  },
  cardIcon: {
    backgroundColor: 'transparent',
    marginVertical: 50,
    marginLeft: -5,
  },
<<<<<<< HEAD
  counterHolder: {
    marginVertical: 50,
    justifyContent: 'center',
    textAlign: 'center',
    height: 10,
    marginHorizontal: -8,
    borderColor: BLUE,
    borderWidth: 1,
  },
  titleStyle: {
    marginBottom: 10,
=======
  titleStyle: {
    fontSize: moderateScale(16),
    marginBottom: moderateScale(10),
>>>>>>> b1fe9eb (scale styles of each individual new trip component)
  },
  textInputStyleClass: {
    padding: 10,
    textAlign: 'left',
<<<<<<< HEAD
    height: 150,
    fontSize: 17,
    color: '#000',
=======
    height: verticalScale(120),
    fontSize: moderateScale(12),
>>>>>>> b1fe9eb (scale styles of each individual new trip component)
    borderWidth: 1,
    borderColor: GRAY_MEDIUM,
    borderRadius: 5,
    borderStyle: 'dashed',
  },
  requiredCard: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
  },
});

const TextInputCard = props => {
  const {
    required,
    showBorder,
    solidBorder,
    dashedBorder,
    cardIcon,
    title,
    description,
    placeholder,
    textValue,
    onChangeText,
    ...rest
  } = props;

  return (
    <View>
      <Inset all={5}>
        <Surface
          style={[
            styles.surface,
            props.showBorder && props.dashedBorder
              ? styles.dashedBorderStyle
              : required
              ? styles.requiredCard
              : styles.solidBorderStyle,
          ]}>
          <List.Item
            title={title + (required ? '*' : '')}
            titleStyle={styles.titleStyle}
            description={props => (
              <TextInput
                placeholder={placeholder}
                underlineColorAndroid="transparent"
                multiline={true}
                numberOfLines={4}
                style={styles.textInputStyleClass}
                value={textValue}
                onChangeText={onChangeText}
              />
            )}
            // left={props => <Avatar.Icon {...props} size={40} color="black" icon={cardIcon} style={styles.cardIcon} />}
          />
        </Surface>
      </Inset>
    </View>
  );
};

TextInputCard.defaultProps = {
  align: 'center',
  cardContentProps: {},
};

TextInputCard.propTypes = {
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
export default TextInputCard;
