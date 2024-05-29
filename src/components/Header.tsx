import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../styles'

const Header: React.FC<HeaderProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bank_button} onPress={onPress}>
        <FontAwesome name="credit-card" size={theme.fontSize['md']} color={theme.color.primary.dark} />
        <Text style={styles.title}>BANCO</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.color.neutral.light
  },
  bank_button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: theme.fontSize['lg'],
    color: theme.color.primary.dark,
    fontWeight: 'bold'
  }
})