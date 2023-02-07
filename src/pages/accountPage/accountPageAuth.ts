import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';
import ApiUsers from '../../components/api/apiUsers';
const favorite = require('../../assets/images/favorite.png');
const profile = require('../../assets/images/profile.svg');
const myMix = require('../../assets/images/my_mixes.svg');

class AccountPage implements InterfaceContainerElement {
  private apiUsers;
  constructor() {
    this.apiUsers = new ApiUsers();
  }

  private handler = (e: Event): void => {
    const target = e.target as HTMLElement;
  };

  draw(): HTMLElement {
    const main = createHTMLElement('main', 'main');

    main.innerHTML = `
    <div class="main__container container">
      <div class="flex-container">
        <div class="row">
          <div class="column avatar-column">
            <div class="img-profile cell-img">
              <img class="profile" src="${profile}">
            </div>
          </div>  
          <div class="wrap">
          <div class="column name-column">Name user</div>
          <div class="column button-column">
            <div class="button-edit"><span>Настройки профиля</span></div>
          </div>
            </div>
        </div>
        <div class="row">
          <div class="column cell-img">
            <img src="${favorite}">
            <p class="name">Любимые</p>
            <p class="amount">0 миксов</p>
          </div>
          <div class="column cell-img">
            <img src="${myMix}">
            <p class="name">Мои миксы</p>
            <p class="amount">0 миксов</p>
          </div>
        </div>
      </div>
    
    </div>
    `;
    main.addEventListener('click', this.handler);
    return main;
  }
}

export default AccountPage;
