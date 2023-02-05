import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../types/types';
const logogithub = require('../../assets/images/github.svg');
const logors = require('../../assets/images/rs-school.svg');

class Footer implements InterfaceContainerElement {
  draw(): HTMLElement {
    const footer = createHTMLElement('footer', 'footer');

    footer.innerHTML = `
      <div class="footer__container container">
        <div class="footer__github">
        <img src="${logogithub}" alt="Github" height="32"> flash226 | fkodirov | vberezhnykh</div>
        <p class="footer__text">2023</p>
        <div class="footer__rs"><img src="${logors}" alt="RS School" height="32"></div>
      </div>
      `;

    return footer;
  }
}

export default Footer;
