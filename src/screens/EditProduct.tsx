import React from 'react'
import { ProductForm, Wrapper } from '@/components'
import { product } from 'mocks/product'

const EditProduct = () => {
  return (
    <Wrapper>
      <ProductForm product={product} />
    </Wrapper>
  )
}

export default EditProduct