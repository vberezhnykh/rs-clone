import { createHTMLElement } from '../../utils/createHTMLElement';
import {
  Brands,
  Flavors,
  FoundResults,
  InterfaceContainerElement,
  Mixes,
  TabBtnId,
  Tabs,
  SearchCategory,
  Mix,
  Flavor,
  Brand,
} from '../../components/types/types';
import Api from '../../components/api/api';
import searchImgSrc from '../../assets/images/search.svg';
import { sortFoundBrandResults, sortFoundFlavorResults, sortFoundMixResults } from '../../utils/sortFoundResults';
import { MixesList } from '../../components/mixesList/mixesList';
import { createPopup, openFlavorPopup } from '../../components/popup/popup';
import preloader from '../../components/preloader/preloader';

const NOT_FOUND_ERROR = 'К сожалению, по данному запросу ничего не найдено.';
/* TO-DO: Добавить статистику настоящих популярных поисковых запросов */
const FAKE_POPULAR_QUERIES = ['малина', 'клубника', 'травяной', 'фруктовый', 'ягодный'];

class SearchPage implements InterfaceContainerElement {
  private brands?: Brands;
  private flavors?: Flavors;
  private mixes?: Mixes;
  private api: Api;
  private foundResults?: FoundResults | null = null;
  private suggestions: string[] = [];
  private preloader: preloader;

  constructor() {
    this.api = new Api();
    /* TO-DO: далее код не для продакшена */
    this.checkDataBase().then(() => this.getSuggestions());
  }

  draw(): HTMLElement {
    const main = createHTMLElement('main', 'main');
    const container = createHTMLElement(['main__container', 'container']);
    main.appendChild(container);
    const searchPanel = this.createSearchPanel();
    container.appendChild(searchPanel);
    const aside = this.createAsidePanel();
    container.appendChild(aside);
    createPopup(main);
    return main;
  }

  private createAsidePanel() {
    const asidePanel = createHTMLElement('search-aside', 'aside');
    const popularQueries = this.createPopularQueries();
    asidePanel.appendChild(popularQueries);
    return asidePanel;
  }

  private createPopularQueries() {
    const popularQueries = createHTMLElement('queries');
    const title = createHTMLElement('queries__title', 'h3');
    title.textContent = 'Популярные запросы';
    popularQueries.appendChild(title);
    const buttons = createHTMLElement('queries-buttons');
    for (let i = 0; i < FAKE_POPULAR_QUERIES.length; i++) {
      const button = createHTMLElement('queries-buttons__button', 'button');
      button.textContent = FAKE_POPULAR_QUERIES[i].toUpperCase();
      buttons.appendChild(button);
      button.onclick = () => this.handleClickOnQueryButton(button as HTMLButtonElement);
    }
    popularQueries.appendChild(buttons);
    return popularQueries;
  }

  private handleClickOnQueryButton(button: HTMLButtonElement) {
    document.querySelector('.search-aside')?.classList.add('search-aside--hidden');
    const input = document.querySelector('.search__input');
    if (!(input instanceof HTMLInputElement)) return;
    input.value = button.textContent?.toLowerCase() ?? '';
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
  }

  private createSearchPanel() {
    const searchPanelContainer = createHTMLElement('search', 'div');
    const innerSearchPanelContainer = createHTMLElement('search__inner', 'div');
    const image = new Image();
    image.src = searchImgSrc;
    image.alt = 'search';
    innerSearchPanelContainer.appendChild(image);
    const searchInput = <HTMLInputElement>createHTMLElement('search__input', 'input');
    searchInput.placeholder = 'Бренд, микс, вкус';
    searchInput.onkeyup = (event) => this.handleInputSumbit(event, searchInput);
    innerSearchPanelContainer.appendChild(searchInput);
    searchPanelContainer.appendChild(innerSearchPanelContainer);
    return searchPanelContainer;
  }

  private createSearchTabs() {
    const searchTabs = createHTMLElement('tabs', 'div');
    for (let i = 1; i <= 4; i++) {
      const tab = <HTMLInputElement>createHTMLElement('', 'input');
      tab.type = 'radio';
      tab.name = 'tab=btn';
      tab.id = `tab-btn-${i}`;
      tab.value = Tabs[i];
      if (i === 1) tab.checked = true;
      if (i === 4) tab.disabled = true;
      const label = <HTMLLabelElement>createHTMLElement('', 'label');
      label.htmlFor = `tab-btn-${i}`;
      label.textContent = Tabs[i];
      searchTabs.appendChild(tab);
      searchTabs.appendChild(label);
      tab.onclick = () => this.handleClickOnTab(tab.id);
    }
    return searchTabs;
  }

  private handleClickOnTab(tabId: string) {
    const container = document.querySelector('.main__container');
    if (!container) return;
    container.appendChild(this.createListOfResults(tabId as TabBtnId));
  }

  private createListOfResults(tabBtnId: TabBtnId) {
    const listInTheDOM = document.querySelector('.search-list');
    listInTheDOM?.remove();
    const errorMessage = document.querySelector('.search-error-message');
    errorMessage?.remove();
    if (!this.foundResults) return showErrorMessage();
    let resultByTab;
    let list: HTMLElement;
    if (tabBtnId === 'tab-btn-1') {
      resultByTab = this.foundResults.foundFlavors;
      if (!resultByTab) return showErrorMessage();
      list = this.createResultListForFlavorTab(resultByTab);
      return list;
    } else if (tabBtnId === 'tab-btn-2') {
      resultByTab = this.foundResults.foundMixes;
      if (!resultByTab) return showErrorMessage();
      list = this.createResultListForMixesTab(resultByTab);
      return list;
    } else if (tabBtnId === 'tab-btn-3') {
      resultByTab = this.foundResults.foundBrands;
      if (!resultByTab) return showErrorMessage();
      list = this.createResultListForBrandTab(resultByTab);
      return list;
    }
    return showErrorMessage();

    function showErrorMessage() {
      const errorMessage = createHTMLElement('search-error-message');
      errorMessage.textContent = NOT_FOUND_ERROR;
      return errorMessage;
    }
  }

  private createResultListForFlavorTab(resultByTab: Flavors) {
    const list = createHTMLElement('search-list', 'ul');
    list.classList.add('flavors-list');
    for (let i = 0; i < resultByTab.length; i++) {
      const listItem = createHTMLElement('flavors-list__item', 'li');
      const brandName = createHTMLElement('brand-name', 'span');
      brandName.textContent = resultByTab[i].brand;
      listItem.appendChild(brandName);
      const flavorName = createHTMLElement('flavor-name', 'span');
      flavorName.textContent = resultByTab[i].name;
      listItem.appendChild(flavorName);
      list.appendChild(listItem);
      listItem.onclick = () => openFlavorPopup(resultByTab[i]);
    }
    return list;
  }

  private createResultListForMixesTab(resultByTab: Mixes) {
    return new MixesList(resultByTab).create({ isSearchList: true });
  }

  private createResultListForBrandTab(resultByTab: Brands) {
    const list = createHTMLElement('search-list', 'ul');
    list.classList.add('brands-list');
    for (let i = 0; i < resultByTab.length; i++) {
      const listItem = createHTMLElement('brands-list__item', 'li');
      const brandImg = new Image();
      brandImg.src = this.api.getImage(resultByTab[i].image);
      brandImg.alt = 'brand-name';
      listItem.appendChild(brandImg);
      const container = createHTMLElement('brands-list__item-container');
      const brandName = createHTMLElement('brand-name', 'span');
      brandName.textContent = resultByTab[i].name;
      container.appendChild(brandName);
      const flavorsNum = createHTMLElement('flavors-count', 'span');
      if (!this.flavors) return list;
      flavorsNum.textContent = `${this.flavors.filter((flavor) => flavor.brand === resultByTab[i].name).length} вкусов`;
      container.appendChild(flavorsNum);
      listItem.appendChild(container);
      list.appendChild(listItem);
      listItem.onclick = () => this.openBrandCard();
    }
    return list;
  }

  private openBrandCard() {
    /* TO-DO */
    /* открывается страница миксер => бренд */
  }

  private searchBy(inputValue: string, category: SearchCategory) {
    const property = this[`${category}`];
    if (!property) return;
    const searchedValue = inputValue.trim().toLowerCase().slice(0, 4);
    if (searchedValue.length === 0) return;
    const filteredArr = property.filter((elem: Brand | Flavor | Mix) => {
      return (
        elem.name.toLowerCase().includes(searchedValue) ||
        (category === 'flavors' &&
          ((elem as Flavor).description.includes(searchedValue) ||
            (elem as Flavor).flavor.join('').includes(searchedValue))) ||
        (category === 'mixes' && (elem as Mix).description.includes(searchedValue))
      );
    });
    return filteredArr.length > 0 ? filteredArr : null;
  }

  private searchByAll(inputValue: string): FoundResults {
    const foundFlavors = <Flavors | null>this.searchBy(inputValue, 'flavors');
    const foundMixes = <Mixes | null>this.searchBy(inputValue, 'mixes');
    const foundBrands = <Brands | null>this.searchBy(inputValue, 'brands');
    if (foundFlavors instanceof Array) foundFlavors.sort((a, b) => sortFoundFlavorResults(a, b, inputValue));
    if (foundMixes instanceof Array) foundMixes.sort((a, b) => sortFoundMixResults(a, b, inputValue));
    if (foundBrands instanceof Array) foundBrands.sort((a, b) => sortFoundBrandResults(a, b, inputValue));
    return {
      foundFlavors,
      foundMixes,
      foundBrands,
    };
  }

  private async checkDataBase() {
    if (this.brands && this.flavors && this.mixes) return;
    this.preloader = new preloader();
    this.preloader.draw();
    this.brands = await this.api.getAllBrands();
    this.flavors = await this.api.getAllFlavors();
    this.mixes = await this.api.getAllMixes();
    this.preloader.removePreloader();
  }

  private async handleEnterKeyOnSearchInput(event: KeyboardEvent) {
    if (event.key !== 'Enter') return;
    document.querySelector('.search-aside')?.classList.add('search-aside--hidden');
    document.querySelector('.suggestions-container')?.remove();
    const input = event.currentTarget;
    if (!(input instanceof HTMLInputElement)) return;
    await this.checkDataBase();
    const result = this.searchByAll(input.value);
    this.foundResults = result;
    this.showSearchResults();
  }

  private autoCompleteMatch(inputValue: string) {
    const reg = new RegExp(inputValue.toLowerCase());
    return this.suggestions.filter((term) => (term.match(reg) ? term : false));
  }

  private handleClickOnSuggestionsItem(suggestion: HTMLLIElement) {
    const searchInput = document.querySelector('.search__input');
    if (!(searchInput instanceof HTMLInputElement)) return;
    searchInput.value = suggestion.textContent ?? '';
    searchInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    document.querySelector('.suggestions-container')?.classList.add('suggestions-container--hidden');
  }

  private createSuggestionsList(predictedQueries: string[]) {
    const suggestionsList = createHTMLElement('suggestions-list');
    const suggestionsListLenght = predictedQueries.length > 10 ? 10 : predictedQueries.length;
    for (let i = 0; i < suggestionsListLenght; i++) {
      const suggestionsListItem = createHTMLElement('suggestions-list__item', 'li');
      suggestionsListItem.textContent = predictedQueries[i];
      suggestionsList.append(suggestionsListItem);
      suggestionsListItem.onclick = () => this.handleClickOnSuggestionsItem(suggestionsListItem as HTMLLIElement);
    }
    return suggestionsList;
  }

  private handleAnyKeyExceptEnterOnSearchInput(input: HTMLInputElement) {
    const asideContainer = document.querySelector('.search-aside');
    if (!asideContainer) return;
    asideContainer.classList.add('search-aside--hidden');
    document.querySelector('.tabs')?.remove();
    document.querySelector('.search-list')?.remove();
    if (this.suggestions.length === 0) return;
    if (!document.querySelector('.suggestions-container')) {
      document.querySelector('.main__container')?.append(createHTMLElement('suggestions-container'));
    }
    const suggestionsContainer = document.querySelector('.suggestions-container');
    if (!suggestionsContainer) return;
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.classList.remove('suggestions-container--hidden');
    const predictedQueries = this.autoCompleteMatch(input.value);
    suggestionsContainer.append(this.createSuggestionsList(predictedQueries));
  }

  private async handleInputSumbit(event: KeyboardEvent, input: HTMLInputElement) {
    const asideContainer = document.querySelector('.search-aside');
    const errorMessage = document.querySelector('.search-error-message');
    errorMessage?.remove();
    if (input.value === '') {
      document.querySelector('.tabs')?.remove();
      asideContainer?.classList.remove('search-aside--hidden');
      document.querySelector('.suggestions-container')?.remove();
      document.querySelector('.search-list')?.remove();
    }
    if (event.key === 'Enter') return this.handleEnterKeyOnSearchInput(event);
    if (event.key !== 'Enter' && input.value !== '') return this.handleAnyKeyExceptEnterOnSearchInput(input);
  }

  private showSearchResults() {
    const container = document.querySelector('.main__container');
    if (!container) return;
    const tabsInTheDOM = document.querySelector('.tabs');
    if (!tabsInTheDOM) container.appendChild(this.createSearchTabs());
    const tabs = document.querySelector('.tabs');
    if (!tabs) return;
    this.makePreviouslyCheckedTabActive(tabs);
  }

  private makePreviouslyCheckedTabActive(tabs: Element) {
    tabs.childNodes.forEach((tab) => {
      if (!(tab instanceof HTMLInputElement)) return;
      tab.checked === true ? tab.click() : false;
    });
  }

  private getSuggestions() {
    if (!this.brands || !this.flavors || !this.mixes) return;
    const brandsNamesArr = this.brands.map((brand) => brand.name.toLowerCase());
    const flavorsNamesArr = this.flavors.map((flavor) => flavor.name.toLowerCase());
    const flavorsFlavorsArr = this.flavors.map((flavor) => flavor.flavor).flat(2);
    const mixesNamesArr = this.mixes.map((mix) => mix.name.toLowerCase());
    this.suggestions = Array.from(
      new Set([...brandsNamesArr, ...flavorsNamesArr, ...flavorsFlavorsArr, ...mixesNamesArr])
    );
  }
}

export default SearchPage;
