import Component from '../../utils/Component'

export default class Button extends Component {
  constructor (props: {
    [x: string]: any
    attr?: {
      class: string | string[]
      type?: string
    }
    text?: string
  }) {
    super('button', props)
  }
}
