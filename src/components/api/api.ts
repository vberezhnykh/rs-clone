import { Brands, Flavor, Flavors, Mix, Mixes } from '../types/types';

class Api {
  private static instance: Api;
  private base;
  private brands;
  private flavors;
  private mixes;
  constructor() {
    if (Api.instance) {
      return Api.instance;
    }
    Api.instance = this;
    this.base = 'https://rs-clone-back-production-247c.up.railway.app';
    this.brands = `${this.base}/api/brands`;
    this.flavors = `${this.base}/api/flavors`;
    this.mixes = `${this.base}/api/mixes`;
  }

  public async getAllBrands(): Promise<Brands> {
    const res = await fetch(`${this.brands}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }

  public async getAllFlavors(): Promise<Flavors> {
    const res = await fetch(`${this.flavors}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }

  public async getFlavor(id: number): Promise<Flavor> {
    const res = await fetch(`${this.flavors}/:${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }

  public async getAllMixes(): Promise<Mixes> {
    const res = await fetch(`${this.mixes}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }

  public async getMix(id: number): Promise<Mix> {
    const res = await fetch(`${this.mixes}/:${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }

  public getImage(image: string): string {
    image = image.slice(image.lastIndexOf('/', image.lastIndexOf('/') - 1) + 1);
    return `${this.base}/images/${image}`;
  }
}
export default Api;
