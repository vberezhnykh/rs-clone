import { Brands, Flavors, Mixes } from '../types/types';

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
    this.base = 'https://rs-clone-back-production-247c.up.railway.app/api';
    this.brands = `${this.base}/brands`;
    this.flavors = `${this.base}/flavors`;
    this.mixes = `${this.base}/mixes`;
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

  public async getAllMixes(): Promise<Mixes> {
    const res = await fetch(`${this.mixes}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }
}
export default Api;
