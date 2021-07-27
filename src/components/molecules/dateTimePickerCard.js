import React, { useState } from 'react';
import {
  View,
  Text,
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

import DateTimePicker from '@react-native-community/datetimepicker';

import PropTypes from 'prop-types';
import { Inset, Stack } from 'react-native-spacing-system';

// styles
import { GRAY_DARK, BLUE } from '_styles/colors';
import { scaleFont } from '_styles/mixins';

const styles = StyleSheet.create({
  surface: {
    padding: 2,
    height: 80,
    width: '100%',
    elevation: 10,
    borderWidth: 1,
    borderColor: GRAY_DARK,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  titleStyle: {
    flex: 1,
    fontSize: 17,
  },
  dateTimeHolder: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dateTimePickerHolder: {
    flex: 1,
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
  optionsHolder: {
    marginVertical: 50,
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  cardOptionsIcon: {
    backgroundColor: 'transparent',
    marginRight: -8,
  },
  requiredCard: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
  },
});

const DateTimePickerCard = props => {
  const {
    required,
    showBorder,
    solidBorder,
    dashedBorder,
    cardIcon,
    title,
    description,
    minimumDate,
    dateValue,
    timeValue,
    onDateTimeChange,
    ...rest
  } = props;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [selectedValue, setSelectedValue] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    onDateTimeChange('datetime', currentDate.toISOString());
    if (mode === 'date') {
      setSelectedValue(
        (currentDate.getMonth() > 8
          ? currentDate.getMonth() + 1
          : '0' + (currentDate.getMonth() + 1)) +
          '/' +
          (currentDate.getDate() > 9
            ? currentDate.getDate()
            : '0' + currentDate.getDate()) +
          '/' +
          currentDate.getFullYear(),
      );
    }

    if (mode === 'time') {
      setSelectedValue(currentDate.toLocaleTimeString('en-US'));
    }
  };

  React.useEffect(() => {
    onDateTimeChange(mode, selectedValue);
  }, [selectedValue]);

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
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
          {!show && (
            <List.Item
              title={title + (required ? '*' : '')}
              description={description}
              descriptionNumberOfLines={2}
              left={props => (
                <Avatar.Icon
                  {...props}
                  size={40}
                  color="black"
                  icon={cardIcon}
                  style={styles.cardIcon}
                />
              )}
              right={props => (
                <View style={styles.optionsHolder}>
                  <TouchableHighlight onPress={() => showMode('date')}>
                    <Avatar.Icon
                      {...props}
                      size={40}
                      color={BLUE}
                      icon={'calendar'}
                      style={styles.cardOptionsIcon}
                    />
                  </TouchableHighlight>
                  <TouchableHighlight onPress={() => showMode('time')}>
                    <Avatar.Icon
                      {...props}
                      size={40}
                      color={BLUE}
                      icon={'clock'}
                      style={styles.cardOptionsIcon}
                    />
                  </TouchableHighlight>
                </View>
              )}
            />
          )}
          {show && (
            <View style={styles.dateTimeHolder}>
              <Text style={styles.titleStyle}>
                {mode === 'date' ? t('select_date') : t('select_time')}
              </Text>
              <View style={styles.dateTimePickerHolder}>
                <DateTimePicker
                  width={100}
                  testID="dateTimePicker"
                  minimumDate={minimumDate}
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              </View>
            </View>
          )}
        </Surface>
      </Inset>
    </View>
  );
};

DateTimePickerCard.defaultProps = {
  align: 'center',
  cardContentProps: {},
};

DateTimePickerCard.propTypes = {
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
  description: PropTypes.object,
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
export default DateTimePickerCard;
