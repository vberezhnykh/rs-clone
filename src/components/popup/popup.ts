import { createHTMLElement } from '../../utils/createHTMLElement';
import cancel from '../../assets/images/cancel.svg';
import { Flavor } from '../../components/types/types';
import Api from '../../components/api/api';

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
        <button class="button button-3">Добавить в миксер</button>
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

export function openFlavorPopup(flaverObj: Flavor): void {
  const api = new Api();
  (<HTMLElement>document.querySelector('.popup-flavor__img')).setAttribute('src', api.getImage(flaverObj.image));
  (<HTMLElement>document.querySelector('.popup-flavor__title')).innerHTML = `${flaverObj.name}`;
  (<HTMLElement>document.querySelector('.popup-flavor__desc')).innerHTML = `${flaverObj.description}`;
  (<HTMLElement>document.querySelector('.popup-flavor__must')).children[0].innerHTML = `${flaverObj.brand}`;
  (<HTMLElement>document.querySelector('.popup-flavor')).style.display = 'block';
}
