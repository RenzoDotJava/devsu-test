import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../styles';

const ProductRow: React.FC<ProductRowProps> = ({ product, position, onPress }) => {

  const getRowStyle = () => {
    switch (position) {
      case 'top':
        return StyleSheet.compose(styles.row, styles.top_row)
      case 'bottom':
        return StyleSheet.compose(styles.row, styles.bottom_row)
      case 'both':
        return StyleSheet.compose(styles.row, [styles.top_row, styles.bottom_row])
      default:
        return styles.row
    }
  }

  return (
    <TouchableOpacity testID={'product-row-' + product.id} style={getRowStyle()} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.product_name}>{product.name}</Text>
        <Text style={styles.product_id}>ID: {product.id}</Text>
      </View>
      <AntDesign name="right" size={theme.fontSize.sm} color={theme.color.neutral.medium} />
    </TouchableOpacity>
  )
}

export default ProductRow

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 14,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: theme.color.neutral.light,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  top_row: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  bottom_row: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomWidth: 1
  },
  content: {
    gap: 2
  },
  product_name: {
    fontSize: theme.fontSize.md,
  },
  product_id: {
    fontSize: theme.fontSize.sm,
    color: theme.color.neutral.medium,
    fontWeight: '500'
  }
})