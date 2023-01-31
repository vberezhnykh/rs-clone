import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';

class AccountPage implements InterfaceContainerElement {
  draw(): HTMLElement {
    const main = createHTMLElement('main', 'main');

    main.innerHTML = `
    <div class="main__container">
      Account Page
    </div>
    `;

    return main;
  }
}

export default AccountPage;
