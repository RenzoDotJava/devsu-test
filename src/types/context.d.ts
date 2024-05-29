type ProductContextProps = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
  deleteProductById: (id: string) => void;
}