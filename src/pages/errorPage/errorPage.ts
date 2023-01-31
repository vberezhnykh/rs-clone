import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';

class ErrorPage implements InterfaceContainerElement {
  draw(): HTMLElement {
    const main = createHTMLElement('main');
    const errorMessage = createHTMLElement('error__message', 'div', 'Page not found');
    main.append(errorMessage);
    return main;
  }
}

export default ErrorPage;
