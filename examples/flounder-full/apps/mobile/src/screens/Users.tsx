import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { PageContainer } from '../components';

export const UsersScreen = () => {
  return (
    <PageContainer>
      <Text style={styles.title}>{'Users'}</Text>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontSize: 30,
  },
});
