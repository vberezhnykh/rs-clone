import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement, Mixes } from '../types/types';
import backArrowImgSrc from '../../assets/images/back-arrow.png';
import { MixesList } from '../mixesList/mixesList';
import selectorImgSrc from '../../assets/images/selector-icon.png';
import expandArrowImgSrc from '../../assets/images/expand-arrow.png';
import Api from '../api/api';

export class CompilationPage implements InterfaceContainerElement {
  mixes?: Mixes;
  api: Api;
  constructor() {
    this.api = new Api();
  }
  draw() {
    const main = createHTMLElement('main', 'main');
    const container = createHTMLElement(['main__container', 'container']);
    main.appendChild(container);
    let UsersMixesContainer;
    this.createUsersMixesPopup().then((data) => {
      UsersMixesContainer = data;
      container.appendChild(UsersMixesContainer);
    });
    return main;
  }

  private async createUsersMixesPopup() {
    const UsersMixesContainer = createHTMLElement('user-mixes-container');
    UsersMixesContainer.appendChild(this.createUsersMixesPopupHeader());
    UsersMixesContainer.appendChild(this.createUsersMixesSelector());
    if (!this.mixes) this.mixes = await this.api.getAllMixes();
    const usersMixesList = new MixesList(this.mixes).create();
    UsersMixesContainer.appendChild(usersMixesList);
    return UsersMixesContainer;
  }

  private createUsersMixesPopupHeader() {
    const header = createHTMLElement('user-mixes__header');
    const navBar = createHTMLElement('user-mixes__nav', 'nav');
    const backArrowImage = new Image();
    backArrowImage.className = 'user-mixes__back-arrow';
    backArrowImage.src = backArrowImgSrc;
    backArrowImage.onclick = () => window.history.back();
    navBar.append(backArrowImage);
    header.append(navBar);
    const heading = createHTMLElement('user-mixes__heading', 'h4');
    heading.textContent = 'Миксы от пользователей';
    header.append(heading);
    return header;
  }

  private createUsersMixesSelector() {
    const options = ['Популярные', 'Новинки', 'Высокие рейтинги'];
    const usersMixesSelectorContainer = createHTMLElement('selector-container', 'div');
    const selectorImg = new Image();
    selectorImg.className = 'selector__image';
    selectorImg.src = selectorImgSrc;
    usersMixesSelectorContainer.append(selectorImg);
    const container = createHTMLElement('selector__text-and-expand');
    const text = createHTMLElement('selector__text', 'span');
    text.textContent = options[0];
    container.appendChild(text);
    const expandArrowImg = new Image();
    expandArrowImg.className = 'selector__expand-image';
    expandArrowImg.src = expandArrowImgSrc;
    container.appendChild(expandArrowImg);
    usersMixesSelectorContainer.appendChild(container);
    const selectorDropDown = createHTMLElement('selector', 'div');
    for (let i = 0; i < 3; i++) {
      const option = <HTMLLIElement>createHTMLElement('selector__option', 'li');
      option.textContent = options[i];
      if (i === 0) option.classList.add('selector__option--active');
      option.onclick = () => {
        document.querySelectorAll('.selector__option').forEach((option) => {
          option.classList.remove('selector__option--active');
        });
        option.classList.add('selector__option--active');
        text.textContent = `${option.textContent}`;
      };
      selectorDropDown.appendChild(option);
    }
    usersMixesSelectorContainer.appendChild(selectorDropDown);
    usersMixesSelectorContainer.onclick = (event) => {
      if (event.target !== selectorDropDown && !(event.target as HTMLElement).classList.contains('selector__option')) {
        selectorDropDown.classList.toggle('selector--visible');
        expandArrowImg.classList.toggle('selector__expand-image--reverse');
      }
    };
    return usersMixesSelectorContainer;
  }
}
