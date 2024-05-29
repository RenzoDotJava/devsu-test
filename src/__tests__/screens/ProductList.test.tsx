import { screen, waitFor, fireEvent } from '@testing-library/react-native';
import Navigator from "../../index";
import { renderWithProviders } from "../../mocks/render-with-providers";
import { product } from "../../mocks/product";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: async () => ({ data: [product] }),
  } as Response)
);

beforeEach(() => {
  renderWithProviders(<Navigator />)
})

describe.skip('ProductList Screen', () => {
  test("should render the header title", () => {
    expect(screen.getByText('BANCO')).toBeTruthy();
  })

  test("should show 1 product", async () => {
    await waitFor(() => {
      const element = screen.getByTestId('product-row-' + product.id)
      expect(element).toBeTruthy()
    })
  })

  test("should render show an empty message when searching on input search an unexisting id or name", async () => {

    await waitFor(() => {
      const element = screen.getByTestId('product-row-' + product.id)
      expect(element).toBeTruthy()
    })

    const element = screen.getByTestId('input-search')
    expect(element).toBeTruthy()

    fireEvent(element, 'onChangeText', 'unexisting product')


    const products = screen.queryAllByTestId('product-row-' + product.id)
    expect(products).toHaveLength(0)
  })
});