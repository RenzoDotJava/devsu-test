import { HttpService } from "./http.service";
import { serverUrl } from "../config";


export class ProductService {
  private httpService: HttpService;

  constructor(api: string) {
    this.httpService = new HttpService(api);
  }

  async getProducts() {
    const { data }: { data: Product[] } = await this.httpService.get({ url: '' });

    return data
  }

  async getProductById(id: string) {
    const data: Product = await this.httpService.get({ url: `/${id}` });

    return data
  }

  async addProduct(product: Product) {
    const { data }: { data: Product } = await this.httpService.post({ url: '', body: product });

    return data
  }

  async editProduct(id: string, product: Product) {
    const { data }: { data: Product } = await this.httpService.put({ url: `/${id}`, body: product });

    return data
  }

  async validateProduct(id: string) {
    const data: boolean = await this.httpService.get({ url: `/verification/${id}` });

    return data
  }

  async deleteProduct(id: string) {
    const data: Product = await this.httpService.delete({ url: `/${id}` });

    return data
  }
}

export const productService = new ProductService(serverUrl + '/bp/products');