import { InterfaceContainerElement } from '../types/types';
import { createHTMLElement } from '../../utils/createHTMLElement';
import backArrowImgSrc from '../../assets/images/back-arrow.png';
import Api from '../api/api';
import preloader from '../preloader/preloader';
import { MixerNowResult } from '../mixerResult/mixer-result';

const FLAVORS = ['цитрусовый', 'ягодный', 'травяной', 'фруктовый', 'тропический', 'десертный', 'напиточный'];
const STRENGTH = ['легкий', 'средний', 'крепкий'];
const PREFERENCES_TITLE = 'Твои предпочтения';
const FLAVORS_CONTAINER_TITLE = '1. Вкусы';
const STRENGTH_CONTAINER_TITLE = '2. Крепость';
const CONTINUE_BUTTON_TEXT = 'Продолжить';
const BRANDS_CONTAINER_TITLE = '3. Бренды';
const CHANGE_PREF_FLAVOR_HASH = '/change-pref/flavors';
const CHANGE_PREF_BRAND_HASH = `/change-pref/brands`;
const PREFERENCES_FLAVOR_HASH = '/mixer/preferences/flavors';
const PREFERENCES_BRAND_HASH = '/mixer/preferences/brands';
const PREFERRED_FLAVORS_KEY = 'preferredFlavors';
const PREFERRED_STRENGTH_KEY = 'preferredStrength';
const PREFERRED_BRANDS_KEY = 'preferredBrands';

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
    document.querySelector('.result-container')?.remove();
    return main;
  }

  private async createPreferences() {
    const PreferencesContainer = createHTMLElement('preferences');
    PreferencesContainer.appendChild(this.createPreferencesHeader());
    const locationHash = location.hash.slice(1);
    if (locationHash === CHANGE_PREF_FLAVOR_HASH || locationHash === PREFERENCES_FLAVOR_HASH) {
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

  private createPreferencesList(category: string[], className: string, preferredBrands?: string[]) {
    const preferencesList = createHTMLElement('preferences-list', 'ul');
    for (let i = 0; i < category.length; i++) {
      const listItem = createHTMLElement('preferences-list__item', 'li');
      const button = <HTMLButtonElement>createHTMLElement(['preferences__button', className], 'button', category[i]);
      if (preferredBrands && !preferredBrands.includes(category[i])) {
        button.disabled = true;
      }
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
    if (this.selectedBrands.length === 0) localStorage.removeItem(PREFERRED_BRANDS_KEY);
    else localStorage.setItem(PREFERRED_BRANDS_KEY, JSON.stringify(this.selectedBrands));
  }

  private handleClickOnFlavorBtn(button: HTMLElement) {
    if (!button.textContent) return;
    if (!this.flavors.includes(button.textContent.toLowerCase())) this.flavors.push(button.textContent.toLowerCase());
    else {
      const index = this.flavors.indexOf(button.textContent.toLowerCase());
      this.flavors.splice(index, 1);
    }
    if (this.flavors.length === 0) localStorage.removeItem(PREFERRED_FLAVORS_KEY);
    else localStorage.setItem(PREFERRED_FLAVORS_KEY, JSON.stringify(this.flavors));
  }

  private handleClickOnStrengthBtn(button: HTMLElement) {
    if (!button.textContent) return;
    this.strength = button.textContent.toLowerCase();
    if (!button.classList.contains('preferences__button--active')) this.strength = '';
    document.querySelectorAll('.strength-button').forEach((strengthButton) => {
      if (strengthButton === button) return;
      strengthButton.classList.remove('preferences__button--active');
    });
    if (this.strength === '') localStorage.removeItem(PREFERRED_STRENGTH_KEY);
    else localStorage.setItem(PREFERRED_STRENGTH_KEY, this.strength);
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
    continueButton.onclick = () => this.handleClickOnContinueButton();
    return continueButton;
  }

  private async handleClickOnContinueButton() {
    const locationHash = location.hash.slice(1);
    if (locationHash === CHANGE_PREF_FLAVOR_HASH) this.continueToChangePrefBrands();
    else if (locationHash === PREFERENCES_FLAVOR_HASH) this.continueToPrefBrands();
    else if (locationHash === CHANGE_PREF_BRAND_HASH) this.savePreferencesChange();
    else if (locationHash === PREFERENCES_BRAND_HASH) await this.showMixesOnPreferences();
  }

  private continueToChangePrefBrands() {
    /* 
      TO-DO:
      отправить на бэк информацию о предпочтениях по вкусам и крепости 
      */
    location.hash = CHANGE_PREF_BRAND_HASH;
  }

  private continueToPrefBrands() {
    location.hash = PREFERENCES_BRAND_HASH;
  }

  private savePreferencesChange() {
    /* 
      TO-DO:
      отправить на бэк информацию о предпочтениях
       */
    location.hash = '';
  }

  private async showMixesOnPreferences() {
    /* 
      TO-DO: 
      подобрать подходящие миксы и показать результат
      */
    const matchingMixes = await this.getMathcingMixes();
    document.body.appendChild(new MixerNowResult(matchingMixes).create());
  }

  private async createBrandsContainer() {
    if (this.BRANDS.length === 0) {
      this.preloader.draw();
      this.BRANDS = (await this.api.getAllBrands()).map((brand) => brand.name);
    }
    const brandsContainer = createHTMLElement('brands-container');
    const enabledBrands = [
      ...new Set((await this.getMatchingFlavorsByFlavorAndStrength()).map((flavor) => flavor.brand)),
    ];
    brandsContainer.appendChild(createHTMLElement('preferences__brands-title', 'h4', BRANDS_CONTAINER_TITLE));
    brandsContainer.appendChild(this.createPreferencesList(this.BRANDS, 'brands-button', enabledBrands));
    this.preloader.removePreloader();
    return brandsContainer;
  }

  private async getMatchingFlavorsByFlavorAndStrength() {
    const preferredFlavors = this.getItemPreferencesFromStorage(PREFERRED_FLAVORS_KEY);
    const prefereedStrength = localStorage.getItem(PREFERRED_STRENGTH_KEY) ?? '';
    const sortedFlavorsByFlavor = (await this.api.getAllFlavors()).filter((flavor) => {
      return flavor.flavor.some((elem) => preferredFlavors.includes(elem));
    });
    const sortedFlavorsByStrength = sortedFlavorsByFlavor.filter((flavor) => flavor.strength === prefereedStrength);
    return sortedFlavorsByStrength;
  }

  private getItemPreferencesFromStorage(key: string) {
    const preferredItemInStorage = localStorage.getItem(key);
    const preferredItem: string[] = preferredItemInStorage ? JSON.parse(preferredItemInStorage) : [];
    return preferredItem;
  }

  private async getMatchingFlavorsByBrand() {
    const preferredBrands = this.getItemPreferencesFromStorage(PREFERRED_BRANDS_KEY);
    return (await this.getMatchingFlavorsByFlavorAndStrength()).filter((flavor) => {
      return preferredBrands.includes(flavor.brand.toLowerCase());
    });
  }

  private async getMathcingMixes() {
    const matchingFlavorsIds = (await this.getMatchingFlavorsByBrand()).map((matchingFlavor) => matchingFlavor.id);
    return (await this.api.getAllMixes()).filter((mix) => {
      const composition = mix.compositionById;
      if (!(composition instanceof Object)) return;
      return Object.values(mix.compositionById).some((elem) => matchingFlavorsIds.includes(elem));
    });
  }
}
