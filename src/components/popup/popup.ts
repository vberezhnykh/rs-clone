import { createHTMLElement } from '../../utils/createHTMLElement';
import cancel from '../../assets/images/cancel.svg';
import { Flavor, Flavors } from '../../components/types/types';
import Api from '../../components/api/api';
import { getFlavorsInMixer } from '../../utils/getFlavorsInMixer';
import { handleChangeOfFlavorsInMixer } from '../../utils/changeFlavorNum';

const ADD_BUTTON_TEXT = 'Добавить в миксер';
const REMOVE_BUTTON_TEXT = 'Удалить из миксера';

export function createPopup(elem: HTMLElement): void {
  if (!document.querySelector('.popup-flavor')) {
    const flavor = createHTMLElement('popup-flavor');
    flavor.innerHTML = `<div class="popup-flavor__inner">
        <img src="" class="popup-flavor__img">
        <img src="${cancel}" class="popup-flavor__img-cancel">
        <div class="popup-flavor__info">
          <div class="popup-flavor__title"></div>
          <div class="popup-flavor__desc"></div>
          <div class="popup-flavor__must"><button class="button button-2"></button></div>
        </div>
        <div class="popup-flavor__buttons">
        <button class="button button-3 popup-flavor__add-button">${ADD_BUTTON_TEXT}</button>
        <button class="button button-3">Подобрать миксы со вкусом</button>
        </div>
      </div>`;
    elem.appendChild(flavor);
    flavor.onclick = (e) => {
      if ((<HTMLElement>e.target).classList.contains('popup-flavor__img-cancel'))
        (<HTMLElement>document.querySelector('.popup-flavor')).style.display = 'none';
    };
  }
}

export function openFlavorPopup(flavorObj: Flavor, addButtonOnBrandPageOrMixerPage?: Element): void {
  const api = new Api();
  (<HTMLElement>document.querySelector('.popup-flavor__img')).setAttribute('src', api.getImage(flavorObj.image));
  (<HTMLElement>document.querySelector('.popup-flavor__title')).innerHTML = `${flavorObj.name}`;
  (<HTMLElement>document.querySelector('.popup-flavor__desc')).innerHTML = `${flavorObj.description}`;
  (<HTMLElement>document.querySelector('.popup-flavor__must')).children[0].innerHTML = `${flavorObj.brand}`;
  (<HTMLElement>document.querySelector('.popup-flavor')).style.display = 'block';
  const addButton = document.querySelector('.popup-flavor__add-button');
  if (!(addButton instanceof HTMLElement)) return;
  markButtonIfFlavorAddedToMixer(flavorObj, addButton);
  addButton.onclick = () => handleClickOnAddButton(addButton, flavorObj, addButtonOnBrandPageOrMixerPage);
}

function markButtonIfFlavorAddedToMixer(flavorObj: Flavor, addButton: Element) {
  const index = getFlavorsInMixer().findIndex((flavor) => flavor.id === flavorObj.id);
  if (index === -1) {
    addButton.classList.remove('popup-flavor__added-button');
    addButton.textContent = ADD_BUTTON_TEXT;
  } else {
    addButton.classList.add('popup-flavor__added-button');
    addButton.textContent = REMOVE_BUTTON_TEXT;
  }
}

function handleClickOnAddButton(addButton: HTMLElement, flavor: Flavor, addBtnOnBrandPageOrMixerPage?: Element) {
  if (!(addButton instanceof HTMLButtonElement)) return;
  addButton.classList.toggle('popup-flavor__added-button');
  const flavorsInMixer = getFlavorsInMixer();
  const indexOfFlavorInMixer = flavorsInMixer.findIndex((flavorInMixer) => flavorInMixer.id === flavor.id);
  if (addButton.classList.contains('popup-flavor__added-button') && indexOfFlavorInMixer === -1) {
    addFlavorToMixer(addButton, flavorsInMixer, flavor, addBtnOnBrandPageOrMixerPage);
  } else {
    removeFlavorFromMixer(addButton, flavorsInMixer, indexOfFlavorInMixer, addBtnOnBrandPageOrMixerPage);
    if (!addBtnOnBrandPageOrMixerPage?.classList.contains('mixer-now__info-btn')) return;
    removeFlavorFromMixerPage(addBtnOnBrandPageOrMixerPage);
  }
  localStorage.setItem('flavors', JSON.stringify(flavorsInMixer));
  handleChangeOfFlavorsInMixer();
}

function removeFlavorFromMixer(
  addButton: HTMLButtonElement,
  flavorsInMixer: Flavors,
  indexOfFlavorInMixer: number,
  addButtonOnBrandPage: Element | undefined
) {
  addButton.textContent = ADD_BUTTON_TEXT;
  flavorsInMixer.splice(indexOfFlavorInMixer, 1);
  if (addButtonOnBrandPage) addButtonOnBrandPage.classList.remove('flavor__image--added');
}

function addFlavorToMixer(
  addButton: HTMLButtonElement,
  flavorsInMixer: Flavors,
  flavor: Flavor,
  addButtonOnBrandPage: Element | undefined
) {
  addButton.textContent = REMOVE_BUTTON_TEXT;
  flavorsInMixer.push(flavor);
  if (addButtonOnBrandPage) addButtonOnBrandPage.classList.add('flavor__image--added');
}

function removeFlavorFromMixerPage(btn: Element) {
  const removeButton = btn.nextElementSibling;
  if (!removeButton) return;
  (removeButton as HTMLElement).click();
}
