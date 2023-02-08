import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';
import ApiUsers from '../../components/api/apiUsers';
const favorite = require('../../assets/images/favorite.png');
const profile = require('../../assets/images/profile.svg');
const myMix = require('../../assets/images/my_mixes.svg');
import GetProfile from '../../components/getProfile/getProfile';

class AccountPageEdit implements InterfaceContainerElement {
  private apiUsers;
  private getProfile;
  constructor() {
    this.apiUsers = new ApiUsers();
    this.getProfile = new GetProfile();
  }

  private handler = (e: Event): void => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('button-exit')) {
      window.localStorage.clear();
      window.location.hash = `/account/`;
    }
    console.log(target)
  };

  draw(): HTMLElement {
    const main = createHTMLElement('main', 'main');
    this.getProfile.getProfile().then((data) => {
      if (data !== false) {

      main.innerHTML = `
      <div class="main__container container">
        <div class="section-edit">
          <div class="change-photo">
            <div class="img-profile cell-img">
              <img class="profile" src="${profile}">
            </div>
            <div class="text-change-button">Изменить фото</div>
          </div>
          <div class="inputs">
            <label for="name">Твоё имя</label>
            <input type="text" name="name" id="name">
            <label for="instagram-name">Твой ник в Instagram</label>
            <input type="text" name="instagram-name" id="instagram-name">
          </div>
          <div class="button button-exit"><span>Сохранить</span></div>
        </div>
      </div>
      `;
    }
    });
    main.addEventListener('click', this.handler);
    return main;
  }
}

export default AccountPageEdit;
