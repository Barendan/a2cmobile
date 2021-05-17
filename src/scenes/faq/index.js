import React, {useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import styles from './styles';
import FaqList from '_molecules/FAQ/FaqList';
import {Input} from '@ui-kitten/components';
import Fuse from 'fuse.js';

const data = [
  {id: 1, question: 'Question 1', answer: 'Answer 1'},
  {id: 2, question: 'Question 2', answer: 'Answer 2'},
  {id: 3, question: 'Question 3', answer: 'Answer 3'},
  {id: 4, question: 'Question 4', answer: 'Answer 4'},
  {id: 5, question: 'Question 5', answer: 'Answer 5'},
];

const options = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: ['question', 'answer'],
};

const FaqScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('Question 1');

  const fuse = new Fuse(data, options);
  const result = fuse.search(searchTerm);

  console.log('search: ', result);

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
          onChange={e => setSearchTerm(e.target.value)}
        />
      </View>

      <FaqList data={data} />
    </SafeAreaView>
  );
};

export default FaqScreen;
