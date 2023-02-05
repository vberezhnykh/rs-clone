import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';
import ApiUsers from '../../components/api/apiUsers';

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
    <form id="form">
      <div class="account">
        <div class="account__inner">
          <h3>Uhoooo!</h3>
            <input type="email" name="email" placeholder="Электронная почта" class="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" title="Enter valid email address" required>
            <input type="password" name="password" placeholder="Пароль" class="password" minlength="5" required>
            <button class="button submit-btn" type="submit"><span class="submit-btn">Войти</span></button>
            </form>
            <div class="button button-1"><span class="span-button">Зарегистрироваться</span></div>
        </div>
      </div>
    
    </div>
    `;
    main.addEventListener('click', this.handler);
    return main;
  }
}

export default AccountPage;
