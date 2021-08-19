import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Surface, List } from 'react-native-paper';
import { Inset, Stack } from 'react-native-spacing-system';
import Counter from 'react-native-counters';
import PropTypes from 'prop-types';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
    marginLeft: moderateScale(-5),
  },
  counterHolder: {
    marginTop: moderateScale(5),
    height: verticalScale(20),
    marginHorizontal: moderateScale(-5),
    borderColor: BLUE,
    borderWidth: 1,
  },
  buttonTextStyle: {
    color: BLUE,
    marginBottom: moderateScale(5),
  },
  countTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: moderateScale(8),
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

const NumericCountCard = props => {
  const {
    required,
    showBorder,
    solidBorder,
    dashedBorder,
    cardIcon,
    title,
    description,
    count,
    onCountChange,
    ...rest
  } = props;

  const onChange = (number, type) => {
    console.log(number, type); // 1, + or -
    onCountChange(number);
  };

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
              <Counter
                buttonStyle={styles.counterHolder}
                buttonTextStyle={styles.buttonTextStyle}
                countTextStyle={styles.countTextStyle}
                start={count}
                onChange={onChange}
              />
            )}
          />
        </Surface>
      </Inset>
    </View>
  );
};

NumericCountCard.defaultProps = {
  align: 'center',
  cardContentProps: {},
};

NumericCountCard.propTypes = {
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
export default NumericCountCard;
