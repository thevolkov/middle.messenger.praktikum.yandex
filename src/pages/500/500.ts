import Component from '../../utils/Component'
import template from './500.hbs'
import Title from '../../base/title/title'
import Link from '../../base/link/link'

export default class Page500 extends Component {
  constructor () {
    super('main', {
      class: 'wrapper',
      title: new Title({
        attr: { class: 'title__error' },
        text: 'ЧАТ СЛОМАЛСЯ',
        subtitle: 'Скоро починим...',
        code: '500',
      }),
      link:
        new Link({
          attr: {
            class: ['link', 'link__red'],
            href: '#main',
          },
          text: 'Меню навигации',
        }),
    })
  }

  render (): string {
    return template(this.getPropsAndChildren())
  }
}
