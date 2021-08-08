import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import DraggablePanel from 'react-native-draggable-panel';
import { Inset, Stack } from 'react-native-spacing-system';
import HTML from 'react-native-render-html';
import { CloseButton } from '_atoms';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  titleWrapper: {
    borderBottomColor: '#6f99bf',
    borderBottomWidth: 2,
  },
  title: {
    fontWeight: 'bold',
    color: '#366999',
    fontSize: scale(18),
    marginBottom: 10,
  },
  body: {
    fontSize: scale(12),
    fontWeight: 'bold',
  },
  bodyWrapper: {
    marginBottom: 50,
  },
});

const FullScreenPanel = props => {
  const {
    isHTML,
    panelHeader,
    panelBody,
    displayPanel,
    onPanelDismiss,
  } = props;

  const contentWidth = useWindowDimensions().width;

  return (
    <View>
      <DraggablePanel
        visible={displayPanel}
        onDismiss={onPanelDismiss}
        initialHeight={verticalScale(1000)}
        expandable>
        <CloseButton onPress={onPanelDismiss} />
        <Inset all={16}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{panelHeader}</Text>
          </View>
          <Stack size={12} />

          <ScrollView
            style={styles.bodyWrapper}
            showsVerticalScrollIndicator={false}>
            {isHTML ? (
              <HTML source={{ html: panelBody }} contentWidth={contentWidth} />
            ) : (
              <Text style={styles.body}>{panelBody}</Text>
            )}
          </ScrollView>
        </Inset>
      </DraggablePanel>
    </View>
  );
};
export default FullScreenPanel;
