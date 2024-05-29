import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useMutation, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { DeleteProductSheet, Wrapper } from '@/components'
import { Button } from '@/ui'
import { theme } from '@/styles'
import useToggle from '@/hooks/useToogle'
import { productService } from '@/services/product.service'
import { useProduct } from '@/context/ProductContext'

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

const ProductDetail = () => {
  const navigation = useNavigation<NavigationProp>();
  const { params: { id } } = useRoute<ProductDetailScreenRouteProp>()
  const { isOpen, toggler } = useToggle()
  const { deleteProductById } = useProduct()

  const { data: product, isLoading } = useQuery({
    queryKey: ['get_product', id],
    queryFn: async () => productService.getProductById(id)
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['delete_product', id],
    mutationFn: async () => productService.deleteProduct(id),
    onSuccess: () => {
      deleteProductById(id)
      toggler()
      navigation.navigate('ProductList')
    }
  })

  return (
    <>
      <Wrapper isLoading={isLoading}>
        {product ?
          <>
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
                <Text style={styles.form_info}>{format(new Date(product.date_release), 'dd/MM/yyyy')}</Text>
              </View>
              <View style={styles.form_section}>
                <Text style={styles.label}>Fecha de revisión:</Text>
                <Text style={styles.form_info}>{format(new Date(product.date_revision), 'dd/MM/yyyy')}</Text>
              </View>
            </View>
            <View style={styles.actions}>
              <Button text="Editar" onPress={() => navigation.navigate('EditProduct', { product })} />
              <Button text="Eliminar" variant='error' onPress={toggler} />
            </View>
          </> : null}
      </Wrapper>
      {product &&
        <DeleteProductSheet
          isOpen={isOpen}
          isLoading={isPending}
          onConfirm={() => mutate()}
          onClose={toggler}
          product={product} />
      }
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