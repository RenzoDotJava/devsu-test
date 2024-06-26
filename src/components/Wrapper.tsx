import React from 'react'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SafeAreaView } from "react-native-safe-area-context";
import Header from './Header'
import { theme } from '../styles'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Wrapper: React.FC<WrapperProps> = ({ children, isLoading = false, error = null }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.flexible}>
      <Header onPress={() => navigation.navigate('ProductList')} />
      <View style={StyleSheet.compose(styles.flexible, styles.container)}>
        {!isLoading ?
          !error ? children :
            <View style={styles.error_container}>
              <Text style={styles.error_title}>Error</Text>
              <Text style={styles.error_message}>{error}</Text>
            </View>
          :
          <View style={styles.loading}>
            <ActivityIndicator color={theme.color.primary.dark} size={60} />
            <Text style={styles.loading_text}>
              Cargando
            </Text>
          </View>
        }
      </View>
    </SafeAreaView>

  )
}

export default Wrapper

const styles = StyleSheet.create({
  flexible: {
    flex: 1
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: theme.color.neutral.lightest,
  },
  loading: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading_text: {
    color: theme.color.neutral.dark,
    marginTop: 10,
    fontSize: theme.fontSize.lg
  },
  error_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  error_title: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: '500'
  },
  error_message: {
    fontSize: theme.fontSize.md
  }
})