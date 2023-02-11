import GetProfile from '../profile_user/profile_user';
import { server } from '../server/server';

class ApiMix {
  private static instance: ApiMix;
  private base;
  private rate;
  private getProfile;

  constructor() {
    if (ApiMix.instance) {
      return ApiMix.instance;
    }
    ApiMix.instance = this;
    this.base = server;
    this.rate = `${this.base}/auth/rate/`;
    this.getProfile = new GetProfile();
  }

  public async getRate(id: number) {
    const res = await fetch(`${this.rate}:${id}`, {
      method: 'GET',
    });
    return await res.json();
  }

  public async setRate(userId: string, id: number, rate: number) {
    if (typeof userId === 'string') {
      const res = await fetch(`${this.rate}`, {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          id: id,
          rate: rate,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await res.json();
    }
  }
}

export default ApiMix;
