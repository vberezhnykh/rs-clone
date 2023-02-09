import { Brands, Flavors, InterfaceContainerElement } from '../types/types';
import { createHTMLElement } from '../../utils/createHTMLElement';
// import backBtn from '../../assets/images/'
import searchImgSrc from '../../assets/images/search.svg';
import Api from '../api/api';

const ERROR_MESSAGE = 'К сожалению, по вашему запросу ничего не найдено...';

export class Catalog implements InterfaceContainerElement {
  api: Api;
  brands: Brands = [];
  flavors: Flavors = [];
  constructor() {
    this.api = new Api();
  }
  draw() {
    this.api.getAllBrands().then((brands) => (this.brands = brands));
    const catalog = createHTMLElement('catalog', 'div');
    catalog.appendChild(this.createHeader());
    catalog.appendChild(this.createSearchPanel());
    catalog.appendChild(this.createBrandSuggestBtn());
    this.createBrandList().then((catalogList) => catalog.appendChild(catalogList));
    return catalog;
  }

  private createHeader() {
    const header = createHTMLElement('catalog-header', 'div');
    const backBtn = createHTMLElement('catalog__back-button', 'button');
    backBtn.textContent = '←';
    backBtn.onclick = () => history.back();
    header.appendChild(backBtn);
    const title = createHTMLElement('catalog__title', 'h2');
    title.textContent = 'Каталог';
    header.appendChild(title);
    const mixerImg = createHTMLElement('mixer-image', 'button');
    mixerImg.textContent = 'MIXER_PLACEHOLDER';
    header.appendChild(mixerImg);
    return header;
  }

  private createSearchPanel() {
    const searchPanel = createHTMLElement(['catalog__search', 'search'], 'div');
    const innerSearchPanelContainer = createHTMLElement('search__inner', 'div');
    const image = new Image();
    image.src = searchImgSrc;
    image.alt = 'search';
    innerSearchPanelContainer.appendChild(image);
    const searchInput = <HTMLInputElement>createHTMLElement('search__input', 'input');
    searchInput.placeholder = 'Поиск';
    searchInput.onkeyup = () => this.handleKeyupOnInput(searchInput);
    innerSearchPanelContainer.appendChild(searchInput);
    searchPanel.appendChild(innerSearchPanelContainer);
    return searchPanel;
  }

  private async handleKeyupOnInput(searchInput: HTMLInputElement) {
    if (this.brands.length === 0) return;
    const sortedBrands = this.brands.filter((brand) =>
      brand.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    const catalogList = document.querySelector('.catalog-list');
    if (!catalogList) return;
    const brandList = await this.createBrandList(sortedBrands);
    catalogList.replaceWith(brandList);
  }

  private createBrandSuggestBtn() {
    const brandSuggestBtn = createHTMLElement('catalog__brand-suggest-btn', 'button');
    brandSuggestBtn.textContent = 'Нет нужного бренда? Жми сюда!';
    return brandSuggestBtn;
  }

  private async createBrandList(brands?: Brands) {
    const catalogList = createHTMLElement('catalog-list', 'ul');
    if (brands?.length === 0) {
      catalogList.append(ERROR_MESSAGE);
      catalogList.classList.add('catalog-list--error');
      return catalogList;
    }
    if (this.brands.length === 0) this.brands = await this.api.getAllBrands();
    const brandsToIterate = brands ?? this.brands;
    for (let i = 0; i < brandsToIterate.length; i++) {
      catalogList.appendChild(await this.createBrandListItem(i, brandsToIterate));
    }
    return catalogList;
  }

  private async createBrandListItem(i: number, brands: Brands) {
    const brand = createHTMLElement(['catalog-list__item', 'brands-list__item'], 'li');
    const brandImg = new Image();
    brandImg.src = this.api.getImage(brands[i].image);
    brandImg.alt = 'brand-name';
    brand.appendChild(brandImg);
    const container = createHTMLElement('catalog-list__item-container');
    const brandName = createHTMLElement('brand-name', 'span');
    brandName.textContent = brands[i].name;
    container.appendChild(brandName);
    const flavorsNum = createHTMLElement('flavors-count', 'span');
    if (this.flavors.length === 0) this.flavors = await this.api.getAllFlavors();
    flavorsNum.textContent = `${this.flavors.filter((flavor) => flavor.brand === brands[i].name).length} вкусов`;
    container.appendChild(flavorsNum);
    brand.appendChild(container);
    return brand;
  }
}
