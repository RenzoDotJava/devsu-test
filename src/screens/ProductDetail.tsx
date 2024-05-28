import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { DeleteProductSheet, Wrapper } from '@/components'
import { Button } from '@/ui'
import { product } from 'mocks/product'
import { theme } from '@/styles'
import { parseDate } from '@/utils'
import useToggle from '@/hooks/useToogle'

const ProductDetail = () => {
  const { isOpen, toggler } = useToggle()
  return (
    <>
      <Wrapper>
        <View>
          <Text style={styles.product_id}>ID: {product.id}</Text>
          <Text style={styles.label}>Información extra</Text>
        </View>
        <View style={styles.info_container}>
          <View style={styles.form_section}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.form_info}>{product.name}</Text>
          </View>
          <View style={styles.form_section}>
            <Text style={styles.label}>Descripción:</Text>
            <Text style={styles.form_info}>{product.description}</Text>
          </View>
          <View style={{ flexDirection: 'column', gap: 4 }}>
            <Text style={styles.label}>Logo</Text>
            <View style={styles.logo_container}>
              <Image
                source={{
                  uri: product.logo,
                }}
                style={styles.logo}
                resizeMode='contain'
              />
            </View>
          </View>
          <View style={styles.form_section}>
            <Text style={styles.label}>Fecha de lanzamiento:</Text>
            <Text style={styles.form_info}>{parseDate(product.date_release)}</Text>
          </View>
          <View style={styles.form_section}>
            <Text style={styles.label}>Fecha de revisión:</Text>
            <Text style={styles.form_info}>{parseDate(product.date_revision)}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <Button text="Editar" />
          <Button text="Eliminar" variant='error' onPress={toggler} />
        </View>
      </Wrapper>
      <DeleteProductSheet isOpen={isOpen} onClose={toggler} product={product} />
    </>

  )
}

export default ProductDetail

const styles = StyleSheet.create({
  label: {
    fontSize: theme.fontSize.sm,
    color: theme.color.neutral.medium,
    fontWeight: '500',
  },
  product_id: {
    fontSize: theme.fontSize['xl'],
    color: theme.color.neutral.dark,
    fontWeight: 'bold',
  },
  info_container: {
    marginTop: 52,
    paddingHorizontal: 12,
    flex: 1,
    gap: 12,
  },
  form_section: {
    flexDirection: 'row',
  },
  form_info: {
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
    fontWeight: '500',
    color: theme.color.neutral.dark,
  },
  logo_container: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 180,
    height: 90,
  },
  actions: {
    gap: 12
  },
});