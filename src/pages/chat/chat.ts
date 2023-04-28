import Component from '../../utils/Component';
import template from './chat.hbs';
import chatList from './chatBlocks/chatList/chatList';
import chatPanel from './chatBlocks/chatPanel/chatPanel';

export default class Chat extends Component {
  constructor() {
    super('div', {
      attr: { class: 'chat' },
      chatList: new chatList(),
      chatPanel: new chatPanel(),
    });
  }

  render(): string {
    return template(this.getPropsAndChildren());
  }
}
