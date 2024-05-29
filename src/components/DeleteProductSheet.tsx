import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BottomSheet, Button } from '@/ui'
import { theme } from '@/styles'

const DeleteProductSheet: React.FC<DeleteProductSheetProps> = ({ isOpen, isLoading, product, onClose, onConfirm }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <View style={styles.content}>
        <Text style={styles.text}>
          ¿Estás seguro de eliminar el producto {product.name}?
        </Text>
      </View>
      <View style={styles.actions}>
        <Button text="Confirmar" variant="secondary" onPress={onConfirm} loading={isLoading} />
        <Button text="Cancelar" onPress={onClose} />
      </View>
    </BottomSheet>
  )
}

export default DeleteProductSheet

const styles = StyleSheet.create({
  content: {
    padding: 24,
    flex: 1,
    justifyContent: 'center'
  },
  actions: {
    borderTopWidth: 1,
    borderColor: theme.color.neutral.light,
    padding: 16,
    gap: 12
  },
  text: {
    textAlign: 'center',
    fontSize: theme.fontSize.md,
    fontWeight: '500',
    color: theme.color.neutral.dark
  }
})