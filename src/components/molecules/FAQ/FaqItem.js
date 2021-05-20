import React from 'react';
import {Drawer, DrawerGroup, DrawerItem} from '@ui-kitten/components';
const FaqItem = ({id, question, answer}) => {
  return (
    <DrawerGroup title={question} key={id}>
      <DrawerItem title={answer} />
    </DrawerGroup>
  );
};

export default FaqItem;
