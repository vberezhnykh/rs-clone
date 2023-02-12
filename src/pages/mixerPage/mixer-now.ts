import { Flavor, Flavors, InterfaceContainerElement, Mixes } from '../../components/types/types';
import { createHTMLElement } from '../../utils/createHTMLElement';
import backArrowImgSrc from '../../assets/images/back-arrow-white.png';
import { getFlavorsInMixer } from '../../utils/getFlavorsInMixer';
import infoImgSrc from '../../assets/images/info.svg';
import removeImgSrc from '../../assets/images/add-new.png';
import { createPopup, openFlavorPopup } from '../../components/popup/popup';
import { changeFlavorNumInHeader } from '../../utils/changeFlavorNum';
import Api from '../../components/api/api';
import { MixerNowResult } from '../../components/mixer-result';

const MIXER_PAGE_URL = `/mixer`;
const PAGE_TITLE = 'Миксер';
const EMPTY_MESSAGE = 'Сейчас в миксере пусто. Чтобы найти миксы, добавьте в миксер вкусы из каталога';
const NOT_EMPTY_MESSAGE = 'Сейчас в миксере:';
const CONTINUE_BTN_TEXT = 'Найти миксы';

export class MixerNowPage implements InterfaceContainerElement {
  api: Api;
  constructor() {
    this.api = new Api();
  }
  draw() {
    const mixerNowPage = createHTMLElement('mixer-now');
    mixerNowPage.appendChild(this.createHeader());
    mixerNowPage.appendChild(this.createMixerNowContainer());
    mixerNowPage.appendChild(this.createContinueButton());
    createPopup(mixerNowPage);
    return mixerNowPage;
  }

  private createHeader() {
    const header = createHTMLElement('mixer-now-header');
    header.appendChild(this.createHeaderBackBtn());
    header.appendChild(createHTMLElement('mixer-now__title', 'h2', PAGE_TITLE));
    return header;
  }

  private createHeaderBackBtn() {
    const backBtn = createHTMLElement('mixer-now__back-button', 'button');
    backBtn.style.backgroundImage = `url(${backArrowImgSrc})`;
    backBtn.onclick = () => (window.location.hash = MIXER_PAGE_URL);
    return backBtn;
  }

  private createMixerNowContainer() {
    const mixerNowContainer = createHTMLElement('mixer-now__container');
    const flavorsInMixer = getFlavorsInMixer();
    if (flavorsInMixer.length === 0)
      mixerNowContainer.appendChild(
        createHTMLElement(['mixer-now__message--empty', 'mixer-now__message'], 'span', EMPTY_MESSAGE)
      );
    else {
      mixerNowContainer.appendChild(createHTMLElement('mixer-now__message', 'span', NOT_EMPTY_MESSAGE));
      mixerNowContainer.appendChild(this.createMixerList(flavorsInMixer));
    }
    return mixerNowContainer;
  }

  private createMixerList(flavorsInMixer: Flavors) {
    const mixerList = createHTMLElement('mixer-now-list', 'ul');
    for (let i = 0; i < flavorsInMixer.length; i++) {
      mixerList.appendChild(this.createMixerListItem(flavorsInMixer, i));
    }
    return mixerList;
  }

  private createMixerListItem(flavorsInMixer: Flavors, i: number) {
    const listItem = createHTMLElement('mixer-now-list__item', 'li');
    listItem.appendChild(this.createFlavorInfo(flavorsInMixer, i));
    listItem.appendChild(this.createButton('mixer-now__info-btn', infoImgSrc, flavorsInMixer[i]));
    listItem.appendChild(this.createButton('mixer-now__remove-btn', removeImgSrc, flavorsInMixer[i]));
    return listItem;
  }

  private createFlavorInfo(flavorsInMixer: Flavors, i: number) {
    const flavorInfo = createHTMLElement('mixer-now__flavor-info');
    flavorInfo.appendChild(createHTMLElement('mixer-now__flavor-name', 'span', flavorsInMixer[i].name));
    flavorInfo.appendChild(createHTMLElement('mixer-now__flavor-brand', 'span', flavorsInMixer[i].brand));
    return flavorInfo;
  }

  private createButton(className: string, src: string, flavor: Flavor) {
    const button = new Image();
    button.className = className;
    button.src = src;
    if (className === 'mixer-now__remove-btn') button.onclick = () => this.handleClickOnAddButton(flavor, button);
    else if (className === 'mixer-now__info-btn') button.onclick = () => this.handleClickOnInfoButton(flavor, button);
    return button;
  }

  private handleClickOnAddButton(flavor: Flavor, button: HTMLImageElement) {
    const flavorsInMixer = getFlavorsInMixer();
    const indexOfFlavorInMixer = flavorsInMixer.findIndex((flavorInMixer) => flavorInMixer.id === flavor.id);
    flavorsInMixer.splice(indexOfFlavorInMixer, 1);
    localStorage.setItem('flavors', JSON.stringify(flavorsInMixer));
    button.parentElement?.remove();
    changeFlavorNumInHeader();
    if (flavorsInMixer.length === 0) {
      this.rerenderMixerNowContainer();
      const continueBtn = document.querySelector('.mixer-now__continue-btn');
      if (continueBtn instanceof HTMLButtonElement) continueBtn.disabled = true;
    }
  }

  private handleClickOnInfoButton(flavor: Flavor, button: HTMLImageElement) {
    openFlavorPopup(flavor, button);
  }

  private rerenderMixerNowContainer() {
    const mixerNow = document.querySelector('.mixer-now__container');
    if (!mixerNow) return;
    mixerNow.replaceWith(this.createMixerNowContainer());
  }

  private createContinueButton() {
    const continueButton = <HTMLButtonElement>createHTMLElement('mixer-now__continue-btn', 'button', CONTINUE_BTN_TEXT);
    const flavorsInMixer = getFlavorsInMixer();
    if (flavorsInMixer.length === 0) continueButton.disabled = true;
    else continueButton.disabled = false;
    continueButton.onclick = () => this.handleClickOnContinueBtn();

    return continueButton;
  }

  private async handleClickOnContinueBtn() {
    const matchingMixes = await this.getMatchingMixes();
    document.body.appendChild(new MixerNowResult(matchingMixes).create());
    console.log(matchingMixes);
  }

  private async getMatchingMixes() {
    const flavorsInMixerIds = getFlavorsInMixer().map((flavorInMixer) => flavorInMixer.id);
    const allMixes = await this.api.getAllMixes();
    const matchingMixes: Mixes = [];
    allMixes.forEach((mix) => {
      const composition = mix.compositionById;
      if (!(composition instanceof Object)) return;
      flavorsInMixerIds.forEach((flavorInMixerId) => {
        if (!Object.values(composition).includes(flavorInMixerId)) return;
        const index = matchingMixes.findIndex((matchingMix) => matchingMix.id === mix.id);
        if (index === -1) matchingMixes.push(mix);
      });
    });
    return matchingMixes;
  }
}
