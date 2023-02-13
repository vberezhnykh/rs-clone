import { createHTMLElement } from '../../utils/createHTMLElement';
import { Mixes } from '../types/types';
import Api from '../api/api';
import ApiMix from '../api_mix/api_mix';
import ratingStarIconSrc from '../../assets/images/star-empty.svg';
import favoriteIconSrc from '../../assets/images/favorite.svg';
import favoriteActiveIconSrc from '../../assets/images/favorite_active.svg';
import ProfileUser from '../profile_user/profile_user';


const ERROR_MESSAGE = 'Произошла ошибка. Ничего не найдено. Попробуйте снова...';

/* enum SortOptions {
  'popular' = 'популярные',
  'new' = 'новинки',
  'rating' = 'высокие рейтинги',
} */
type MixesListOptions = {
  isSearchList?: boolean;
  sortBy?: string;
};

export class MixesList {
  private mixes?: Mixes;
  private api: Api;
  private apiMix: ApiMix;
  private profileUser;
  constructor(mixes?: Mixes) {
    this.api = new Api();
    this.apiMix = new ApiMix();
    this.profileUser = new ProfileUser();
    if (mixes) this.mixes = mixes;
  }
  public create(options?: MixesListOptions): HTMLElement {
    const list = createHTMLElement('mixes-list', 'ul');
    if (options?.isSearchList) list.classList.add('search-list');
    if (!this.mixes) {
      list.classList.add('mixes-list--error-mesage');
      list.textContent = ERROR_MESSAGE;
      return list;
    }
    /*  if (options?.sortBy) {
      this.mixes.sort((a, b) => {
        
      });
    } */
    for (let i = 0; i < this.mixes.length; i++) {
      const listItem = this.createListItem(i);
      if (listItem) list.appendChild(listItem);
    }
    return list;
  }

  private createListItem(i: number) {
    if (!this.mixes) return;
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
    const favoriteIcon = <HTMLImageElement>createHTMLElement('mixes-list__favorite-icon', 'img');
    favoriteIcon.src = favoriteIconSrc;
    const userId = this.profileUser.getUserId();
    if (typeof userId === 'string' && userId.length > 12) {
      this.apiMix.getFavorite(userId).then((data) => {
        if (this.mixes !== undefined) {
          if (data.indexOf(this.mixes[i].id) !== -1) {
            favoriteIcon.src = favoriteActiveIconSrc;
          }
        }
      });
    }
    const ratingStarIcon = <HTMLImageElement>createHTMLElement('mixes-list__rating-icon', 'img');
    ratingStarIcon.src = ratingStarIconSrc;
    ratingContainer.appendChild(favoriteIcon);
    ratingContainer.appendChild(ratingStarIcon);
    const ratingNum = createHTMLElement('mixes-list__rating-num', 'span');
    this.apiMix.getRate(this.mixes[i].id).then((data) => {
      ratingNum.textContent = `${data.rate}`;
    });
    ratingContainer.appendChild(ratingNum);
    listItemFooter.appendChild(ratingContainer);
    container.appendChild(listItemFooter);
    listItem.appendChild(container);
    listItem.onclick = () => this.openMixCard(i, this.mixes);
    return listItem;
  }

  private openMixCard(i: number, mixes?: Mixes) {
    document.body.classList.remove('body--unscrollable');
    document.querySelector('.user-mixes-container')?.remove();
    document.querySelector('.result-container')?.remove();
    if (mixes) window.location.hash = `/mix/${mixes[i].id}`;
  }
}
