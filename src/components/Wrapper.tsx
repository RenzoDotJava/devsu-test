import { theme } from '@/styles'
import React from 'react'
import { View, StyleSheet } from 'react-native'

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default Wrapper

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 48,
    backgroundColor: theme.color.neutral.light,
  }
})