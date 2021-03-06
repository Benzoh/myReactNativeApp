import React from 'react';
import { IconButton as PaperIconButton } from 'react-native-paper';
import { StyleSheet, ViewStyle } from 'react-native';
import { COLOR } from '../../constants/theme';
import testIDs from '../../constants/testIDs';

const styles = StyleSheet.create({
  button: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 0,
    margin: 0,
  },
});

interface Props {
  icon: string;
  onPress: () => void;
  style: ViewStyle | ViewStyle[];
  iconColor?: string;
  size?: number;
  disabled?: boolean;
  testID?: string;
}

export default function IconButton(props: Props) {
  const { icon, onPress, testID, style, iconColor = COLOR.WHITE, size = 18, disabled } = props;

  return (
    <PaperIconButton
      onPress={onPress}
      color={iconColor}
      size={size}
      style={[styles.button, style]}
      icon={icon}
      accessibilityStates={disabled ? ['disabled'] : undefined}
      testID={testID}
    />
  );
}
