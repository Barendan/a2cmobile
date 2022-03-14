import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Inset, Stack } from 'react-native-spacing-system';
import RenderHTML from 'react-native-render-html';

import { CloseButton } from '_atoms';
import { DraggablePanel } from '_molecules';

const styles = StyleSheet.create({
  titleWrapper: {
    borderBottomColor: '#6f99bf',
    borderBottomWidth: 2,
  },
  title: {
    fontWeight: 'bold',
    color: '#366999',
    fontSize: moderateScale(24),
    marginBottom: moderateScale(4),
  },
  body: {
    fontWeight: 'bold',
  },
  bodyWrapper: {
    marginBottom: verticalScale(50),
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

  // const panelBodyTest = panelBody;
  const panelBodyTest = `<p>panelBody</p>`;

  const htmlTextStyle = {
    body: {
      fontSize: scale(16),
      color: 'red',
    },
  };

  return (
    <View>
      <DraggablePanel
        visible={displayPanel}
        onDismiss={onPanelDismiss}
        initialHeight={verticalScale(1000)}
        expandable
      >
        <CloseButton onPress={onPanelDismiss} fixStyle/>
        <Inset all={verticalScale(16)}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{panelHeader}</Text>
          </View>
          <Stack size={verticalScale(12)} />

          <ScrollView
            style={styles.bodyWrapper}
            showsVerticalScrollIndicator={true}>
            {isHTML ? (
              <RenderHTML
                source={{ html: panelBody }}
                contentWidth={contentWidth}
                baseStyle={{ color: 'red', margin: 50 }}
              />
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
