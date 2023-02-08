import { InterfaceContainerElement } from '../types/types';
import { createHTMLElement } from '../../utils/createHTMLElement';
import backArrowImgSrc from '../../assets/images/back-arrow.png';
import Api from '../api/api';

const FLAVORS = ['цитрусовый', 'ягодный', 'травяной', 'фруктовый', 'тропический', 'десертный', 'напиточный'];
const STRENGTH = ['легкий', 'средний', 'крепкий'];

export class PreferencesPage implements InterfaceContainerElement {
  BRANDS: string[] = [];
  api: Api;
  flavors: string[] = [];
  strength = '';
  selectedBrands: string[] = [];
  constructor() {
    this.api = new Api();
    this.api.getAllBrands().then((brands) => (this.BRANDS = brands.map((brand) => brand.name)));
  }
  draw() {
    const main = createHTMLElement('main', 'main');
    const container = createHTMLElement(['main__container', 'container']);
    main.appendChild(container);
    this.createPreferences().then((preferences) => container.appendChild(preferences));
    console.log(this.selectedBrands);
    return main;
  }

  private async createPreferences() {
    const PreferencesContainer = createHTMLElement('preferences');
    PreferencesContainer.appendChild(this.createPreferencesHeader());
    if (location.hash.slice(1) === `/change-pref/flavors`) {
      PreferencesContainer.appendChild(this.createFlavorsContainer());
      PreferencesContainer.appendChild(this.createStrengthContainer());
    } else {
      const brandsContainer = await this.createBrandsContainer();
      PreferencesContainer.appendChild(brandsContainer);
    }
    PreferencesContainer.appendChild(this.createContinueButton());
    return PreferencesContainer;
  }

  private createPreferencesHeader() {
    const PrefHeader = createHTMLElement('preferences__header');
    const backArrowImage = new Image();
    backArrowImage.className = 'preferences__back-image';
    backArrowImage.src = backArrowImgSrc;
    backArrowImage.onclick = () => window.history.back();
    PrefHeader.appendChild(backArrowImage);
    const title = createHTMLElement('preferences__title', 'h4');
    title.textContent = 'Твои предпочтения';
    PrefHeader.appendChild(title);
    return PrefHeader;
  }

  private createFlavorsContainer() {
    const flavorsContainer = createHTMLElement('flavors-container');
    const title = createHTMLElement('preferences__flavor-title', 'h4');
    title.textContent = '1. Вкусы';
    flavorsContainer.appendChild(title);
    flavorsContainer.appendChild(this.createPreferencesList(FLAVORS, 'flavors-button'));
    return flavorsContainer;
  }

  private createPreferencesList(category: string[], className: string) {
    const preferencesList = createHTMLElement('preferences-list', 'ul');
    for (let i = 0; i < category.length; i++) {
      const listItem = createHTMLElement('preferences-list__item', 'li');
      const button = createHTMLElement(['preferences__button', className], 'button');
      button.onclick = () => this.handleClickOnPrefButton(button, category);
      button.textContent = category[i];
      listItem.appendChild(button);
      preferencesList.appendChild(listItem);
    }
    return preferencesList;
  }

  private handleClickOnPrefButton(button: HTMLElement, category: string[]) {
    button.classList.toggle('preferences__button--active');
    if (category === STRENGTH) this.handleClickOnStrengthBtn(button);
    else if (category === FLAVORS) this.handleClickOnFlavorBtn(button);
    else if (category === this.BRANDS) this.handleClickOnBrandBtn(button);
    const continueButton = document.querySelector('.preferences__continue-btn');
    if (!continueButton) return;
    if ((this.flavors.length > 0 && this.strength) || this.selectedBrands.length > 0)
      (continueButton as HTMLButtonElement).disabled = false;
    else (continueButton as HTMLButtonElement).disabled = true;
  }

  private handleClickOnBrandBtn(button: HTMLElement) {
    if (!button.textContent) return;
    if (!this.selectedBrands.includes(button.textContent.toLowerCase()))
      this.selectedBrands.push(button.textContent.toLowerCase());
    else {
      const index = this.selectedBrands.indexOf(button.textContent.toLowerCase());
      this.selectedBrands.splice(index, 1);
    }
  }

  private handleClickOnFlavorBtn(button: HTMLElement) {
    if (!button.textContent) return;
    if (!this.flavors.includes(button.textContent.toLowerCase())) this.flavors.push(button.textContent.toLowerCase());
    else {
      const index = this.flavors.indexOf(button.textContent.toLowerCase());
      this.flavors.splice(index, 1);
    }
  }

  private handleClickOnStrengthBtn(button: HTMLElement) {
    if (!button.textContent) return;
    this.strength = button.textContent.toLowerCase();
    if (!button.classList.contains('preferences__button--active')) this.strength = '';
    document.querySelectorAll('.strength-button').forEach((strengthButton) => {
      if (strengthButton === button) return;
      strengthButton.classList.remove('preferences__button--active');
    });
  }

  private createStrengthContainer() {
    const strengthContainer = createHTMLElement('strength-container');
    const title = createHTMLElement('preferences__strength-title', 'h4');
    title.textContent = '2. Крепость';
    strengthContainer.appendChild(title);
    strengthContainer.appendChild(this.createPreferencesList(STRENGTH, 'strength-button'));
    return strengthContainer;
  }

  private createContinueButton() {
    const continueButton = <HTMLButtonElement>createHTMLElement('preferences__continue-btn', 'button');
    continueButton.textContent = 'Продолжить';
    continueButton.disabled = true;
    continueButton.onclick = () => {
      if (location.hash.slice(1) === `/change-pref/flavors`) {
        /* 
        TO-DO:
        отправить на бэк информацию о предпочтениях по вкусам и крепости 
        */
        location.hash = `/change-pref/brands`;
      } else {
        /* 
        TO-DO:
        отправить на бэк информацию о предпочтениях по брендам
         */
        location.hash = '';
      }
    };
    return continueButton;
  }

  private async createBrandsContainer() {
    if (this.BRANDS.length === 0) {
      const brands = await this.api.getAllBrands();
      this.BRANDS = brands.map((brand) => brand.name);
    }
    const brandsContainer = createHTMLElement('brands-container');
    const title = createHTMLElement('preferences__brands-title', 'h4');
    title.textContent = '3. Бренды';
    brandsContainer.appendChild(title);
    brandsContainer.appendChild(this.createPreferencesList(this.BRANDS, 'brands-button'));

    return brandsContainer;
  }
}
