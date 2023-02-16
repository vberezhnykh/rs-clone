import { createHTMLElement } from '../../utils/createHTMLElement';
import { Flavors, InterfaceContainerElement } from '../../components/types/types';
import Api from '../../components/api/api';
import backArrowImgSrc from '../../assets/images/back-arrow-white.png';
import closeBtnImgSrc from '../../assets/images/cancel.svg';
import expandArrowImgSrc from '../../assets/images/expand-arrow.png';

const PAGE_TITLE = 'Добавить вкус';
const CATALOG_PAGE_URL = `/mixer/brands`;
const LABEL_BRAND = 'Название бренда';
const BRAND_SELECTOR_TITLE = 'Выбрать бренд';
const LABEL_NAME = 'Название вкуса';
const NAME_INPUT_PLACEHOLDER = 'Введите название вкуса';
const NAME_INPUT_MAX_LENGTH = 50;
const NAME_INPUT_MIN_LENGTH = 3;
const LABEL_DESCRIPTION = 'Описание вкуса';
const DESCRIPTION_INPUT_PLACEHOLDER = 'Введите описание вкуса';
const DESCRIPTION_INPUT_MAX_LENGTH = 250;
const DESCRIPTION_INPUT_MIN_LENGTH = 30;
const LABEL_STRENGTH = 'Крепость';
const STRENGTH = {
  легкий: 'Легкий (Light / Base)',
  средний: 'Средний (Medium / Core)',
  крепкий: 'Крепкий (Strong / Rare)',
};
const LABEL_TAGS = 'Теги';
const TAGS_BTN_TEXT = 'Добавить';
const TAGS_TIPS_TEXT =
  'Теги – категории вкуса, например: сладкий, ягоды и т.д. Ко вкусу можно добавить от 1 до 4 тегов.';
const POPUP_TITLE = 'Выбрать теги';
const MAX_TAGS_LENGTH = 4;
const MIN_TAGS_LENGTH = 1;
const IMAGE_INPUT_CONTAINER_TEXT = 'Добавить картинку вкуса';
const MAX_FILE_SIZE = 1024 * 1024 * 6;
const EXCEEDING_MAX_FILE_SIZE_MESSAGE = 'Файл превышает лимит (6 MB)';
const ADD_BTN_TEXT = 'Добавить в каталог';

type Strength = 'легкий' | 'средний' | 'крепкий';

export class FlavorSuggest implements InterfaceContainerElement {
  flavors: Flavors;
  brands: string[];
  api: Api;
  brand = '';
  name = '';
  description = '';
  strength: Strength;
  selectedFlavorTags: string[] = [];
  image: string;
  constructor() {
    this.api = new Api();
    this.api.getAllFlavors().then((allFlavors) => (this.flavors = allFlavors));
    this.api.getAllBrands().then((allBrands) => (this.brands = allBrands.map((brand) => brand.name)));
  }
  draw() {
    const flavorSuggest = createHTMLElement('flavor-suggest');
    flavorSuggest.appendChild(this.createHeader());
    flavorSuggest.appendChild(this.createFlavorAddForm());
    return flavorSuggest;
  }

  private createHeader() {
    const header = createHTMLElement('flavor-suggest-header');
    header.appendChild(this.createHeaderBackBtn());
    header.appendChild(createHTMLElement('brand-suggest__title', 'h2', PAGE_TITLE));
    return header;
  }

  private createHeaderBackBtn() {
    const backBtn = createHTMLElement('flavor-suggest-header__back-button', 'button');
    backBtn.style.backgroundImage = `url(${backArrowImgSrc})`;
    backBtn.onclick = () => (location.hash = CATALOG_PAGE_URL);
    return backBtn;
  }

  private createFlavorAddForm() {
    const flavorAddForm = createHTMLElement('flavor-suggest-form', 'form');
    flavorAddForm.appendChild(this.createBrandNameContainer());
    flavorAddForm.appendChild(this.createNameContainer());
    flavorAddForm.appendChild(this.createDescriptionContainer());
    flavorAddForm.appendChild(this.createStrengthFieldSet());
    flavorAddForm.appendChild(this.createTagsContainer());
    flavorAddForm.appendChild(this.createImageContainer());
    flavorAddForm.appendChild(this.createSuggestFlavorBtn());
    return flavorAddForm;
  }

  private createBrandNameContainer() {
    const container = createHTMLElement('brand-name-container');
    container.appendChild(createHTMLElement('brand-name__label', 'span', LABEL_BRAND));
    container.appendChild(this.createBrandNameInput());
    container.onclick = () => {
      if (!this.brands) return;
      else this.openBrandSelector();
    };
    return container;
  }

  private createBrandNameInput() {
    const brandNameInput = createHTMLElement('brand-name__input');
    brandNameInput.appendChild(createHTMLElement('brand-name__place'));
    const expandArrowImage = <HTMLImageElement>createHTMLElement('brand-name__img', 'img');
    expandArrowImage.src = expandArrowImgSrc;
    brandNameInput.appendChild(expandArrowImage);
    return brandNameInput;
  }

  private openBrandSelector() {
    const selector = createHTMLElement('brand-selector');
    selector.appendChild(this.createBrandSelectorHeader());
    selector.appendChild(this.createBrandsFieldset());
    document.body.appendChild(selector);
  }

  private createBrandSelectorHeader() {
    const header = createHTMLElement('brand-selector__header');
    header.appendChild(this.createBrandSelectorCloseBtn());
    header.appendChild(createHTMLElement('brand-selector__title', 'h3', BRAND_SELECTOR_TITLE));
    return header;
  }

  private createBrandSelectorCloseBtn() {
    const closeBtn = createHTMLElement('brand-selector__close-btn', 'button');
    closeBtn.style.backgroundImage = `url(${closeBtnImgSrc})`;
    closeBtn.onclick = () => document.querySelector('.brand-selector')?.remove();
    return closeBtn;
  }

  private createBrandsFieldset() {
    const fieldset = createHTMLElement('brand-selector-fieldset', 'fieldset');
    this.brands.forEach((brand) => fieldset.appendChild(this.createBrandOption(brand)));
    return fieldset;
  }

  private createBrandOption(brand: string) {
    const container = createHTMLElement('brand-container');
    const input = <HTMLInputElement>createHTMLElement('brand-selector__input', 'input');
    input.name = 'brand';
    input.type = 'radio';
    if (brand === this.brand) input.checked = true;
    input.onclick = (e) => this.handleBrandNameSelect(brand, e);
    container.appendChild(input);
    container.appendChild(createHTMLElement('brand-selector__label', 'label', brand));
    return container;
  }

  private handleBrandNameSelect(brand: string, e: MouseEvent) {
    const brandName = document.querySelector('.brand-name__place');
    if (!brandName) {
      e.preventDefault();
      return;
    }
    this.brand = brand;
    brandName.textContent = brand;
    this.handleSuggestFlavorBtn();
  }

  private createNameContainer() {
    const label = <HTMLLabelElement>createHTMLElement('name-container');
    label.appendChild(createHTMLElement('name__label', 'label', LABEL_NAME));
    label.appendChild(this.createNameInput());
    return label;
  }

  private createNameInput() {
    const input = <HTMLInputElement>createHTMLElement('name__input', 'input');
    input.placeholder = NAME_INPUT_PLACEHOLDER;
    input.maxLength = NAME_INPUT_MAX_LENGTH;
    input.minLength = NAME_INPUT_MIN_LENGTH;
    input.onkeyup = () => this.handleKeyStrokeOnNameInput(input);
    return input;
  }

  private handleKeyStrokeOnNameInput(input: HTMLInputElement) {
    this.name = FlavorSuggest.processTheInputValue(input.value);
    this.handleSuggestFlavorBtn();
  }

  static processTheInputValue(string: string) {
    const lowerCaseString = string.replace(/\s+/g, ' ').trim().toLowerCase();
    return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
  }

  private createDescriptionContainer() {
    const container = <HTMLLabelElement>createHTMLElement('description-container');
    container.appendChild(createHTMLElement('description__label', 'label', LABEL_DESCRIPTION));
    const textArea = <HTMLTextAreaElement>createHTMLElement('description__input', 'textarea');
    textArea.placeholder = DESCRIPTION_INPUT_PLACEHOLDER;
    textArea.maxLength = DESCRIPTION_INPUT_MAX_LENGTH;
    textArea.minLength = DESCRIPTION_INPUT_MIN_LENGTH;
    textArea.onkeyup = () => {
      this.description = textArea.value.trim().replace(/\s+/g, ' ');
      this.handleSuggestFlavorBtn();
    };
    container.appendChild(textArea);
    return container;
  }

  private createStrengthFieldSet() {
    const fieldset = <HTMLFieldSetElement>createHTMLElement('strength-fieldset', 'fieldset');
    fieldset.appendChild(createHTMLElement('strength-fieldset__legend', 'legend', LABEL_STRENGTH));
    for (const key in STRENGTH) {
      fieldset.appendChild(this.createStrengthContainer(key));
    }
    return fieldset;
  }

  private createStrengthContainer(key: string) {
    const container = createHTMLElement('strength-fieldset__strength-container');
    container.appendChild(this.createStrengthInput(key));
    container.appendChild(createHTMLElement('strength-fieldset__label', 'label', STRENGTH[key as Strength]));
    return container;
  }

  private createStrengthInput(key: string) {
    const input = <HTMLInputElement>createHTMLElement('strength-fieldset__input', 'input');
    input.type = 'radio';
    input.name = 'strength';
    input.onclick = () => this.handleClickOnStrengthInput(key);
    return input;
  }

  private handleClickOnStrengthInput(key: string) {
    this.strength = key as Strength;
    this.handleSuggestFlavorBtn();
  }

  private createTagsContainer() {
    const tagsContainer = createHTMLElement('tags');
    tagsContainer.appendChild(createHTMLElement('tags__label', 'span', LABEL_TAGS));
    tagsContainer.appendChild(createHTMLElement('selected-tags'));
    tagsContainer.appendChild(this.createAddTagBtn());
    tagsContainer.appendChild(this.createTagsTips());
    return tagsContainer;
  }

  private createTagsTips() {
    const container = createHTMLElement('tags-tips-container');
    container.appendChild(createHTMLElement('tags__tips', 'span', TAGS_TIPS_TEXT));
    container.appendChild(
      createHTMLElement('tags__counter', 'span', `${this.selectedFlavorTags.length} / ${MAX_TAGS_LENGTH}`)
    );
    return container;
  }

  private createAddTagBtn() {
    const addButton = <HTMLButtonElement>createHTMLElement('tags__button', 'button', TAGS_BTN_TEXT);
    addButton.type = 'button';
    addButton.onclick = () => {
      if (!this.flavors) return;
      else document.body.appendChild(this.createTagsPopUp());
    };
    return addButton;
  }

  private createTagsPopUp() {
    const popup = createHTMLElement('tags-popup');
    popup.appendChild(this.createPopUpHeader());
    popup.appendChild(this.createTagsFieldSet());
    return popup;
  }

  private createPopUpHeader() {
    const header = createHTMLElement('tags-popup__header');
    header.appendChild(this.createClosePopUpBtn());
    header.appendChild(createHTMLElement('tags-popup__title', 'h3', POPUP_TITLE));
    return header;
  }

  private createClosePopUpBtn() {
    const closeBtn = createHTMLElement('tags-popup__close-btn', 'button');
    closeBtn.style.backgroundImage = `url(${closeBtnImgSrc})`;
    closeBtn.onclick = () => document.querySelector('.tags-popup')?.remove();
    return closeBtn;
  }

  private createTagsFieldSet() {
    const fieldset = createHTMLElement('tags-popup-fieldset', 'fieldset');
    const flavorsTags = [...new Set(this.flavors.map((flavor) => flavor.flavor).flat(2))];
    flavorsTags.forEach((flavorTag) => fieldset.appendChild(this.createTagContainer(flavorTag)));
    return fieldset;
  }

  private createTagContainer(flavorTag: string) {
    const container = createHTMLElement('tag-container');
    container.appendChild(this.createTagInput(flavorTag));
    container.appendChild(createHTMLElement('tags-popup__label', 'label', flavorTag));
    return container;
  }

  private createTagInput(flavorTag: string) {
    const input = <HTMLInputElement>createHTMLElement('tags-popup__input', 'input');
    input.type = 'checkbox';
    input.value = flavorTag;
    if (this.selectedFlavorTags.includes(flavorTag)) input.checked = true;
    input.onclick = (e) => this.handleClickOnTag(e, input);
    return input;
  }

  private handleClickOnTag(e: MouseEvent, input: HTMLInputElement) {
    const selectedTags = document.querySelector('.selected-tags');

    if (!selectedTags) {
      e.preventDefault();
      return;
    }
    if (input.checked) {
      this.selectedFlavorTags.push(input.value);
      selectedTags.appendChild(this.createSelectedTag(input.value));
    } else {
      this.selectedFlavorTags.splice(this.selectedFlavorTags.indexOf(input.value), 1);
      document.getElementById(input.value)?.remove();
    }
    this.handleTagsCounter();
  }

  private handleTagsCounter() {
    const counter = document.querySelector('.tags__counter');
    if (!counter) return;
    counter.textContent = `${this.selectedFlavorTags.length} / ${MAX_TAGS_LENGTH}`;
    if (this.selectedFlavorTags.length > MAX_TAGS_LENGTH) counter.classList.add('tags__counter--exceed');
    else counter.classList.remove('tags__counter--exceed');
    this.handleSuggestFlavorBtn();
  }

  private createSelectedTag(inputValue: string) {
    const selectedTag = <HTMLButtonElement>createHTMLElement('selected-tag', 'button', inputValue.toUpperCase());
    const removeSelectedTagBtn = new Image();
    removeSelectedTagBtn.src = closeBtnImgSrc;
    removeSelectedTagBtn.onclick = () => this.handleRemovingOfSelectedTag(selectedTag, inputValue);
    selectedTag.appendChild(removeSelectedTagBtn);
    selectedTag.id = inputValue;
    return selectedTag;
  }

  private handleRemovingOfSelectedTag(selectedTag: HTMLButtonElement, inputValue: string) {
    selectedTag.remove();
    this.selectedFlavorTags.splice(this.selectedFlavorTags.indexOf(inputValue), 1);
    this.handleTagsCounter();
  }

  private createImageContainer() {
    const container = createHTMLElement('image-container', 'div', IMAGE_INPUT_CONTAINER_TEXT);
    const input = this.createImageInput();
    container.appendChild(input);
    container.onclick = () => input.click();
    input.onchange = (e) => this.handleImageLoading(input, e, container);
    return container;
  }

  private createImageInput() {
    const input = <HTMLInputElement>createHTMLElement('image__input-image', 'input');
    input.type = 'file';
    input.accept = 'image/*';
    input.hidden = true;
    return input;
  }

  private handleImageLoading(input: HTMLInputElement, e: Event, container: HTMLElement) {
    if (!input.files) return;
    const uploadedFile = input.files[0];
    if (uploadedFile.size > MAX_FILE_SIZE) return this.handleExceedingOfMaxSize(e);
    const reader = new FileReader();
    reader.readAsDataURL(uploadedFile);
    reader.onload = () => {
      const src = reader.result;
      if (typeof src !== 'string' /* || brandLogoPreview === null */) return;
      /* const image = new Image();
      image.src = src; */
      container.textContent = '';
      container.style.backgroundImage = `url(${src})`;
    };
  }

  private handleExceedingOfMaxSize(e: Event) {
    alert(EXCEEDING_MAX_FILE_SIZE_MESSAGE);
    e.preventDefault();
    return;
  }

  private createSuggestFlavorBtn() {
    const button = <HTMLButtonElement>createHTMLElement('flavor-suggest__button', 'button', ADD_BTN_TEXT);
    button.disabled = true;
    return button;
  }

  private handleSuggestFlavorBtn() {
    const button = document.querySelector('.flavor-suggest__button');
    if (!button || !(button instanceof HTMLButtonElement)) return;
    if (this.isValidData()) {
      button.disabled = false;
      /* this.api.setNewFlavor({
        brand: this.brand,
        name: this.name,
        description: this.description,
        image: '1',
        strength: this.strength,
        flavor: this.selectedFlavorTags,
      }); */
    } else button.disabled = true;
  }

  private isValidData() {
    return (
      this.isValidName() &&
      this.isValidBrandName() &&
      this.isValidDescription() &&
      this.isValidStrength() &&
      this.isValidSelectedFlavorTags() &&
      this.isValidImage()
    );
  }

  private isValidName() {
    return this.name.length >= NAME_INPUT_MIN_LENGTH && this.name.length < NAME_INPUT_MAX_LENGTH;
  }

  private isValidBrandName() {
    return Boolean(this.brand);
  }

  private isValidDescription() {
    return (
      this.description.length >= DESCRIPTION_INPUT_MIN_LENGTH && this.description.length < DESCRIPTION_INPUT_MAX_LENGTH
    );
  }

  private isValidStrength() {
    return Boolean(this.strength);
  }

  private isValidSelectedFlavorTags() {
    return this.selectedFlavorTags.length >= MIN_TAGS_LENGTH && this.selectedFlavorTags.length < MAX_TAGS_LENGTH;
  }

  private isValidImage() {
    return true;
  }
}
