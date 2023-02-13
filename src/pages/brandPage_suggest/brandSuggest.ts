import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';
import backArrowImgSrc from '../../assets/images/back-arrow-white.png';

const PAGE_TITLE = 'Добавить бренд';
const LABEL_TEXT = 'Название бренда';
const BUTTON_TEXT = 'Добавить в каталог';
const POPUP_TITLE = 'Спасибо за заявку!';
const POPUP_TEXT = 'Заявка на добавление бренда отправлена. Бренд скоро появится в каталоге.';
const POPUP_BUTTON_TEXT = 'Хорошо';
const CATALOG_PAGE_URL = `/mixer/brands`;

export class BrandSuggest implements InterfaceContainerElement {
  private inputValue?: string;
  draw() {
    const brandSuggest = createHTMLElement('brand-suggest', 'div');
    brandSuggest.appendChild(this.createHeader());
    brandSuggest.appendChild(this.createBrandAddForm());
    return brandSuggest;
  }

  private createHeader() {
    const header = createHTMLElement('brand-suggest-header', 'div');
    header.appendChild(this.createHeaderBackBtn());
    header.appendChild(createHTMLElement('brand-suggest__title', 'h2', PAGE_TITLE));
    return header;
  }

  private createHeaderBackBtn() {
    const backBtn = createHTMLElement('brand__back-button', 'button');
    backBtn.style.backgroundImage = `url(${backArrowImgSrc})`;
    backBtn.onclick = () => (location.hash = CATALOG_PAGE_URL);
    return backBtn;
  }

  private createBrandAddForm() {
    const brandAddForm = createHTMLElement('brand-form', 'form');
    brandAddForm.appendChild(createHTMLElement('brand-form__label', 'label', LABEL_TEXT));
    const suggestBrandBtn = this.createSuggestBrandButton();
    brandAddForm.appendChild(this.createInput(suggestBrandBtn));
    brandAddForm.appendChild(suggestBrandBtn);
    return brandAddForm;
  }

  private createInput(suggestBrandButton: HTMLButtonElement) {
    const input = <HTMLInputElement>createHTMLElement('brand-form__input', 'input');
    input.onkeyup = () => {
      this.inputValue = input.value;
      if (input.value.length < 2) suggestBrandButton.disabled = true;
      else suggestBrandButton.disabled = false;
    };
    return input;
  }

  private createSuggestBrandButton() {
    const button = <HTMLButtonElement>createHTMLElement('brand-form__button', 'button', BUTTON_TEXT);
    button.disabled = true;
    button.onclick = () => {
      /* Собрать данные из формы и отправить на бэк */
      button.disabled = true;
      document.querySelector('.brand-suggest')?.before(this.createPopUp());
    };
    return button;
  }

  private createPopUp() {
    const overlay = createHTMLElement('suggest-overlay');
    const popUp = createHTMLElement('suggest-popup');
    popUp.appendChild(createHTMLElement('suggest-popup__title', 'h4', POPUP_TITLE));
    popUp.appendChild(createHTMLElement('suggest-popup__text', 'p', POPUP_TEXT));
    const button = createHTMLElement('suggest-popup__button', 'button', POPUP_BUTTON_TEXT);
    button.onclick = () => {
      window.location.hash = CATALOG_PAGE_URL;
      document.querySelector('.suggest-overlay')?.remove();
    };
    popUp.appendChild(button);
    overlay.appendChild(popUp);
    return overlay;
  }
}
