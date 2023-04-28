import Component from '../../utils/Component'
import template from './chat.hbs'
import ChatList from './chatBlocks/chatList/chatList'
import ChatPanel from './chatBlocks/chatPanel/chatPanel'

export default class Chat extends Component {
  constructor () {
    super('div', {
      attr: { class: 'chat' },
      chatList: new ChatList(),
      chatPanel: new ChatPanel(),
    })
  }

  render (): string {
    return template(this.getPropsAndChildren())
  }
}
