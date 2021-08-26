import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Surface, List } from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import PropTypes from 'prop-types';
import { Inset, Stack } from 'react-native-spacing-system';
import { BLUE, GRAY_DARK } from '_styles/colors';

const styles = StyleSheet.create({
  surface: {
    height: verticalScale(55),
    width: '100%',
    padding: moderateScale(6),
    borderColor: GRAY_DARK,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  solidBorderStyle: {
    borderStyle: 'solid',
  },
  dashedBorderStyle: {
    borderStyle: 'dashed',
  },
  cardIcon: {
    backgroundColor: 'transparent',
  },
  checkBoxHolder: {
    justifyContent: 'center',
    paddingRight: moderateScale(6),
    // flexDirection: 'row',
  },
  requiredCard: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  title: {
    fontSize: moderateScale(14),
  },
});

const CheckboxCard = props => {
  const {
    required,
    showBorder,
    solidBorder,
    dashedBorder,
    cardIcon,
    title,
    description,
    checkedValue,
    onChecked,
    moddedStyle,
    ...rest
  } = props;

  return (
    <View>
      <TouchableOpacity onPress={() => onChecked(!checkedValue)}>
        <Inset vertical={moderateScale(4)} horizontal={moderateScale(12)}>
          <Surface
            style={[
              styles.surface,
              props.showBorder && props.dashedBorder
                ? styles.dashedBorderStyle
                : required
                ? styles.requiredCard
                : styles.solidBorderStyle,
              props.moddedStyle ? moddedStyle : null,
            ]}>
            <List.Item
              title={title + (required ? '*' : '')}
              titleStyle={styles.title}
              description={description}
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
                <CheckBox
                  style={styles.checkBoxHolder}
                  uncheckedCheckBoxColor={BLUE}
                  checkedCheckBoxColor={BLUE}
                  onClick={() => onChecked(!checkedValue)}
                  isChecked={checkedValue}
                />
              )}
            />
          </Surface>
        </Inset>
      </TouchableOpacity>
    </View>
  );
};

CheckboxCard.defaultProps = {
  align: 'center',
  cardContentProps: {},
};

CheckboxCard.propTypes = {
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
   * CurrentCheckedValue
   */
  checkedValue: PropTypes.bool.isRequired,
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
export default CheckboxCard;
