import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../types/types';
const logo = require('../../assets/images/logo.svg');

class Header implements InterfaceContainerElement {
  draw(): HTMLElement {
    const header = createHTMLElement('header', 'header');

    header.innerHTML = `
      <div class="header__container container">
        <div class="header__logo">
          <a href="/#"><img src="${logo}" alt="logo" height="60"></a>
        </div>
        <nav class="header__menu">
          <ul>
            <li><a href="/#">Главная</a></li>
            <li><a href="/#/search">Поиск</a></li>
            <li><a href="/#/mixer">Миксер</a></li>
            <li><a href="/#/account">Профиль</a></li>
          </ul>
        </nav>
      </div>
      `;

    return header;
  }
}

export default Header;
