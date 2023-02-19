import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { PageContainer } from '../components';

export const EmailsScreen = () => {
  return (
    <PageContainer>
      <Text style={styles.title}>{'Emails'}</Text>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontSize: 30,
  },
});
