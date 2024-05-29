import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { ProductList } from "../../screens";
import { screen, waitFor } from '@testing-library/react-native';
import { renderWithProviders } from "../../mocks/render-with-providers";
import { product } from "../../mocks/product";
import { Apis } from '../../enums/Apis';

const server = setupServer()

beforeAll(() => server.listen())

beforeEach(() => renderWithProviders(<ProductList />))

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('ProductList Screen', () => {
  test('should render correctly', () => {
    const tree = screen.toJSON();

    expect(tree).toMatchSnapshot();
  })

  test("should render the header title", () => {
    expect(screen.getByText('BANCO')).toBeTruthy();
  })


  test("should show empty list message", async () => {
    expect(screen.getByText('No hay productos que mostrar')).toBeTruthy()
  })

  test("should show 1 product", async () => {
    server.use(
      rest.get(Apis.PRODUCTS, (req, res, ctx) => {
        res(ctx.status(200), ctx.json({ data: [product] }))
      }))

    await waitFor(() => expect(screen.getByText(product.name)).toBeTruthy())
  })
});