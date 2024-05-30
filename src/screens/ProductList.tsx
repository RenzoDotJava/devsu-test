import React, { useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { EmptyList, ProductRow, Wrapper } from '../components'
import { Button, Input } from '../ui'
import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/product.service'
import { useProduct } from '../context/ProductContext'
import { theme } from '../styles'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductList'>;

const ProductList = () => {
  const navigation = useNavigation<NavigationProp>()
  const { products, setProducts } = useProduct()
  const [query, setQuery] = useState('')

  const { isLoading, refetch } = useQuery({
    queryKey: ['get_products'],
    queryFn: async () => {
      const data = await productService.getProducts()
      setProducts(data)
      return data
    }
  })

  const filteredProducts = products.filter((product: Product) => product.name.toLowerCase().includes(query.toLowerCase()) || product.id.toLowerCase().includes(query.toLowerCase()))

  const handleChangeQuery = (text: string) => setQuery(text)

  const renderItem = ({ item, index }: { item: Product, index: number }) => {
    const position = filteredProducts.length === 1 ? 'both' : index === 0 ? 'top' : index === filteredProducts.length - 1 ? 'bottom' : 'middle'

    return <ProductRow product={item} position={position} onPress={() => navigation.navigate('ProductDetail', { id: item.id })} />
  }

  return (
    <Wrapper>
      <Input testId='input-search' placeholder='Search...' value={query} onChangeText={handleChangeQuery} />
      <FlatList
        style={styles.list}
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => renderItem({ item, index })}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            colors={[theme.color.primary.dark]}
            tintColor={theme.color.primary.dark}
          />
        }
        ListEmptyComponent={<EmptyList text='No hay productos que mostrar' />}
      />
      <Button testId='add-product-navigator' text="Agregar" variant='secondary' onPress={() => navigation.navigate('AddProduct')} />
    </Wrapper>
  )
}

export default ProductList

const styles = StyleSheet.create({
  list: {
    marginTop: 36,
    marginBottom: 24
  }
});