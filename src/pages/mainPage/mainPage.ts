import Component from '../../utils/Component';
import template from './mainPage.hbs';
import Menu from '../../components/menu/menu';
import Title from '../../base/title/title';

export default class MainPage extends Component {
  constructor() {
    super('main', {
      class: 'form-template',
      title: new Title({
        attr: { class: 'title' },
        text: 'НАВИГАЦИЯ',
      }),
      menu: new Menu(),
    });
  }

  render(): string {
    return template(this.getPropsAndChildren());
  }
}
