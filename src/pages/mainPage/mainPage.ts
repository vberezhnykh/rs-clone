import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';
import Api from '../../components/api/api';

class MainPage implements InterfaceContainerElement {
  private api;
  constructor() {
    this.api = new Api();
  }
  draw(): HTMLElement {
    const main = createHTMLElement('main', 'main');

    main.innerHTML = `
    <div class="main__container">
    <img src="${this.api.getImage('./images/Chabacco/9.webp')}">
      Main Page
    </div>
    `;
    this.api.getAllBrands().then((data) => console.log(data));
    return main;
  }
}

export default MainPage;
