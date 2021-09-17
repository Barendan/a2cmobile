import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Surface, List } from 'react-native-paper';
import { Inset, Stack } from 'react-native-spacing-system';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

import { BLUE, GRAY_DARK, GRAY_LIGHT } from '_styles/colors';
import { GRAY_MEDIUM } from '_styles';

const styles = StyleSheet.create({
  surface: {
    height: verticalScale(200),
    width: '100%',
    borderWidth: 1,
    borderColor: GRAY_DARK,
    borderRadius: 10,
    padding: moderateScale(8),
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
  titleStyle: {
    fontSize: moderateScale(16),
    marginBottom: moderateScale(10),
  },
  textInputStyleClass: {
    padding: 10,
    textAlign: 'left',
    height: verticalScale(120),
    fontSize: moderateScale(12),
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
