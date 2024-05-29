import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { ProductForm, Wrapper } from '@/components'
import { productService } from '@/services/product.service'
import { useProduct } from '@/context/ProductContext'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddProduct'>;

const AddProduct = () => {
  const navigation = useNavigation<NavigationProp>();
  const { addProduct } = useProduct()

  const { mutate, isPending } = useMutation({
    mutationKey: ['add_product'],
    mutationFn: async (product: Product) => productService.addProduct(product),
    onSuccess: (product) => {
      addProduct(product)
      navigation.navigate('ProductList')
    }
  })

  const handleSubmit = (product: Product) => mutate(product)

  return (
    <Wrapper>
      <ProductForm action={handleSubmit} isLoading={isPending} />
    </Wrapper>
  )
}

export default AddProduct