import Component from '../../utils/Component'

export default class Link extends Component {
  constructor (props: { text: string, attr: { href: string, class: string[] } }) {
    super('a', props)
  }
}
