import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../styles'

const EmptyList: React.FC<EmptyListProps> = ({ text = '' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: theme.fontSize.md,
    color: theme.color.neutral.dark,
    fontWeight: '500'
  }
})