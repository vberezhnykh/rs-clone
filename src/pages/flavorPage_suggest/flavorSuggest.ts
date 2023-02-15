import { createHTMLElement } from '../../utils/createHTMLElement';
import { Brands, Flavors, InterfaceContainerElement } from '../../components/types/types';
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
const LABEL_DESCRIPTION = 'Описание вкуса';
const DESCRIPTION_INPUT_PLACEHOLDER = 'Введите описание вкуса';
const DESCRIPTION_INPUT_MAX_LENGTH = 250;
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
    const backBtn = createHTMLElement('flavor-suggest__back-button', 'button');
    backBtn.style.backgroundImage = `url(${backArrowImgSrc})`;
    backBtn.onclick = () => (location.hash = CATALOG_PAGE_URL);
    return backBtn;
  }

  private createFlavorAddForm() {
    const flavorAddForm = createHTMLElement('flavor-form', 'form');
    flavorAddForm.appendChild(this.createBrandNameInput());
    flavorAddForm.appendChild(this.createNameInput());
    flavorAddForm.appendChild(this.createDescriptionInput());
    flavorAddForm.appendChild(this.createStrengthFieldSet());
    flavorAddForm.appendChild(this.createTagsInput());
    flavorAddForm.appendChild(this.createImageInput());
    flavorAddForm.appendChild(this.createSuggestFlavorBtn());
    return flavorAddForm;
  }

  private createBrandNameInput() {
    const container = createHTMLElement('brand-name-container');
    container.appendChild(createHTMLElement('flavor-suggest__brand-name-label', 'span', LABEL_BRAND));
    const brandNameInput = createHTMLElement('flavor-suggest__brand-name');
    brandNameInput.appendChild(createHTMLElement('brand-name-input'));
    const arrowImage = <HTMLImageElement>createHTMLElement('flavor-suggest__brand-name-img', 'img');
    arrowImage.src = expandArrowImgSrc;
    brandNameInput.appendChild(arrowImage);
    container.appendChild(brandNameInput);
    container.onclick = () => {
      if (!this.brands) return;
      else this.openBrandSelector();
    };
    return container;
  }

  private openBrandSelector() {
    const selector = createHTMLElement('brand-selector');
    selector.appendChild(this.createBrandSelectorHeader());
    selector.appendChild(this.createBrandsFieldset());
    document.body.appendChild(selector);
  }

  private createBrandSelectorHeader() {
    const header = createHTMLElement('brand-selector__header');
    header.appendChild(this.createCloseBrandSelectorBtn());
    header.appendChild(createHTMLElement('brand-selector__title', 'h3', BRAND_SELECTOR_TITLE));
    return header;
  }

  private createCloseBrandSelectorBtn() {
    const closeBtn = createHTMLElement('brand-selector__close-btn', 'button');
    closeBtn.style.backgroundImage = `url(${closeBtnImgSrc})`;
    closeBtn.onclick = () => document.querySelector('.brand-selector')?.remove();
    return closeBtn;
  }

  private createBrandsFieldset() {
    const fieldset = createHTMLElement('brand-selector-fieldset', 'fieldset');
    // const flavorsTags = [...new Set(this.brands.map((brand) => brand).flat(2))];
    this.brands.forEach((brand) => fieldset.appendChild(this.createBrandInput(brand)));
    return fieldset;
  }

  private createBrandInput(brand: string) {
    const container = createHTMLElement('brand-container');
    const input = <HTMLInputElement>createHTMLElement('brand-selector__input', 'input');
    input.name = 'brand';
    input.type = 'radio';
    if (brand === this.brand) input.checked = true;
    input.onclick = (e) => this.handleClickOnBrandNameInput(brand, e);
    container.appendChild(input);
    container.appendChild(createHTMLElement('brand-selector__label', 'label', brand));
    return container;
  }

  private handleClickOnBrandNameInput(brand: string, e: MouseEvent) {
    const brandName = document.querySelector('.brand-name-input');
    if (!brandName) {
      e.preventDefault();
      return;
    }
    this.brand = brand;
    brandName.textContent = brand;
  }

  private createNameInput() {
    const label = <HTMLLabelElement>createHTMLElement('flavor-suggest__name', 'label');
    label.appendChild(createHTMLElement('flavor-suggest__name-label', 'span', LABEL_NAME));
    const input = <HTMLInputElement>createHTMLElement('flavor-suggest__name-input', 'input');
    input.placeholder = NAME_INPUT_PLACEHOLDER;
    input.maxLength = NAME_INPUT_MAX_LENGTH;
    input.onkeyup = () => (this.name = input.value.trim());
    label.appendChild(input);
    return label;
  }

  private createDescriptionInput() {
    const label = <HTMLLabelElement>createHTMLElement('flavor-suggest__description', 'label');
    label.appendChild(createHTMLElement('flavor-suggest__description-label', 'label', LABEL_DESCRIPTION));
    const textArea = <HTMLTextAreaElement>createHTMLElement('flavor-suggest__description-input', 'textarea');
    textArea.placeholder = DESCRIPTION_INPUT_PLACEHOLDER;
    textArea.maxLength = DESCRIPTION_INPUT_MAX_LENGTH;
    textArea.onkeyup = () => (this.description = textArea.value.trim());
    label.appendChild(textArea);
    return label;
  }

  private createStrengthFieldSet() {
    const fieldset = <HTMLFieldSetElement>createHTMLElement('flavor-suggest__strength', 'fieldset');
    fieldset.appendChild(createHTMLElement('flavor-suggest__strength-legend', 'legend', LABEL_STRENGTH));
    for (const key in STRENGTH) {
      const container = createHTMLElement('flavor-suggest__strength-container');
      const input = <HTMLInputElement>createHTMLElement('flavor-suggest__strength-input', 'input');
      input.type = 'radio';
      input.name = 'strength';
      container.appendChild(input);
      const label = <HTMLLabelElement>(
        createHTMLElement('flavor-suggest__strength-label', 'label', STRENGTH[key as Strength])
      );
      container.appendChild(label);
      input.onclick = () => (this.strength = key as Strength);
      fieldset.appendChild(container);
    }
    return fieldset;
  }

  private createTagsInput() {
    const tagsContainer = createHTMLElement('flavor-suggest__tags');
    tagsContainer.appendChild(createHTMLElement('flavor-suggest__tags-label', 'span', LABEL_TAGS));
    tagsContainer.appendChild(createHTMLElement('selected-tags'));
    tagsContainer.appendChild(this.createAddTagsBtn());
    tagsContainer.appendChild(this.createTagsTips());
    return tagsContainer;
  }

  private createTagsTips() {
    const container = createHTMLElement('tags-tips-cointainer');
    container.appendChild(createHTMLElement('flavor-suggest__tags-tips', 'span', TAGS_TIPS_TEXT));
    container.appendChild(
      createHTMLElement('tags-counter', 'span', `${this.selectedFlavorTags.length} / ${MAX_TAGS_LENGTH}`)
    );
    return container;
  }

  private createAddTagsBtn() {
    const addButton = createHTMLElement('flavor-suggest__tags-button', 'button', TAGS_BTN_TEXT);
    addButton.onclick = () => {
      if (!this.flavors) return;
      else this.openTagsPopUp();
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

  private openTagsPopUp() {
    document.body.appendChild(this.createTagsPopUp());
  }

  private createTagsFieldSet() {
    const fieldset = createHTMLElement('tags-popup-fieldset', 'fieldset');
    const flavorsTags = [...new Set(this.flavors.map((flavor) => flavor.flavor).flat(2))];
    flavorsTags.forEach((flavorTag) => fieldset.appendChild(this.createTagInput(flavorTag)));
    return fieldset;
  }

  private createTagInput(flavorTag: string) {
    const container = createHTMLElement('tag-container');
    const input = <HTMLInputElement>createHTMLElement('tags-popup__input', 'input');
    input.type = 'checkbox';
    input.value = flavorTag;
    if (this.selectedFlavorTags.includes(flavorTag)) input.checked = true;
    input.onclick = (e) => this.handleClickOnTag(e, input);
    container.appendChild(input);
    container.appendChild(createHTMLElement('tags-popup__label', 'label', flavorTag));
    return container;
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
    const counter = document.querySelector('.tags-counter');
    if (!counter) return;
    counter.textContent = `${this.selectedFlavorTags.length} / ${MAX_TAGS_LENGTH}`;
    if (this.selectedFlavorTags.length > MAX_TAGS_LENGTH) counter.classList.add('tags-counter--exceed');
    else counter.classList.remove('tags-counter--exceed');
  }

  private createSelectedTag(inputValue: string) {
    const selectedTag = <HTMLButtonElement>createHTMLElement('selected-tag', 'button', inputValue.toUpperCase());
    const removeSelectedTag = new Image();
    removeSelectedTag.src = closeBtnImgSrc;
    removeSelectedTag.onclick = () => {
      selectedTag.remove();
      this.selectedFlavorTags.splice(this.selectedFlavorTags.indexOf(inputValue), 1);
      this.handleTagsCounter();
    };
    selectedTag.appendChild(removeSelectedTag);
    selectedTag.id = inputValue;
    return selectedTag;
  }

  private createImageInput() {
    const container = createHTMLElement('flavor-suggest__image-container', 'div', IMAGE_INPUT_CONTAINER_TEXT);
    const input = <HTMLInputElement>createHTMLElement('flavor-suggest__input-image', 'input');
    input.type = 'file';
    input.accept = 'image/*';
    input.hidden = true;
    container.appendChild(input);
    container.onclick = () => input.click();
    input.onchange = (e) => {
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
    };
    return container;
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
}
