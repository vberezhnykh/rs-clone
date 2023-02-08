import ApiUsers from '../api/apiUsers';
import { Profile } from '../types/types';

class GetProfile {
  private apiUsers;

  constructor() {
    this.apiUsers = new ApiUsers();
  }

  public async getProfile(): Promise<Profile | false> {
    const localStorageProfile: string | null = window.localStorage.getItem('blenderProfile');
    if (localStorageProfile) {
      const localProfile: Profile = JSON.parse(localStorageProfile);
      return localProfile;
    }
    const localStorage: string | null = window.localStorage.getItem('blender');
    if (localStorage) {
      const id: string = JSON.parse(localStorage).userId;
      const data = await this.apiUsers.getProfile(id);
      window.localStorage.setItem('blenderProfile', JSON.stringify(data));
      return data;
    }
    return false;
  }
}

export default GetProfile;
