import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';
import ApiUsers from '../../components/api_users/apiUsers';
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
    const buttons = document.querySelectorAll('.button span') as NodeList;
    const title = document.querySelector('h3') as HTMLElement;
    const emailInput = document.querySelector('.email') as HTMLInputElement;
    const passwordInput = document.querySelector('.password') as HTMLInputElement;
    if (target.textContent === 'Зарегистрироваться' && target.classList.contains('span-button')) {
      buttons[0].textContent = 'Регистрация';
      buttons[1].textContent = 'Войти';
      title.textContent = 'Регистрация';
      emailInput.value = '';
      passwordInput.value = '';
    } else if (target.textContent === 'Войти' && target.classList.contains('span-button')) {
      buttons[0].textContent = 'Вход';
      buttons[1].textContent = 'Зарегистрироваться';
      title.textContent = 'Вход';
      emailInput.value = '';
      passwordInput.value = '';
    }

    if (target.classList.contains('submit-btn')) {
      const formElement = document.getElementById('form') as HTMLFormElement;
      if (formElement.checkValidity()) {
        e.preventDefault();
        const formData = new FormData(formElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        if (target.textContent === 'Регистрация') {
          this.apiUsers.newUser(email, password);
        } else {
          this.apiUsers.getAuth(email, password).then((data) => {
            if (data.token) {
              window.localStorage.setItem('blender', JSON.stringify(data.token));
            }
          });
        }
      }
    }
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
    <div class="button-exit">Выйти из профиля</div>
    </div>
    `;
    main.addEventListener('click', this.handler);
    return main;
  }
}

export default AccountPage;
