import { DEFAULT_RESPONSE_ERROR } from "../utils";

export class HttpService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get({ url }: HttpProps) {

    const res = await fetch(this.baseUrl + url, {
      method: 'GET'
    });

    if (!res.ok) {
      const error = JSON.parse(await res.text());

      throw new Error(error.message || DEFAULT_RESPONSE_ERROR);
    }

    return res.json();
  }

  async post({ url, body }: HttpProps) {

    const res = await fetch(this.baseUrl + url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok) {
      const error = JSON.parse(await res.text());

      throw new Error(error.message || DEFAULT_RESPONSE_ERROR);
    }

    return res.json();
  }

  async put({ url, body }: HttpProps) {

    const res = await fetch(this.baseUrl + url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok) {
      const error = JSON.parse(await res.text());

      throw new Error(error.message || DEFAULT_RESPONSE_ERROR);
    }

    return res.json();
  }

  async delete({ url }: HttpProps) {

    const res = await fetch(this.baseUrl + url, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const error = JSON.parse(await res.text());

      throw new Error(error.message || DEFAULT_RESPONSE_ERROR);
    }

    return res.json();
  }
}