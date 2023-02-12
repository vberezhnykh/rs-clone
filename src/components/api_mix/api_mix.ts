import ProfileUser from '../profile_user/profile_user';
import { server } from '../server/server';

class ApiMix {
  private static instance: ApiMix;
  private base;
  private rate;
  private favorite;
  private profileUser;

  constructor() {
    if (ApiMix.instance) {
      return ApiMix.instance;
    }
    ApiMix.instance = this;
    this.base = server;
    this.rate = `${this.base}/auth/rate/`;
    this.favorite = `${this.base}/auth/favorite/`;
    this.profileUser = new ProfileUser();
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
      this.profileUser?.updateProfile();
      return await res.json();
    }
  }

  public getVote(id: number) {
    const localStorageAuth: string | null = window.localStorage.getItem('blenderProfile');
    const localStorageNoAuth: string | null = window.localStorage.getItem('blenderStartProfile');
    let votes;
    let rate = 0;
    if (localStorageNoAuth) {
      votes = JSON.parse(localStorageNoAuth).rating;
      votes.forEach((el: { id: number; rate: number }) => {
        if (el.id === id) rate = el.rate;
      });
    } else if (localStorageAuth) {
      votes = JSON.parse(localStorageAuth).rating;
      votes.forEach((el: { id: number; rate: number }) => {
        if (el.id === id) rate = el.rate;
      });
    }
    return rate;
  }

  public async getFavorite(userId: string) {
    const res = await fetch(`${this.favorite}:${userId}`, {
      method: 'GET',
    });
    return await res.json();
  }

  public async setFavorite(userId: string, id: number) {
    if (typeof userId === 'string') {
      const res = await fetch(`${this.favorite}`, {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          id: id,
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
