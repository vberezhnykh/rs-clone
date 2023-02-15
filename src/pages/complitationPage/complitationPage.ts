import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';
import { Mix, Mixes, Flavors, PromiseFlavors, Flavor, mixRate } from '../../components/types/types';
import Api from '../../components/api/api';
import preloader from '../../components/preloader/preloader';
import ApiMix from '../../components/api_mix/api_mix';
import backArrow from '../../assets/images/back-arrow-white.png';
import ratingStarIconSrc from '../../assets/images/star-empty.svg';
import favoriteIconSrc from '../../assets/images/favorite.svg';
import favoriteActiveIconSrc from '../../assets/images/favorite_active.svg';
import Header from '../../components/header/header';

class ComplitationPage implements InterfaceContainerElement {
  private header:InterfaceContainerElement;
  private api: Api;
  private mix: Mix;
  private preloader: preloader;
  // private apiMix: ApiMix;
  private brandId: number;
  private mixes: Mixes;
  private flavors: Flavors;
  
  private brand = 1;
  constructor() {
    this.brandId = Number(window.location.hash.split('complitation/')[window.location.hash.split('complitation/').length - 1]);
    this.api = new Api();
    this.header= new Header();
    this.getData();
  }
  private async getData() {
    this.preloader = new preloader();
    this.preloader.draw();
    this.flavors = await this.api.getAllFlavors();
    this.mixes = await this.api.getAllMixes();

    this.draw();
    this.preloader.removePreloader();
  }

  changeHeader(): void {
    const header = document.querySelector('.header')
    const headercontainer = document.querySelector('.header__container');
    if (header && headercontainer) {
      header.classList.add('header-brusko');
      headercontainer.classList.add('container-complitation');
      headercontainer.innerHTML = `<div class="complitation__buttons"><img src="${backArrow}" alt="back-arrow" class="arrow-back"></div>
      <div class="complitation__title">Brusko</div>`;
    }
  }



  draw(): HTMLElement {
    if (this.mixes === undefined) {
      const main = createHTMLElement('main', 'main');
      return main;
    } else {
      const main = document.querySelector('.main') as HTMLElement;
      const maincontainer = createHTMLElement(['main__container', 'container']);
      maincontainer.innerHTML = `<div class="mixes-list mixes-list-complitation"></div>`;
      main.append(maincontainer);
      const brandArr = this.flavors.filter(e => (e.brand).replace(/[\s-]/g, '').toLocaleLowerCase() === 'Burn'.replace(/[\s-]/g, '').toLocaleLowerCase()).map(e => e.id);
      const brandComplitationArr = this.mixes.filter(e => Object.values(e.compositionById).every(v => brandArr.includes(v)));
      console.log(brandComplitationArr);
      const mixeslist = document.querySelector('.mixes-list-complitation');

      brandComplitationArr.forEach(e => {
        let card = createHTMLElement('mixes-list__card');
        card.innerHTML = `<img class="mixes-list__card-img"
      src="${this.api.getImage(e.image)}">
    <div class="mixes-list__card-container"><span class="mixes-list__title">${e.name}</span>
      <div class="mixes-list__card-footer"><button class="mixes-list__button button-1">Попробовать</button>
        <div class="mixes-list__rating-container"><img class="mixes-list__favorite-icon"
            src="${favoriteIconSrc}"><img class="mixes-list__rating-icon"
            src="${ratingStarIconSrc}"><span class="mixes-list__rating-num">4.3</span></div>
      </div>
    </div>`;
        card.onclick = () => {window.location.hash = `/mix/${e.id}`;
        document.querySelector('.header')?.remove();
        document.body.prepend(this.header.draw());};
        mixeslist?.append(card);
      }
      );

      setTimeout(() => {
        this.changeHeader();
      }, 0);
      return main;
    }
  }
}

export default ComplitationPage;
