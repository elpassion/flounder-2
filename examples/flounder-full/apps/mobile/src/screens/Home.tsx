import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { PageContainer } from '../components';
import { useUsers } from '../services/user';

export const HomeScreen = () => {
  const { getCurrentUser } = useUsers();

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <PageContainer>
      <Text style={styles.title}>{'Welcome to Flounder! :))'}</Text>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontSize: 20,
  },
});
