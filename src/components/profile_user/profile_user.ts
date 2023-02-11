import ApiUsers from '../api_users/apiUsers';
import { Profile } from '../types/types';

class ProfileUser {
  private apiUsers;

  constructor() {
    this.apiUsers = new ApiUsers();
  }

  public getUserId(): string | false {
    let userId: string;
    const localStorage: string | null = window.localStorage.getItem('blender');
    if (localStorage) {
      userId = JSON.parse(localStorage).userId;
      return userId;
    }
    return false;
  }

  public async getProfile(): Promise<Profile | false> {
    const localStorageProfile: string | null = window.localStorage.getItem('blenderProfile');
    if (localStorageProfile) {
      const localProfile: Profile = JSON.parse(localStorageProfile);
      return localProfile;
    }

    const userId = this.getUserId();
    if (typeof userId === 'string') {
      const data = await this.apiUsers.getProfile(userId);
      window.localStorage.setItem('blenderProfile', JSON.stringify(data));
      return data;
    }
    return false;
  }

  public async setProfile(profile: Profile) {
    window.localStorage.setItem('blenderProfile', JSON.stringify(profile));
    this.apiUsers.setProfile(profile);
  }
}

export default ProfileUser;
