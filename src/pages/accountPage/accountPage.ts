import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';

class AccountPage implements InterfaceContainerElement {
  draw(): HTMLElement {
    const main = createHTMLElement('main', 'main');

    main.innerHTML = `
    <div class="main__container container">
      
      <div class="account">
        <div class="account__inner">
          <h3>Вход</h3>
          <input type="email" placeholder="Электронная почта">
          <input type="password" placeholder="Пароль">
          <button class="button"><span>Войти</span></button>
          <button class="button button-1"><span>Зарегистрироваться</span></button>
        </div>
      </div>

    </div>
    `;

    return main;
  }
}

export default AccountPage;
