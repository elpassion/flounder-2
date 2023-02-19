import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { PageContainer } from '../components';
import { exampleUser } from '@flounder/contracts';

export const WelcomeScreen = () => {
  return (
    <PageContainer>
      <Text style={styles.title}>{'Welcome to Flounder! :))'}</Text>
      <Text
        style={styles.title}
      >{`${exampleUser.first_name} ${exampleUser.last_name} :))`}</Text>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontSize: 30,
  },
});
