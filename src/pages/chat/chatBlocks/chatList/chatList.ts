import Component from '../../../../utils/Component'
import template from './chatList.hbs'
import Link from '../../../../base/link/link'
import ChatItem from '../chatItem/chatItem'

export default class ChatList extends Component {
  constructor () {
    super('div',
      {
        attr: { class: 'sidebar' },
        link: new Link({
          attr: {
            class: ['link'],
            href: '#main',
          },
          text: 'Меню навигации',
        }),
        chatItem: [
          new ChatItem({
            name: 'TEST',
            message_time: '12:33',
            message_text: 'Привет! Как дела?',
            count: '15',
          }),
          new ChatItem({
            name: 'TEST',
            message_time: '12:33',
            message_text: 'Привет! Как дела?',
            count: '15',
          }),
          new ChatItem({
            name: 'TEST',
            message_time: '12:33',
            message_text: 'Привет! Как дела?',
            count: '15',
          }),
          new ChatItem({
            name: 'TEST',
            message_time: '12:33',
            message_text: 'Привет! Как дела?',
            count: '15',
          }),
        ],
      })
  }

  render (): string {
    return template(this.getPropsAndChildren())
  }
}
