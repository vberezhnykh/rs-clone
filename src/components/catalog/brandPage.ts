import { createHTMLElement } from '../../utils/createHTMLElement';
import Api from '../api/api';
import { Flavors, InterfaceContainerElement } from '../types/types';
import searchImgSrc from '../../assets/images/search.svg';
import infoImgSrc from '../../assets/images/info.svg';
import addNewImgSrc from '../../assets/images/add-new.png';

export class BrandPage implements InterfaceContainerElement {
  private brand: string;
  private flavors: Flavors;
  api: Api;
  constructor() {
    this.brand = window.location.hash.split('/')[3];
    this.brand = this.brand.replace('%20', ' ');
    this.api = new Api();
  }
  draw() {
    const brandPage = createHTMLElement('brand-page');
    brandPage.appendChild(this.createHeader());
    brandPage.appendChild(this.createSearchPanel());
    this.createFlavorsList().then((element) => brandPage.appendChild(element));
    return brandPage;
  }

  private createHeader() {
    const header = createHTMLElement('brand-page-header', 'div');
    header.appendChild(this.createHeaderBackBtn());
    header.appendChild(createHTMLElement('brand-page__title', 'h2', this.getBrandName()));
    return header;
  }

  private getBrandName() {
    return this.brand[0].toUpperCase() + this.brand.slice(1);
  }

  private createHeaderBackBtn() {
    const backBtn = createHTMLElement('brand__back-button', 'button', '←');
    backBtn.onclick = () => history.back();
    return backBtn;
  }

  private createSearchPanel() {
    const searchPanel = createHTMLElement(['brand-page__search', 'search'], 'div');
    const innerSearchPanelContainer = createHTMLElement('search__inner', 'div');
    innerSearchPanelContainer.appendChild(this.createSearchInputImage());
    innerSearchPanelContainer.appendChild(this.createSearchInput());
    searchPanel.appendChild(innerSearchPanelContainer);
    return searchPanel;
  }

  private createSearchInputImage() {
    const image = new Image();
    image.src = searchImgSrc;
    image.alt = 'search';
    return image;
  }

  private createSearchInput() {
    const searchInput = <HTMLInputElement>createHTMLElement('search__input', 'input');
    searchInput.placeholder = 'Поиск';
    // searchInput.onkeyup = () => this.handleKeyupOnInput(searchInput);
    return searchInput;
  }

  private async createFlavorsList() {
    if (!this.flavors) await this.getAllFlavorsByBrand();
    const flavorsList = createHTMLElement('flavor-list', 'ul');
    for (let i = 0; i < this.flavors.length; i++) {
      flavorsList.appendChild(this.createFlavorListItem(i));
    }
    return flavorsList;
  }

  private createFlavorListItem(i: number) {
    const flavorListItem = createHTMLElement('flavor-list__item', 'li');
    flavorListItem.appendChild(createHTMLElement('flavor__name', 'span', this.flavors[i].name));
    flavorListItem.appendChild(this.createImage('flavor__image--info', infoImgSrc));
    flavorListItem.appendChild(this.createImage('flavor__image--add-new', addNewImgSrc));
    return flavorListItem;
  }

  private createImage(className: string, src: string) {
    const image = new Image();
    image.className = className;
    image.src = src;
    return image;
  }

  private async getAllFlavorsByBrand() {
    this.flavors = (await this.api.getAllFlavors()).filter(
      (flavor) => flavor.brand.toLowerCase() === this.brand.toLowerCase()
    );
  }
}
