import Component from '../../utils/Component'

export default class Span extends Component {
  constructor (props: { [x: string]: any, text?: any }) {
    super('span', props)
  }
}
