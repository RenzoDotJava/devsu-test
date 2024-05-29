import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductProvider from './src/context/ProductContext';
import Navigator from './src';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <Navigator />
      </ProductProvider>
    </QueryClientProvider>
  );
}
