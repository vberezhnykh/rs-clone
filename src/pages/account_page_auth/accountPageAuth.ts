import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';
import ApiUsers from '../../components/api_users/apiUsers';
const favorite = require('../../assets/images/favorite.png');
const profile = require('../../assets/images/profile.svg');
const myMix = require('../../assets/images/my_mixes.svg');
const instagramLogo = require('../../assets/images/instagram_logo.svg');
import ProfileUser from '../../components/profile_user/profile_user';
import { server } from '../../components/server/server';
import ApiMix from '../../components/api_mix/api_mix';
import preloader from '../../components/preloader/preloader';

class AccountPage implements InterfaceContainerElement {
  private apiUsers;
  private profileUser;
  private server;
  private apiMix;
  private preloader;
  constructor() {
    this.apiUsers = new ApiUsers();
    this.profileUser = new ProfileUser();
    this.server = server;
    this.apiMix = new ApiMix();
    this.preloader = new preloader();
  }

  private handler = (e: Event): void => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('button-exit')) {
      window.localStorage.removeItem('blender');
      window.localStorage.removeItem('blenderProfile');
      window.location.hash = `/account/`;
    } else if (target.closest('.button-edit')) {
      window.location.hash = `/account/edit`;
    }
  };

  draw(): HTMLElement {
    const main = createHTMLElement('main', 'main');
    this.profileUser.getProfile().then((data) => {
      if (data !== false) {
        const photo = data.avatar ? `${this.server}/${data.avatar}` : profile;
        main.innerHTML = `
        <div class="main__container container">
          <div class="flex-container">
            <div class="row">
              <div class="column avatar-column">
                <div class="img-profile cell-img">
                  <img class="profile" src="${photo}">
                </div>
              </div>  
              <div class="wrap">
              <div class="column name-column">${data.name}</div>
              <div class="instagram-column">
              <div class="img-instagram"><a href="https://www.instagram.com/${data.instagramAccount.slice(
                1
              )}" target="_blank"><img src="${instagramLogo}"></a></div>
              <div class="text-instagram"><span><a href="https://www.instagram.com/${data.instagramAccount.slice(
                1
              )}" target="_blank">${data.instagramAccount}</a></span></div>
              </div>
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
        <div class="button-exit">Выйти из профиля</div>
        </div>
        `;
      }
    });
    main.addEventListener('click', this.handler);
    return main;
  }
}

export default AccountPage;
