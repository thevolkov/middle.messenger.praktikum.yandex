import Component from '../../core/component'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import BottomPanel from '../../components/bottompanel/bottompanel'
import MessagePanel from '../../components/messagepanel/messagepanel'
import template from './rightpanel.hbs'
import store, { StoreEvents } from '../../core/store'
import chatController from '../../controllers/chatController'

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
            textContent: 'Удалить', // <i class='fa-solid fa-ellipsis-vertical'></i>
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
                chatController.deleteChat(this.props.name)
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
      const activeChat = store.getState().activeChat
      if (activeChat != null) {
        this.setProps({ name: activeChat })
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
