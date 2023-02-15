import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';
import { Mix, Mixes, Flavors, Brands } from '../../components/types/types';
import Api from '../../components/api/api';
import preloader from '../../components/preloader/preloader';
import ApiMix from '../../components/api_mix/api_mix';
import backArrow from '../../assets/images/back-arrow-white.png';
import ratingStarIconSrc from '../../assets/images/star-empty.svg';
import favoriteIconSrc from '../../assets/images/favorite.svg';
import favoriteActiveIconSrc from '../../assets/images/favorite_active.svg';
import Header from '../../components/header/header';

class ListComplitationPage implements InterfaceContainerElement {
  private header:InterfaceContainerElement;
  private api: Api;
  private mix: Mix;
  private preloader: preloader;
  // private apiMix: ApiMix;
  private brandId: number;
  private mixes: Mixes;
  private flavors: Flavors;
  private brands: Brands;
  
  constructor() {
    this.brandId = Number(window.location.hash.split('complitation/')[window.location.hash.split('complitation/').length - 1]);
    this.api = new Api();
    this.header= new Header();
    this.getData();
  }
  private async getData() {
    this.preloader = new preloader();
    this.preloader.draw();
    // this.flavors = await this.api.getAllFlavors();
    // this.mixes = await this.api.getAllMixes();
    this.brands = await this.api.getAllBrands();
    console.log(this.brands);
    this.draw();
    this.preloader.removePreloader();
  }

  changeHeader(): void {
    const header = document.querySelector('.header')
    const headercontainer = document.querySelector('.header__container');
    if (header && headercontainer) {
      header.classList.add('header-brands');
      headercontainer.classList.add('container-complitation');
      headercontainer.innerHTML = `<div class="complitation__buttons"><img src="${backArrow}" alt="back-arrow" class="arrow-back"></div>
      <div class="complitation__title">Подборки: бренды</div>`;
    }
  }



  draw(): HTMLElement {
    if (this.brands === undefined) {
      const main = createHTMLElement('main', 'main');
      return main;
    } else {
      const main = document.querySelector('.main') as HTMLElement;
      const maincontainer = createHTMLElement(['main__container', 'container']);
      maincontainer.innerHTML = `<div class="complitation-list complitation-list-brands">
      <div class="complitation-list__items"></div></div>`;
      main.append(maincontainer);
      const complitationlistitems = document.querySelector('.complitation-list__items');

      this.brands.forEach(e => {
        let brand=e.name.replace(/[\s-]/g, '').toLocaleLowerCase();
        let item = createHTMLElement([`complitation-list__item`, `item-${brand}`]);
        item.innerHTML = `<div class="complitation-name">${e.name}</div>
        <div class="complitation-desc">Миксы на все случаи жизни от ${brand}</div>`;
        item.onclick = () => {window.location.hash = `/complitation/${e.id}`;
        document.querySelector('.header')?.remove();
        document.body.prepend(this.header.draw());};
        complitationlistitems?.append(item);
      }
      );

      setTimeout(() => {
        this.changeHeader();
      }, 0);
      return main;
    }
  }
}

export default ListComplitationPage;
