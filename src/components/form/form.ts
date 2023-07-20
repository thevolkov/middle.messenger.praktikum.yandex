import Component from '../../core/component'
import template from './form.hbs'

export default class Form extends Component {
  constructor (props: Record<string, unknown> = {}) {
    super('form', props)
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
