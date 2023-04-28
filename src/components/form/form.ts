import Component from '../../utils/Component';
import form from './form.hbs';

export default class Form extends Component {
  constructor(props: Record<string, unknown> = {}) {
    super('form', props);
  }

  render(): string {
    return form(this.getPropsAndChildren());
  }
}
