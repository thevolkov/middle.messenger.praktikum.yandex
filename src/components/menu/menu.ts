import Component from '../../utils/Component';
import template from './menu.hbs';
import { Links } from '../../constants';

export default class Menu extends Component {
  constructor() {
    super('nav', {
      attr: { class: 'menu' },
      pages: Links,
    });
  }

  render(): string {
    return template(this.getPropsAndChildren());
  }
}
