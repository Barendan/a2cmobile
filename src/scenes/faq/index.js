import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import styles from './styles';
import FaqList from '_molecules/FAQ/FaqList';
import { Input } from '@ui-kitten/components';
import Fuse from 'fuse.js';

const data = [
  { id: 1, question: 'Apple', answer: 'Answer 1' },
  { id: 2, question: 'Orange', answer: 'Answer 2' },
  { id: 3, question: 'Kiwi', answer: 'Answer 3' },
  { id: 4, question: 'Melon', answer: 'Answer 4' },
  { id: 5, question: 'Banana', answer: 'Answer 5' },
];

const options = {
  keys: ['question'],
  threshold: 0.2,
};

const FaqScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const fuse = new Fuse(data, options);
  const query = fuse.search(searchTerm);
  const result = searchTerm === '' ? data : query.map(({ item }) => item);

  return (
    <SafeAreaView style={styles.root}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text style={styles.title} category="h1">
          FAQ
        </Text>
      </View>
      <View
        style={{
          margin: '3%',
        }}>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
      </View>

      <FaqList data={result} />
    </SafeAreaView>
  );
};

export default FaqScreen;
