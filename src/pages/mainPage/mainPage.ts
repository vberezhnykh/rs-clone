import { createHTMLElement } from '../../utils/createHTMLElement';
import { Brands, InterfaceContainerElement, Mixes, Rates } from '../../components/types/types';
import Api from '../../components/api/api';
import changePrefIconSrc from '../../assets/images/change-pref-icon.png';
import getRatingStar from '../../components/getRatingStar/getRatingStar';

class MainPage implements InterfaceContainerElement {
  private api;
  private rates: Rates;
  private popularmixes: Mixes;
  private brands: Brands
  constructor() {
    this.api = new Api();
    this.getData();
  }

  private async getData() {
    this.popularmixes = await this.api.getTop10();
    this.rates = await this.api.getAllRate();
    this.brands = await this.api.getAllBrands();
    this.draw();
  }

  draw(): HTMLElement {
    if (this.popularmixes === undefined) {
      const main = createHTMLElement('main', 'main');
      const container = createHTMLElement(['main__container', 'container']);
      main.appendChild(container);
      return main;
    } else {
      const main = document.querySelector('.main') as HTMLElement;
      const container = document.querySelector('.main__container') as HTMLElement;
      container.appendChild(this.createTopBlock());
      container.appendChild(this.createPopularMixes());
      container.appendChild(this.createBrandsComplitation());
      main.appendChild(container);
      return main;
    }
  }

  private createTopBlock() {
    const topBlock = createHTMLElement('top-block');
    topBlock.appendChild(this.createMixWeekCard());
    topBlock.appendChild(this.createUserMixesCard());
    topBlock.appendChild(this.createFlavorPreferencesCard());
    return topBlock;
  }

  private createMixWeekCard() {
    const mixWeekCard = createHTMLElement('mix-week-card');
    const title = createHTMLElement('mix-week-card__title', 'h4');
    title.textContent = 'ВКУС НЕДЕЛИ';
    mixWeekCard.appendChild(title);
    const cardText = createHTMLElement('mix-week-card__text');
    cardText.textContent = 'Вкусно и точка.';
    mixWeekCard.appendChild(cardText);
    mixWeekCard.onclick = () => this.openMixWeekCard();
    return mixWeekCard;
  }

  private openMixWeekCard() {
    /* 
    TO-DO: реализовать открытие карточки микса недели
    Как вариант изменить карточку на "Микс этого часа"
    Раз в час на сервере меняется микс
    */
  }

  private createUserMixesCard() {
    const userMixesCard = createHTMLElement('user-mixes-card');
    const title = createHTMLElement('user-mixes-card__title', 'h4');
    title.textContent = 'Миксы пользователей';
    userMixesCard.appendChild(title);
    const tryButton = createHTMLElement(['button-1', 'user-mixes-card__button'], 'button');
    tryButton.textContent = 'ПРОБОВАТЬ';
    userMixesCard.appendChild(tryButton);
    userMixesCard.onclick = () => (window.location.hash += 'user-mixes');
    return userMixesCard;
  }

  private createFlavorPreferencesCard() {
    const flavorPreferencesCard = createHTMLElement('flavor-preferences-card');
    flavorPreferencesCard.onclick = () => this.openFlavorsPreferences();
    const title = createHTMLElement('flavor-preferences-card__title', 'h4');
    title.textContent = 'Изменить вкусовые предпочтения';
    flavorPreferencesCard.appendChild(title);
    const changePrefIcon = new Image();
    changePrefIcon.className = 'flavor-preferences-card__image';
    changePrefIcon.src = changePrefIconSrc;
    flavorPreferencesCard.appendChild(changePrefIcon);
    flavorPreferencesCard.onclick = () => (window.location.hash += 'change-pref/flavors');
    return flavorPreferencesCard;
  }

  private openFlavorsPreferences() {
    /* TO-DO */
  }
  private createPopularMixes() {
    let items = '';
    for (let i = 0; i < 5; i++) {
      const rate = this.rates.filter((r) => r.id == this.popularmixes[i].id)[0]?.rate || '-';
      items += `<div class="popular-list__item">
      <img src="${this.api.getImage(this.popularmixes[i].image)}" class="item-img">
      <div class="item-name">${this.popularmixes[i].name}</div>
      <div class="item-rating"><div class="item-rate">${rate}</div><img src="${getRatingStar(this.popularmixes[i].id)}" class="item-star"></div>
    </div>`;
    }
    const popularMixes = createHTMLElement('popular-list');
    popularMixes.innerHTML = `<div class="popular-list__header">
    <div class="popular-list__title">Популярные миксы</div>
    <div class="popular-list__more more">См. ещё</div>
    </div>
    <div class="popular-list__items">
    ${items}
    </div>`;

    popularMixes.onclick = (e: Event) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.className.includes('more')) window.location.hash = `/popular-mixes`;
        else if (
          e.target.className.includes('popular-list__item') ||
          e.target.parentElement?.className.includes('popular-list__item') ||
          e.target.parentElement?.className.includes('item-rating')
        ) {
          const index = Array.from(document.querySelectorAll(`.${e.target.classList[0]}`)).indexOf(e.target);
          window.location.hash = `/mix/${this.popularmixes[index].id}`;
        }
      }
    };
    return popularMixes;
  }

  private createBrandsComplitation() {
    const brandsComplitation = createHTMLElement('complitation-list');
    brandsComplitation.innerHTML = `<div class="complitation-list__header">
    <div class="complitation-list__title">Подборки: брэнды</div>
    <div class="complitation-list__more more">См. ещё</div>
    </div>`;
    const complitationlistitems=createHTMLElement("complitation-list__items");
    brandsComplitation.append(complitationlistitems);
    this.brands.forEach((e,i) => {
      if (i < 3) {
        const brand = e.name.replace(/[\s-]/g, '').toLocaleLowerCase();
        const item = createHTMLElement([`complitation-list__item`, `item-${brand}`]);
        item.innerHTML = `<div class="complitation-name">${e.name}</div>
      <div class="complitation-desc">Миксы на все случаи жизни от ${brand} - кальянного гуру Hookan Blender</div>`;
        item.onclick = () => {
          window.location.hash = `/complitation/${e.id}`;
        };
        complitationlistitems?.append(item);
      }
    });
    brandsComplitation.onclick = (e: Event) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.className.includes('more')) window.location.hash = `/list-complitation`;
      }
    };
    return brandsComplitation;
  }
}

export default MainPage;
