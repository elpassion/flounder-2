import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCustomTheme } from '../../theme/Default/theme';

interface Props {
  onPress: () => void;
  label: string;
  icon: string;
  isActive: boolean;
}

export const DrawerButton = (props: Props) => {
  const { colors, fontSizes, heights } = useCustomTheme();
  const { onPress, label, icon, isActive } = props;

  return (
    <TouchableHighlight
      onPress={() => onPress()}
      underlayColor={colors.bgGray700}
      style={{
        ...styles.container,
        backgroundColor: isActive ? colors.bgGray900 : 'transparent',
      }}
    >
      <View style={styles.content}>
        <Icon name={icon} size={heights.icon} color={colors.textGray300} />
        <Text
          style={{
            color: colors.textGray300,
            fontSize: fontSizes.middle,
            ...styles.text,
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 6,
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    marginLeft: 10,
    fontWeight: '500',
  },
  container: {
    borderRadius: 6,
    marginHorizontal: 10,
  },
});
