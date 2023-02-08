import { Profile } from '../types/types';

class ApiUsers {
  private static instance: ApiUsers;
  private base;
  private registration;
  private login;
  private check;
  private profile;
  constructor() {
    if (ApiUsers.instance) {
      return ApiUsers.instance;
    }
    ApiUsers.instance = this;
    this.base = 'http://localhost:3002';
    this.registration = `${this.base}/auth/registration`;
    this.login = `${this.base}/auth/login`;
    this.check = `${this.base}/auth/check`;
    this.profile = `${this.base}/auth/profile`;
  }

  public async newUser(email: string, password: string) {
    const res = await fetch(`${this.registration}`, {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }

  public async getAuth(email: string, password: string) {
    const res = await fetch(`${this.login}`, {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }

  public async checkAuth(token: string): Promise<boolean> {
    const res = await fetch(`${this.check}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  }

  public async getProfile(id: string): Promise<Profile> {
    const res = await fetch(`${this.profile}`, {
      method: 'POST',
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }
}

export default ApiUsers;
