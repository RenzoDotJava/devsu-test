import { product } from "./src/mocks/product";
import { serverUrl } from "./src/config";
import { queryClient } from "./src/mocks/render-with-providers"

global.fetch = jest.fn((req, res) => getProductResponse(req, res));

beforeEach(() => queryClient.clear())

const getProductResponse = (req, res) => {
  const method = res?.method || 'GET';

  if (method === 'GET') {
    if (req.includes('/bp/products/verification')) {
      const id = req.split('/').pop();

      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => (product.id === id),
      })
    } else if (req === serverUrl + '/bp/products') {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ data: [product] }),
      });
    } else {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => (product),
      });
    }
  } else if (method === 'POST') {
    const body = res?.body ? JSON.parse(res.body) : null;

    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({ data: body }),
    });
  } else if (method === 'DELETE') {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({}),
    });
  } else if (method === 'PUT') {
    const body = res?.body ? JSON.parse(res.body) : null;

    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({ data: body }),
    });
  }

  return Promise.reject(new Error('Unsupported method or URL'));
}