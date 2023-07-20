import Component from '../../core/component'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import BottomPanel from '../../components/bottompanel/bottompanel'
import MessagePanel from '../../components/messagepanel/messagepanel'
import template from './rightpanel.hbs'
import store, { StoreEvents } from '../../core/store'
import chatController from '../../controllers/chatController'
import { BASE_URL } from '../../constants'
import defaultAvatar from '../../../static/chat_avatar.png'

export default class RightPanel extends Component {
  constructor () {
    const props = {
      attr: { class: 'right-panel' },
      input: new Input({
        attr: {
          class: 'right-panel_input',
          placeholder: 'ID пользователя',
        },
      }),
      buttons: [
        new Button({
          attr: {
            class: 'top-panel__button',
            textContent: 'Добавить',
          },
          events: {
            click: {
              handler: (e) => {
                const input = this.children.input.getContent()
                if (input.value !== '') {
                  const userId = parseInt(input.value)
                  if (!isNaN(userId)) {
                    chatController.addUserToChat(this.props.name, userId)
                    input.value = ''
                  }
                }
              },
              capture: false,
            },
          },
        }),
        new Button({
          attr: {
            class: 'top-panel__button',
            textContent: 'Удалить',
          },
          events: {
            click: {
              handler: (e) => {
                const input = this.children.input.getContent()
                if (input.value !== '') {
                  const userId = parseInt(input.value)
                  if (!isNaN(userId)) {
                    chatController.deleteUserFromChat(this.props.name, userId)
                    input.value = ''
                  }
                }
              },
              capture: false,
            },
          },
        }),
        new Button({
          attr: {
            textContent: 'Удалить чат',
          },
          events: {
            click: {
              handler: (e) => {
                chatController.deleteChat(store.getState().activeChat)
              },
              capture: false,
            },
          },
        }),
      ],
      messagepanel: new MessagePanel(),
      bottompanel: new BottomPanel(),
    }
    super('div', props)
    store.on(StoreEvents.Updated, () => {
      const activeChatId = store.getState().activeChat
      const activeChat = activeChatId && store.getState().chats.find((item) => item.id === store.getState().activeChat)
      if (activeChat != null) {
        this.setProps({
          name: activeChat.title,
          avatar_link: activeChat.avatar
            ? `${BASE_URL}/resources${activeChat.avatar}`
            : defaultAvatar
        })
        this.show()
      } else {
        this.hide()
      }
    })
  }

  init (): void {
    super.init()
    this.hide()
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
