import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { useCustomTheme } from '../../theme/Default/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCustomNavigation } from '../../hooks';

export const CloseIcon = () => {
  const { colors, heights } = useCustomTheme();
  const { closeMenu } = useCustomNavigation();
  const insets = useSafeAreaInsets();

  const strokeWidth = 3;

  return (
    <TouchableOpacity
      style={{
        width: heights.iconBig,
        height: heights.iconBig,
        right: -heights.iconBig,
        ...styles.container,
        top: insets.top,
      }}
      onPress={() => {
        closeMenu();
      }}
      testID={'closeIconButtonTestID'}
    >
      <Svg
        height={heights.iconBig}
        width={heights.iconBig}
        viewBox="0 0 100 100"
      >
        <Circle
          cx="50"
          cy="50"
          r={heights.iconBig / 2}
          fill="none"
          strokeWidth={strokeWidth}
          stroke={colors.background}
        />
        <Line
          x1="35"
          y1="35"
          x2="65"
          y2="65"
          stroke={colors.textBlue400}
          strokeWidth={strokeWidth}
        />
        <Line
          x1="65"
          y1="35"
          x2="35"
          y2="65"
          stroke={colors.textBlue400}
          strokeWidth={strokeWidth}
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
