import Component from '../../core/component'
import template from './chat.hbs'
import store from '../../core/store'

export default class Chat extends Component {
  constructor (props: Record<string, unknown>) {
    props = {
      ...props,
      events: {
        click: {
          handler: () => {
            // @ts-ignore
            if (this.props.id != null && this.props.id !== store.getState().activeChat) {
              // @ts-ignore
              store.set('activeChat', this.props.id)
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
