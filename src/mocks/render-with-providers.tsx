import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { render } from '@testing-library/react-native';
import ProductProvider from '../context/ProductContext'

export const queryClient = new QueryClient();

export const renderWithProviders = (children: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        {children}
      </ProductProvider>
    </QueryClientProvider>
  )
}