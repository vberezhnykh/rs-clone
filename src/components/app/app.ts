import Header from '../header/header';
import Footer from '../footer/footer';
import MainPage from '../../pages/mainPage/mainPage';
import SearchPage from '../../pages/searchPage/searchPage';
import MixerPage from '../../pages/mixerPage/mixerPage';
import AccountPage from '../../pages/accountPage/accountPage';
import AccountPageAuth from '../../pages/account_page_auth/accountPageAuth';
import AccountPageEdit from '../../pages/account_page_edit/accountPageEdit';
import MixPage from '../../pages/mixPage/mixPage';
import ErrorPage from '../../pages/errorPage/errorPage';
import { InterfaceContainerElement } from '../types/types';
import { createHTMLElement } from '../../utils/createHTMLElement';
import CheckAuth from '../checkAuth/checkAuth';
import { Catalog } from '../catalog/catalog';
import { BrandSuggest } from '../catalog/brandSuggest';
import { BrandPage } from '../catalog/brandPage';
import { isBrandPage } from '../../utils/isBrandPage';
import { UserMixes } from '../userMixes/user-mixes';
import { PreferencesPage } from '../preferences/preferences';

enum LocationPath {
  MainPage = `/`,
  SearchPage = `/search`,
  MixerPage = `/mixer`,
  CatalogPage = `/mixer/brands`,
  BrandSuggestPage = `/brand-suggest`,
  AccountPage = `/account`,
  EditAccount = `/account/edit`,
  UserMixes = `/user-mixes`,
  MixPage = `/mix`,
  ChangePrefFlavors = `/change-pref/flavors`,
  ChangePrefBrands = `/change-pref/brands`,
}

class App {
  private root: HTMLElement = document.body;
  private wrapper = createHTMLElement('wrapper');
  private header: InterfaceContainerElement;
  private footer: InterfaceContainerElement;
  private checkAuth;

  prevPathPage = '';

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.checkAuth = new CheckAuth();
    localStorage.removeItem('flavors');
  }

  private async drawNewPage(location: string) {
    this.wrapper.innerHTML = '';

    let changePage: InterfaceContainerElement;

    if (location.length > 1 && location[location.length - 1] === '/') {
      location = location.slice(0, -1);
      window.location.hash = location;
    }

    if (location === LocationPath.MainPage) {
      changePage = new MainPage();
    } else if (location === LocationPath.UserMixes) {
      changePage = new UserMixes();
    } else if (location === LocationPath.ChangePrefFlavors || location === LocationPath.ChangePrefBrands) {
      changePage = new PreferencesPage();
    } else if (location === LocationPath.SearchPage) {
      changePage = new SearchPage();
    } else if (location === LocationPath.MixerPage) {
      changePage = new MixerPage();
    } else if (location === LocationPath.CatalogPage) {
      changePage = new Catalog();
    } else if (location === LocationPath.BrandSuggestPage) {
      changePage = new BrandSuggest();
    } else if (location.includes(LocationPath.CatalogPage)) {
      changePage = isBrandPage() ? new BrandPage() : new ErrorPage();
    } else if (location === LocationPath.AccountPage) {
      if ((await this.checkAuth.checkUserAuth()) === true) {
        changePage = new AccountPageAuth();
      } else {
        changePage = new AccountPage();
      }
    } else if (location === LocationPath.EditAccount) {
      if ((await this.checkAuth.checkUserAuth()) === true) {
        changePage = new AccountPageEdit();
      } else {
        changePage = new AccountPage();
      }
    } else if (location.includes(LocationPath.MixPage)) {
      changePage = new MixPage();
    } else {
      changePage = new ErrorPage();
    }

    if (changePage) {
      this.prevPathPage = window.location.hash.slice(1);
      if (this.wrapper.innerHTML.length === 0) {
        this.wrapper.append(changePage.draw());
      }
    }
  }

  private handleHashChange(): void {
    window.addEventListener('hashchange', this.loadHashPage);
    window.addEventListener('load', this.loadHashPage);
  }

  private loadHashPage = (): void => {
    const hash = window.location.hash.slice(1);

    if (!hash) {
      window.location.hash = `/`;
    }
    this.drawNewPage(hash);
  };

  start(): void {
    this.handleHashChange();
    this.root.append(this.header.draw(), this.wrapper, this.footer.draw());
  }
}

export default App;
