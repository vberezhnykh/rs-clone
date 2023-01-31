import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';

class MainPage implements InterfaceContainerElement {
  draw(): HTMLElement {
    const main = createHTMLElement('main', 'main');

    main.innerHTML = `
    <div class="main__container">
      Main Page
    </div>
    `;

    return main;
  }
}

export default MainPage;
