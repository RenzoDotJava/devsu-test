import React, { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { products } from 'mocks/products'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { ProductRow, Wrapper } from '@/components'
import { Button, Input } from '@/ui'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductList'>;

const ProductList = () => {
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = useState('')

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()) || product.id.toLowerCase().includes(query.toLowerCase()))

  const handleChangeQuery = (text: string) => setQuery(text)

  const renderItem = ({ item, index }: { item: Product, index: number }) => {
    const position = filteredProducts.length === 1 ? 'both' : index === 0 ? 'top' : index === filteredProducts.length - 1 ? 'bottom' : 'middle'

    return <ProductRow product={item} position={position} onPress={() => navigation.navigate('ProductDetail')} />
  }

  return (
    <Wrapper>
      <Input placeholder='Search...' value={query} onChangeText={handleChangeQuery} />
      <FlatList
        style={styles.list}
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => renderItem({ item, index })}
      />
      <Button text="Agregar" variant='secondary' />
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