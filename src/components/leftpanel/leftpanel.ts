import Component from '../../core/component'
import Chat from '../../components/chat/chat'
import Button from '../../components/button/button'
import Input from '../../components/input/input'
import Link from '../../components/link/link'
import template from './leftpanel.hbs'
import store, { StoreEvents } from '../../core/store'
import chatController from '../../controllers/chatController'

export default class LeftPanel extends Component {
  constructor () {
    const props = {
      attr: { class: 'left-panel' },
      input: new Input({
        attr: {
          class: 'left-panel_input',
          placeholder: 'Название для нового чата',
        },
      }),
      button: new Button({
        attr: {
          class: 'left-panel__button',
          textContent: 'Создать чат',
        },
      }),
      link: new Link({
        attr: {
          class: 'left-panel__link',
          textContent: 'Профиль >',
        },
        href: '/settings',
      }),
      chats: [],
      events: {
        click: {
          handler: (e) => {
            if (e.target instanceof HTMLButtonElement) {
              e.preventDefault()
              const input = this.children.input.getContent()
              if (input.value !== '') {
                chatController.createChat(input.value)
                input.value = ''
              }
            }
          },
          capture: false,
        },
      },
    }
    super('div', props)
    store.on(StoreEvents.Updated, () => {
      const chats = store.getState().chats
      const activeChat = store.getState().activeChat
      console.log(activeChat);
      if (chats != null) {
        const children: Chat[] = []

        chats.forEach((chat) => {
          let name = chat.title
          let time = ''
          let message = ''

          if (chat.last_message != null) {
            const user = chat.last_message.user
            if (user != null) {
              name = user.login
            }
            time = chat.last_message.time.substring(0, 10)
            message = chat.last_message.content
          }
          children.push(new Chat({
            attr: {
              class: 'chat',
              style: chat.id === activeChat ? 'background: #00000019' : '',
            },
            id: chat.id,
            name: name,
            message_time: time,
            message_text: message,
            message_count: chat.unread_count,
          }))
        })
        this.children.chats = children
        this.setProps({ chats: children })
      }
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
