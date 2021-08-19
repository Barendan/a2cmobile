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
    height: verticalScale(50),
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
  cardIcon: {
    backgroundColor: 'transparent',
    marginVertical: 50,
    marginLeft: moderateScale(-5),
  },
  checkBoxHolder: {
    justifyContent: 'center',
    padding: moderateScale(8),
  },
  requiredCard: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  title: {
    fontSize: moderateScale(16),
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
    ...rest
  } = props;

  return (
    <View>
      <TouchableOpacity onPress={() => onChecked(!checkedValue)}>
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
