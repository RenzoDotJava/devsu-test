import { theme } from '@/styles';
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button: React.FC<ButtonProps> = ({
  text,
  disabled = false,
  loading = false,
  variant = 'primary',
  onPress
}) => {

  return (
    <TouchableOpacity
      style={StyleSheet.compose(styles.button, styles[`button_${variant}`])}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {!loading ? (
        <Text
          style={StyleSheet.compose(styles.text, styles[`text_${variant}`])}
        >
          {text}
        </Text>
      ) : (
        <ActivityIndicator color={theme.color.neutral.light} />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: 14,
  },
  button_primary: {
    backgroundColor: theme.color.primary.light
  },
  button_secondary: {
    backgroundColor: theme.color.secondary
  },
  button_error: {
    backgroundColor: theme.color.error
  },
  text: {
    textAlign: 'center',
    fontSize: theme.fontSize.sm,
    fontWeight: 'bold',
  },
  text_primary: {
    color: theme.color.primary.dark
  },
  text_secondary: {
    color: theme.color.primary.dark
  },
  text_error: {
    color: theme.color.neutral.lightest
  }
});