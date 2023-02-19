import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useCustomTheme } from '../theme/Default/theme';

interface StyledButtonProps {
  title: string;
  onPress: () => void;
  testID: string;
}

export const StyledButton = (props: StyledButtonProps) => {
  const { colors, fontSizes } = useCustomTheme();
  const { title, onPress, testID } = props;

  return (
    <Pressable
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? colors.bgGray100 : colors.background,
          borderColor: colors.borderGray300,
          ...styles.container,
        },
      ]}
    >
      {({ pressed }) => (
        <Text style={{ color: colors.textGray700, fontSize: fontSizes.middle }}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
});
