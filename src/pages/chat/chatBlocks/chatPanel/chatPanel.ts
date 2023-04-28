import Component from '../../../../utils/Component'
import template from './chatPanel.hbs'

export default class ChatPanel extends Component {
  constructor () {
    super('div', { attr: { class: 'chat-panel' } })
  }

  render (): string {
    return template(this.getPropsAndChildren())
  }
}
