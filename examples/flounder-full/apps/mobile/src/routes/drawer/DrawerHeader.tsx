import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { useCustomTheme } from '../../theme/Default/theme';

export const DrawerHeader = () => {
  const { colors, heights, fontSizes, images } = useCustomTheme();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.bgGray900,
        height: heights.header,
      }}
    >
      <Image
        source={images.fish}
        style={{ height: heights.logo, width: heights.logo }}
      />
      <Text
        style={{
          ...styles.titleStyle,
          fontSize: fontSizes.big,
          color: colors.textBlue300,
        }}
      >
        {'FLOUNDER'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titleStyle: {
    marginLeft: 20,
  },
});
