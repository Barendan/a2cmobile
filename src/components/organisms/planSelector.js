import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Avatar, Card, IconButton, Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Inset, Stack } from 'react-native-spacing-system';
import { useTranslation } from 'react-i18next';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// import { PreferencesContext } from '_context';
import { updatePlan } from '_store/plan';
import { CloseButton } from '_atoms';
import { DraggablePanel } from '_molecules';

const styles = StyleSheet.create({
  touchableContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 2,
    padding: moderateScale(16),
  },
  touchableText: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  selectedTouchableText: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#366999',
  },
  titleWrapper: {
    borderBottomColor: '#6f99bf',
    borderBottomWidth: 2,
  },
  title: {
    fontWeight: 'bold',
    color: '#366999',
    fontSize: scale(18),
    marginBottom: moderateScale(10),
  },
});

const PlanSelector = props => {
  const { user } = useSelector(state => state.user);
  const { plan, memberPlans } = useSelector(state => state.plan);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { displayPanel, onPanelDismiss } = props;

  return (
    <View>
      <DraggablePanel
        visible={displayPanel}
        onDismiss={onPanelDismiss}
        initialHeight={verticalScale(1000)}
        expandable
      >
        <CloseButton onPress={onPanelDismiss} fixStyle/>
        <Inset all={moderateScale(16)}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{t('change_plan')}</Text>
          </View>

          {/* {console.log(memberPlans)} */}


          {memberPlans.map(currentPlan => {
            
            (
            <TouchableHighlight
              key={currentPlan.NETMember_ID}
              onPress={() => {
                dispatch(updatePlan(currentPlan));
                onPanelDismiss();
              }}
            >

              <View
                style={{
                  marginLeft: moderateScale(-12),
                }}>
                {/* <Text style={plan.NETMember_ID === currentPlan.NETMember_ID ? styles.selectedTouchableText : styles.touchableText}>{currentPlan.contractName} ({currentPlan.NETMember_ID})</Text> */}

                <Card.Title
                  title={currentPlan.contractName}
                  titleStyle={{
                    fontSize: moderateScale(16),
                    marginBottom: moderateScale(-6),
                  }}
                  subtitle={
                    currentPlan.MemberID + ' (' + currentPlan.contractCode + ')'
                  }
                  subtitleStyle={{
                    fontSize: moderateScale(12),
                  }}
                  right={props =>
                    plan.NETMember_ID === currentPlan.NETMember_ID ? (
                      <IconButton
                        {...props}
                        icon="check"
                        size={moderateScale(30)}
                      />
                    ) : (
                      <></>
                    )
                  }
                />
              </View>

            </TouchableHighlight>
          )})}

        </Inset>
      </DraggablePanel>
    </View>
  );
};
export default PlanSelector;
