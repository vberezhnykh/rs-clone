import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../types/types';

class Header implements InterfaceContainerElement {
  draw(): HTMLElement {
    const header = createHTMLElement('header', 'header');

    header.innerHTML = `
      <div class="header__container">
      <a href="/#">Main Page</a>
      <a href="/#/search">Search Page</a>
      <a href="/#/mixer">Mixer Page</a>
      <a href="/#/account">Account Page</a>
      </div>
      `;

    return header;
  }
}

export default Header;
