export class HttpService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get({ url }: HttpProps) {
    const res = await fetch(this.baseUrl + url, {
      method: 'GET'
    });

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

    return res.json();
  }

  async delete({ url }: HttpProps) {

    const res = await fetch(this.baseUrl + url, {
      method: 'DELETE',
    });

    return res.json();
  }
}