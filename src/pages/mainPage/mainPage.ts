import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';
import Api from '../../components/api/api';
import changePrefIconSrc from '../../assets/images/change-pref-icon.png';

class MainPage implements InterfaceContainerElement {
  private api;
  constructor() {
    this.api = new Api();
  }
  draw(): HTMLElement {
    const main = createHTMLElement('main', 'main');
    const container = createHTMLElement(['main__container', 'container']);
    main.appendChild(container);

    /* main.innerHTML = `
    <div class="main__container">
    </div>
    `; */
    container.appendChild(this.createTopBlock());
    return main;
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
    return flavorPreferencesCard;
  }

  private openFlavorsPreferences() {
    /* TO-DO */
  }
}

export default MainPage;
