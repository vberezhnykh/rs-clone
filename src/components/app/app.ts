import Header from '../header/header';
import Footer from '../footer/footer';
import MainPage from '../../pages/mainPage/mainPage';
import SearchPage from '../../pages/searchPage/searchPage';
import MixerPage from '../../pages/mixerPage/mixerPage';
import AccountPage from '../../pages/accountPage/accountPage';
import { InterfaceContainerElement } from '../types/types';
import { createHTMLElement } from '../../utils/createHTMLElement';

enum LocationPath {
  MainPage = `/`,
  SearchPage = `/search`,
  MixerPage = `/mixer`,
  AccountPage = `/account`,
}

class App {
  private root: HTMLElement = document.body;
  private wrapper = createHTMLElement('wrapper');
  private header: InterfaceContainerElement;
  private footer: InterfaceContainerElement;

  prevPathPage = '';

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
  }

  private drawNewPage(location: string): void {
    this.wrapper.innerHTML = '';

    let changePage;

    if (location === LocationPath.MainPage) {
      changePage = new MainPage();
    } else if (location === LocationPath.SearchPage) {
      changePage = new SearchPage();
    } else if (location === LocationPath.MixerPage) {
      changePage = new MixerPage();
    } else if (location === LocationPath.AccountPage) {
      changePage = new AccountPage();
    }

    if (changePage) {
      this.prevPathPage = window.location.hash.slice(1);
      this.wrapper.append(changePage.draw());
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
