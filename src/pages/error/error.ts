import Component from '../../core/component'
import Link from '../../components/link/link'
import template from './error.hbs'

export default class ErrorPage extends Component {
  constructor () {
    super('main', {
      attr: { class: 'error-page' },
      link: new Link({
        attr: {
          textContent: 'Вернуться на главную',
          href: '#user',
        },
      }),
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
