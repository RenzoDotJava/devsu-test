import { waitFor, screen, fireEvent } from "@testing-library/react-native";
import { renderWithProviders } from "../../mocks/render-with-providers";
import Navigator from "../../index";
import { product } from "../../mocks/product";
import { format } from "date-fns";
import { ReactTestInstance } from "react-test-renderer";

beforeEach(async () => {
  renderWithProviders(<Navigator />)

  const productButton = await screen.findByTestId('product-row-' + product.id)
  expect(productButton).toBeTruthy()
  
  await waitFor(() => {
    fireEvent.press(productButton)
  })
})

describe('ProductDetail Screen', () => {
  test('should show product information', async () => {
    expect(await screen.findByText('Información extra')).toBeTruthy();
    expect(await screen.findByText('ID: ' + product.id)).toBeTruthy();
    expect(await screen.findByText(product.name)).toBeTruthy();
    expect(await screen.findByText(product.description)).toBeTruthy();

    const logo = await screen.findByTestId('product-logo')
    expect(logo.props.source.uri).toBe(product.logo);

    expect(await screen.findByText(format(product.date_release, 'dd/MM/yyyy'))).toBeTruthy();
    expect(await screen.findByText(format(product.date_revision, 'dd/MM/yyyy'))).toBeTruthy();
  })

  describe('can open and close delete product sheet', () => {
    let deleteButton: ReactTestInstance | null = null;
    const phrase = '¿Estás seguro de eliminar el producto ' + product.name + '?';

    beforeEach(async () => {
      deleteButton = await screen.findByTestId('delete-product-sheet-button')

      fireEvent.press(deleteButton)
    })

    test('with cancel button', async () => {
      expect(screen.getByText(phrase)).toBeTruthy();

      const cancelButton = await screen.findByTestId('cancel-delete-product-button')
      expect(cancelButton).toBeTruthy()

      fireEvent.press(cancelButton)

      expect(screen.queryByText(phrase)).toBeNull();
    })

    test('with backdrop', async () => {
      expect(screen.getByText(phrase)).toBeTruthy();

      const backdrop = await screen.findByTestId('close-bottom-sheet-backdrop')
      expect(backdrop).toBeTruthy()

      fireEvent.press(backdrop)

      expect(screen.queryByText(phrase)).toBeNull();
    })

    test('with close button', async () => {
      expect(screen.getByText(phrase)).toBeTruthy();

      const closeButton = await screen.findByTestId('close-bottom-sheet-button')
      expect(closeButton).toBeTruthy()

      fireEvent.press(closeButton)

      expect(screen.queryByText(phrase)).toBeNull();
    })
  })

  test('should delete product from list', async () => {
    const deleteButton = await screen.findByTestId('delete-product-sheet-button')

    fireEvent.press(deleteButton)

    const confirmButton = await screen.findByTestId('confirm-delete-product-button')
    expect(confirmButton).toBeTruthy()

    fireEvent.press(confirmButton)

    await waitFor(() => {
      const products = screen.queryAllByTestId('product-row-' + product.id)
      expect(products).toHaveLength(0)
      expect(screen.getByText('No hay productos que mostrar')).toBeTruthy()
    })
  })
})