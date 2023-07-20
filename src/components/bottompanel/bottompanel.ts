import Component from '../../core/component'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import template from './bottompanel.hbs'
import messageController from '../../controllers/messageController'

export default class BottomPanel extends Component {
  constructor () {
    const props = {
      attr: { class: 'right-panel__bottom-panel' },
      input: new Input({
        attr: {
          class: 'bottom-panel__input',
          name: 'message',
        },
      }),
      button: new Button({
        attr: {
          class: 'circle',
          textContent: '>',
        },
      }),
      events: {
        click: {
          handler: (e: { target: any; preventDefault: () => void }) => {
            if (e.target instanceof HTMLButtonElement) {
              e.preventDefault()
              const input = this.children.input.getContent()
              if (input.value !== '') {
                messageController.sendMessage(input.value)
                input.value = ''
              }
            }
          },
          capture: false,
        },
      },
    }
    super('div', props)
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
