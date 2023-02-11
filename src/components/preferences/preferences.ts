import { InterfaceContainerElement } from '../types/types';
import { createHTMLElement } from '../../utils/createHTMLElement';
import backArrowImgSrc from '../../assets/images/back-arrow.png';
import Api from '../api/api';
import preloader from '../preloader/preloader';

const FLAVORS = ['цитрусовый', 'ягодный', 'травяной', 'фруктовый', 'тропический', 'десертный', 'напиточный'];
const STRENGTH = ['легкий', 'средний', 'крепкий'];
const PREFERENCES_TITLE = 'Твои предпочтения';
const FLAVORS_CONTAINER_TITLE = '1. Вкусы';
const STRENGTH_CONTAINER_TITLE = '2. Крепость';
const CONTINUE_BUTTON_TEXT = 'Продолжить';
const BRANDS_CONTAINER_TITLE = '3. Бренды';

export class PreferencesPage implements InterfaceContainerElement {
  BRANDS: string[] = [];
  api: Api;
  preloader: preloader;
  flavors: string[] = [];
  strength = '';
  selectedBrands: string[] = [];
  constructor() {
    this.api = new Api();
    this.preloader = new preloader();
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
    const backArrowImage = <HTMLImageElement>createHTMLElement('preferences__back-image', 'img');
    backArrowImage.src = backArrowImgSrc;
    backArrowImage.onclick = () => window.history.back();
    PrefHeader.appendChild(backArrowImage);
    PrefHeader.appendChild(createHTMLElement('preferences__title', 'h4', PREFERENCES_TITLE));
    return PrefHeader;
  }

  private createFlavorsContainer() {
    const flavorsContainer = createHTMLElement('flavors-container');
    flavorsContainer.appendChild(createHTMLElement('preferences__flavor-title', 'h4', FLAVORS_CONTAINER_TITLE));
    flavorsContainer.appendChild(this.createPreferencesList(FLAVORS, 'flavors-button'));
    return flavorsContainer;
  }

  private createPreferencesList(category: string[], className: string) {
    const preferencesList = createHTMLElement('preferences-list', 'ul');
    for (let i = 0; i < category.length; i++) {
      const listItem = createHTMLElement('preferences-list__item', 'li');
      const button = createHTMLElement(['preferences__button', className], 'button', category[i]);
      button.onclick = () => this.handleClickOnPrefButton(button, category);
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
    strengthContainer.appendChild(createHTMLElement('preferences__strength-title', 'h4', STRENGTH_CONTAINER_TITLE));
    strengthContainer.appendChild(this.createPreferencesList(STRENGTH, 'strength-button'));
    return strengthContainer;
  }

  private createContinueButton() {
    const continueButton = <HTMLButtonElement>(
      createHTMLElement('preferences__continue-btn', 'button', CONTINUE_BUTTON_TEXT)
    );
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
      this.preloader.draw();
      const brands = await this.api.getAllBrands();
      this.BRANDS = brands.map((brand) => brand.name);
      this.preloader.removePreloader();
    }
    const brandsContainer = createHTMLElement('brands-container');
    brandsContainer.appendChild(createHTMLElement('preferences__brands-title', 'h4', BRANDS_CONTAINER_TITLE));
    brandsContainer.appendChild(this.createPreferencesList(this.BRANDS, 'brands-button'));
    return brandsContainer;
  }
}
