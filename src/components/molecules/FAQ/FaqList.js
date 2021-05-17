import React, {useState} from 'react';
import {Drawer} from '@ui-kitten/components';
import FaqItem from './FaqItem';

const FaqList = ({data}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Drawer
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      {data.map(item => (
        <FaqItem question={item.question} answer={item.answer} key={item.id} />
      ))}
    </Drawer>
  );
};

export default FaqList;
