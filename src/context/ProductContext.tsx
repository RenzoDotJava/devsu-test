import { createContext, useContext, useState } from "react";

const ProductContext = createContext<ProductContextProps>({
  products: [],
  setProducts: () => { },
  addProduct: () => { },
  editProduct: () => { },
  deleteProductById: () => { }
});

export const useProduct = () => {
  return useContext(ProductContext)
};

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])

  const addProduct = (product: Product) => setProducts([...products, product])

  const editProduct = (product: Product) => setProducts(products.map(p => p.id === product.id ? product : p))

  const deleteProductById = (id: string) => setProducts(products.filter(product => product.id !== id))

  return (
    <ProductContext.Provider value={{ products, setProducts, addProduct, editProduct, deleteProductById }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;