import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement, Mixes } from '../../components/types/types';
import Api from '../../components/api/api';
import changePrefIconSrc from '../../assets/images/change-pref-icon.png';
import backArrowImgSrc from '../../assets/images/back-arrow.png';
import ratingStarIconSrc from '../../assets/images/star-empty.svg';
import { MixesList } from '../../components/mixesList/mixesList';

class MainPage implements InterfaceContainerElement {
  private api;
  private mixes?: Mixes;
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
    topBlock.appendChild(this.createUsersMixesCard());
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

  private createUsersMixesCard() {
    const usersMixesCard = createHTMLElement('users-mixes-card');
    usersMixesCard.onclick = () => this.openUsersMixes();
    const title = createHTMLElement('users-mixes-card__title', 'h4');
    title.textContent = 'Миксы пользователей';
    usersMixesCard.appendChild(title);
    const tryButton = createHTMLElement(['button-1', 'users-mixes-card__button'], 'button');
    tryButton.textContent = 'ПРОБОВАТЬ';
    usersMixesCard.appendChild(tryButton);
    return usersMixesCard;
  }

  private async openUsersMixes() {
    document.body.classList.add('body--unscrollable');
    if (!this.mixes) this.mixes = await this.api.getAllMixes();
    document.body.prepend(this.createUsersMixesPopup());
  }

  private createUsersMixesPopup() {
    const UsersMixesContainer = createHTMLElement('users-mixes-container');
    UsersMixesContainer.appendChild(this.createUsersMixesPopupHeader());
    const usersMixesList = new MixesList(this.mixes).create();
    UsersMixesContainer.appendChild(usersMixesList);
    return UsersMixesContainer;
  }

  private createUsersMixesPopupHeader() {
    const header = createHTMLElement('user-mixes__header');
    const navBar = createHTMLElement('user-mixes__nav', 'nav');
    const backArrowImage = new Image();
    backArrowImage.className = 'user-mixes__back-arrow';
    backArrowImage.src = backArrowImgSrc;
    backArrowImage.onclick = () => this.handleClickOnBackButton();
    navBar.append(backArrowImage);
    header.append(navBar);
    const heading = createHTMLElement('user-mixes__heading', 'h4');
    heading.textContent = 'Миксы от пользователей';
    header.append(heading);
    return header;
  }

  private handleClickOnBackButton() {
    document.body.classList.remove('body--unscrollable');
    document.querySelector('.users-mixes-container')?.remove();
  }

  private createMixesList() {
    const list = createHTMLElement('search-list', 'ul');
    if (!this.mixes) {
      list.classList.add('search-list--error-message');
      list.textContent = 'Произошла ошибка. Ничего не найдено. Попробуйте снова...';
      return list;
    }
    for (let i = 0; i < this.mixes.length; i++) {
      const listItem = createHTMLElement('mixes-list__card', 'li');
      const mixImg = <HTMLImageElement>createHTMLElement('mixes-list__card-img', 'img');
      mixImg.src = this.api.getImage(this.mixes[i].image);
      listItem.appendChild(mixImg);
      const container = createHTMLElement('mixes-list__card-container');
      const mixTitle = createHTMLElement('mixes-list__title', 'span');
      mixTitle.textContent = this.mixes[i].name;
      container.appendChild(mixTitle);
      const listItemFooter = createHTMLElement('mixes-list__card-footer');
      const button = createHTMLElement(['mixes-list__button', 'button-1'], 'button');
      button.textContent = 'Попробовать';
      listItemFooter.appendChild(button);
      const ratingContainer = createHTMLElement('mixes-list__rating-container');
      const ratingStarIcon = <HTMLImageElement>createHTMLElement('mixes-list__rating-icon', 'img');
      ratingStarIcon.src = ratingStarIconSrc;
      ratingContainer.appendChild(ratingStarIcon);
      const ratingNum = createHTMLElement('mixes-list__rating-num', 'span');
      /* добавить в БД рейтинг миксам */
      ratingNum.innerText = '-.-';
      ratingContainer.appendChild(ratingNum);
      listItemFooter.appendChild(ratingContainer);
      container.appendChild(listItemFooter);
      listItem.appendChild(container);
      list.appendChild(listItem);
      listItem.onclick = () => this.openMixCard();
    }
    return list;
  }

  private openMixCard() {
    /*  */
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
