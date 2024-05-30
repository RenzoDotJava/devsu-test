import { screen, fireEvent } from '@testing-library/react-native';
import Navigator from "../../index";
import { renderWithProviders } from "../../mocks/render-with-providers";
import { product } from "../../mocks/product";

beforeEach(() => {
  renderWithProviders(<Navigator />)
})

describe('ProductList Screen', () => {
  test("should render the header title", () => {
    expect(screen.getByText('BANCO')).toBeTruthy();
  })

  test("should render the list of products", async () => {
    const element = await screen.findByTestId('product-row-' + product.id)

    expect(element).toBeTruthy()
  })

  test("should show an empty message when searching on input search an unexisting id or name", async () => {
    const element = await screen.findByTestId('product-row-' + product.id)
    expect(element).toBeTruthy()

    const inputSearch = await screen.findByTestId('input-search')
    expect(inputSearch).toBeTruthy()

    fireEvent(inputSearch, 'onChangeText', 'unexisting product')

    const products = screen.queryAllByTestId('product-row-' + product.id)
    expect(products).toHaveLength(0)
  })
});