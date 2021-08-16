import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { Inset, Stack } from 'react-native-spacing-system';
import { useTranslation } from 'react-i18next';
import {
  Input,
  Layout,
  Select,
  SelectItem,
  Button,
} from '@ui-kitten/components';
import Spinner from 'react-native-spinkit';
import { useDispatch, useSelector } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { DismissKeyboardAwareScrollView } from '_atoms';
import { MemberService, AppInfoService } from '_services';
import { update } from '_store/user';
import { APP_COLOR } from '_styles/colors';

const SecuritySettings = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const [loading, setLoading] = React.useState(false);
  const [disableSubmit, setDisableSubmit] = React.useState(true);
  // const [errorMessage, setErrorMessage] = React.useState(false);

  const [securityQuestions, setSecurityQuestions] = React.useState([]);

  const [selectedQuestion, setSelectedQuestion] = React.useState({
    questionOneIndex: 0,
    questionOne: '',
    questionOneAnswer: '',
    questionTwoIndex: 0,
    questionTwo: '',
    questionTwoAnswer: '',
    questionThreeIndex: 0,
    questionThree: '',
    questionThreeAnswer: '',
  });

  const updateSelectedQuestion = React.useCallback((key, value) => {
    setSelectedQuestion(selectedQuestion => {
      return {
        ...selectedQuestion,
        [key]: value,
      };
    });
  }, []);

  //on page load
  React.useEffect(() => {
    getSecurityQuestions();
  }, []);

  const getSecurityQuestions = () => {
    setLoading(true);
    AppInfoService.getSecurityQuestions()
      .then(data => {
        setLoading(false);
        setSecurityQuestions(data.securityQuestions);
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    const selectedQuestionOne =
      securityQuestions[selectedQuestion.questionOneIndex - 1];
    const selectedQuestionTwo =
      securityQuestions[selectedQuestion.questionTwoIndex - 1];
    const selectedQuestionThree =
      securityQuestions[selectedQuestion.questionThreeIndex - 1];

    updateSelectedQuestion(
      'questionOne',
      selectedQuestionOne ? selectedQuestionOne.SecurityQuestion : '',
    );
    updateSelectedQuestion(
      'questionTwo',
      selectedQuestionTwo ? selectedQuestionTwo.SecurityQuestion : '',
    );
    updateSelectedQuestion(
      'questionThree',
      selectedQuestionThree ? selectedQuestionThree.SecurityQuestion : '',
    );
  }, [
    selectedQuestion.questionOneIndex,
    selectedQuestion.questionTwoIndex,
    selectedQuestion.questionThreeIndex,
  ]);

  React.useEffect(() => {
    const unique = [
      ...new Set(
        [
          selectedQuestion.questionOne,
          selectedQuestion.questionTwo,
          selectedQuestion.questionThree,
        ].map(item => item.length > 0),
      ),
    ];

    if (
      selectedQuestion.questionOne.length > 0 &&
      selectedQuestion.questionTwo.length > 0 &&
      selectedQuestion.questionThree.length > 0
    ) {
      setDisableSubmit(false);
    }
  }, [
    selectedQuestion.questionOne,
    selectedQuestion.questionTwo,
    selectedQuestion.questionThree,
  ]);

  const updateSecurityQuestion = () => {
    var payload = {
      id: user.id,
      SecurityQuestionOne: selectedQuestion.questionOne,
      SecurityAnswerOne: selectedQuestion.questionOneAnswer,
      SecurityQuestionTwo: selectedQuestion.questionTwo,
      SecurityAnswerTwo: selectedQuestion.questionTwoAnswer,
      SecurityQuestionThree: selectedQuestion.questionThree,
      SecurityAnswerThree: selectedQuestion.questionThreeAnswer,
    };

    setLoading(true);
    MemberService.updateUser(payload)
      .then(data => {
        setLoading(false);
        this.dropDownAlertRef.alertWithType(
          'success',
          t('success_text'),
          t('security_settings_updated'),
        );
        updateCurrentUserRecord();
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  //update member record
  const updateCurrentUserRecord = () => {
    //setLoading(true);
    MemberService.getUserRecord(user.id)
      .then(data => {
        //setLoading(false);
        dispatch(update(data.user));
      })
      .catch(err => {
        //alert(err)
        //setLoading(false);
      });
  };

  return (
    <SafeAreaView>
      <Inset vertical={verticalScale(16)}>
        <DismissKeyboardAwareScrollView>
          <Inset horizontal={verticalScale(16)}>
            <Text style={{ fontSize: scale(10) }}>
              {t('security_questions_text')}
            </Text>
          </Inset>
          <Stack size={verticalScale(16)} />

          <Spinner
            isVisible={loading}
            size={50}
            type={'ThreeBounce'}
            color={APP_COLOR}
          />

          <View style={{ height: '100%' }}>
            <Layout key={'questionOne'} level="1">
              <Inset
                horizontal={verticalScale(16)}
                vertical={verticalScale(16)}>
                <Stack size={verticalScale(16)} />

                <Select
                  label={() => (
                    <Text style={styles.inputLabel}>{t('question_one')}</Text>
                  )}
                  value={selectedQuestion.questionOne}
                  placeholder={() => (
                    <Text style={styles.inputPlaceholder}>
                      {t('select_option')}
                    </Text>
                  )}
                  selectedIndex={selectedQuestion.questionOneIndex}
                  onSelect={index =>
                    updateSelectedQuestion('questionOneIndex', index)
                  }>
                  {securityQuestions.map((value, index) => {
                    return (
                      <SelectItem
                        key={index}
                        title={() => (
                          <Text style={styles.inputText}>
                            {value.SecurityQuestion}
                          </Text>
                        )}
                      />
                    );
                  })}
                </Select>

                <Stack size={verticalScale(10)} />

                <Input
                  placeholder={t('question_one_answer')}
                  value={selectedQuestion.questionOneAnswer}
                  onChangeText={nextValue =>
                    updateSelectedQuestion('questionOneAnswer', nextValue)
                  }
                  textStyle={styles.inputText}
                />
              </Inset>
            </Layout>

            <Layout key={'questionTwo'} style={styles.container} level="1">
              <Inset
                horizontal={verticalScale(16)}
                vertical={verticalScale(16)}>
                <Select
                  label={() => (
                    <Text style={styles.inputLabel}>{t('question_two')}</Text>
                  )}
                  value={selectedQuestion.questionTwo}
                  placeholder={() => (
                    <Text style={styles.inputPlaceholder}>
                      {t('select_option')}
                    </Text>
                  )}
                  selectedIndex={selectedQuestion.questionTwoIndex}
                  onSelect={index =>
                    updateSelectedQuestion('questionTwoIndex', index)
                  }>
                  {securityQuestions.map((value, index) => {
                    return (
                      <SelectItem
                        key={index}
                        title={() => (
                          <Text style={styles.inputText}>
                            {value.SecurityQuestion}
                          </Text>
                        )}
                      />
                    );
                  })}
                </Select>
                <Stack size={verticalScale(10)} />
                <Input
                  placeholder={t('question_two_answer')}
                  value={selectedQuestion.questionTwoAnswer}
                  onChangeText={nextValue =>
                    updateSelectedQuestion('questionTwoAnswer', nextValue)
                  }
                  textStyle={styles.inputText}
                />
              </Inset>
            </Layout>

            <Layout key={'questionThree'} style={styles.container} level="1">
              <Inset
                horizontal={verticalScale(16)}
                vertical={verticalScale(16)}>
                <Select
                  label={() => (
                    <Text style={styles.inputLabel}>{t('question_three')}</Text>
                  )}
                  value={selectedQuestion.questionThree}
                  placeholder={() => (
                    <Text style={styles.inputPlaceholder}>
                      {t('select_option')}
                    </Text>
                  )}
                  selectedIndex={selectedQuestion.questionThreeIndex}
                  textStyle={styles.inputText}
                  onSelect={index =>
                    updateSelectedQuestion('questionThreeIndex', index)
                  }>
                  {securityQuestions.map((value, index) => {
                    return (
                      <SelectItem
                        key={index}
                        title={() => (
                          <Text style={styles.inputText}>
                            {value.SecurityQuestion}
                          </Text>
                        )}
                      />
                    );
                  })}
                </Select>
                <Stack size={verticalScale(10)} />
                <Input
                  placeholder={t('question_three_answer')}
                  value={selectedQuestion.questionThreeAnswer}
                  onChangeText={nextValue =>
                    updateSelectedQuestion('questionThreeAnswer', nextValue)
                  }
                  textStyle={styles.inputText}
                />
              </Inset>
              <Stack size={verticalScale(16)} />
            </Layout>
          </View>
        </DismissKeyboardAwareScrollView>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <Button
            title={t('update')}
            size="large"
            style={styles.btn}
            disabled={disableSubmit}
            onPress={updateSecurityQuestion}>
            {t('update')}
          </Button>
        </View>
      </Inset>
      <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
  btn: {
    marginTop: 10,
  },
  inputText: {
    paddingVertical: moderateScale(2),
    fontSize: moderateScale(14),
  },
  inputLabel: {
    color: '#8F9BB3',
    paddingBottom: '0.5%',
  },
  inputPlaceholder: {
    paddingHorizontal: moderateScale(7),
    fontSize: moderateScale(14),
    color: '#8F9BB3',
  },
});

export default SecuritySettings;
