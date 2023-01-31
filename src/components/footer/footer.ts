import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../types/types';

class Footer implements InterfaceContainerElement {
  draw(): HTMLElement {
    const footer = createHTMLElement('footer', 'footer');

    footer.innerHTML = `
      <div class="footer__container">
        footer
      </div>
      `;

    return footer;
  }
}

export default Footer;
