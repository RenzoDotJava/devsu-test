import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import { ProductForm, Wrapper } from '@/components'
import { productService } from '@/services/product.service';
import { useProduct } from '@/context/ProductContext';

type EditProductScreenRouteProp = RouteProp<RootStackParamList, 'EditProduct'>;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProduct'>;

const EditProduct = () => {
  const navigation = useNavigation<NavigationProp>();
  const { editProduct } = useProduct()
  const { params: { product } } = useRoute<EditProductScreenRouteProp>()

  const { mutate, isPending } = useMutation({
    mutationKey: ['edit_product'],
    mutationFn: async (data: Product) => productService.editProduct(product.id, data),
    onSuccess: (product) => {
      editProduct(product)
      navigation.navigate('ProductList')
    }
  })

  const handleSubmit = (product: Product) => mutate(product)

  return (
    <Wrapper>
      <ProductForm product={product} action={handleSubmit} isLoading={isPending} />
    </Wrapper>
  )
}

export default EditProduct