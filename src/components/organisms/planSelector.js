import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from "react-native-spacing-system";
import { useTranslation } from "react-i18next";
import { Avatar, Card, IconButton, Divider } from 'react-native-paper';
import { PreferencesContext } from '_context';
import { CloseButton } from '_atoms'
import { useDispatch, useSelector } from 'react-redux';
import { updatePlan } from '_store/plan';

// styles
import { WHITE } from '_styles/colors';
import { scaleFont } from '_styles/mixins';

const styles = StyleSheet.create({
    touchableContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 2,
        padding: 16,
    },
    touchableText: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
    },
    selectedTouchableText: {
        fontSize: scaleFont(18),
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
        fontSize: 18,
        marginBottom: 10,
    }
});


const PlanSelector = (props) => {

    const { user } = useSelector(state => state.user);
    const { plan, memberPlans } = useSelector(state => state.plan);

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const {
        displayPanel,
        onPanelDismiss
    } = props;


    return (
        <View>
            <DraggablePanel
                visible={displayPanel}
                onDismiss={onPanelDismiss}
                expandable
            >
                <CloseButton
                    onPress={onPanelDismiss}
                />
                <Inset all={16}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{t('change_plan')}</Text>
                    </View>

                    <Stack size={12} />
                    {memberPlans.map(currentPlan => (
                        <TouchableHighlight key={currentPlan.NETMember_ID} onPress={() => {
                            dispatch(updatePlan(currentPlan))
                            onPanelDismiss();
                        }}>
                            <>
                                {/* <Text style={plan.NETMember_ID === currentPlan.NETMember_ID ? styles.selectedTouchableText : styles.touchableText}>{currentPlan.contractName} ({currentPlan.NETMember_ID})</Text> */}

                                <Card.Title
                                    title={currentPlan.contractName}
                                    subtitle={currentPlan.MemberID + ' (' + currentPlan.contractCode + ')'}
                                    right={(props) => plan.NETMember_ID === currentPlan.NETMember_ID ? <IconButton {...props} icon="check" /> : <></>}
                                />

                            </>
                        </TouchableHighlight>
                    ))}
                </Inset>

            </DraggablePanel>
        </View>
    );
}
export default PlanSelector;