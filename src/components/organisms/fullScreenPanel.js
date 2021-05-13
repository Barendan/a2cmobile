import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from "react-native-spacing-system";
import HTML from "react-native-render-html";
import { CloseButton } from '_atoms'

// styles
import { WHITE } from '_styles/colors';
import { scaleFont } from '_styles/mixins';

const styles = StyleSheet.create({
    titleWrapper: {
        borderBottomColor: '#6f99bf',
        borderBottomWidth: 2,
    },
    title: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18,
        marginBottom: 10,
    },
    body: {
        fontSize: scaleFont(12),
        fontWeight: 'bold',
    },
    bodyWrapper: {
        marginBottom: 50
    }
});


const FullScreenPanel = (props) => {

    const {
        isHTML,
        panelHeader,
        panelBody,
        displayPanel,
        onPanelDismiss
    } = props;

    const contentWidth = useWindowDimensions().width;


    return (
        <View>
            <DraggablePanel
                visible={displayPanel}
                onDismiss={onPanelDismiss}
                initialHeight={800}
                expandable
            >
                <CloseButton
                    onPress={onPanelDismiss}
                />
                <Inset all={16}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{panelHeader}</Text>
                    </View>
                    <Stack size={12} />

                    <ScrollView style={styles.bodyWrapper} showsVerticalScrollIndicator={false}>
                        {isHTML ? <HTML source={{ html: panelBody }} contentWidth={contentWidth} /> : <Text style={styles.body}>{panelBody}</Text>}
                    </ScrollView>

                </Inset>

            </DraggablePanel>
        </View>
    );
}
export default FullScreenPanel;