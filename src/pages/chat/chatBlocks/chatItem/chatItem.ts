import Component from '../../../../utils/Component';
import template from './chatItem.hbs';

export default class ChatItem extends Component {
  constructor(props: {
    [x: string]: any;
    name?: string;
    message_time?: string;
    message_text?: string;
    count?: string;
  }) {
    super('div', props);
  }

  render(): string {
    return template(this.getPropsAndChildren());
  }
}
