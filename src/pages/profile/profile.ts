import Component from '../../utils/Component'
import template from './profile.hbs'
import Button from '../../base/button/button'
import Title from '../../base/title/title'
import Link from '../../base/link/link'
import { ProfileData } from './constants'

export default class ProfilePage extends Component {
  constructor () {
    super('main', {
      title: new Title({
        attr: { class: 'title' },
        text: 'МОЙ ПРОФИЛЬ',
      }),
      pages: ProfileData,
      button: new Button({
        attr: {
          class: ['button', 'button__black'],
        },
        text: 'РЕДАКТИРОВАТЬ',
      }),
      link: [
        new Link({
          attr: {
            class: ['link'],
            href: '#main',
          },
          text: 'Назад',
        }),
        new Link({
          attr: {
            class: ['link', 'link__red'],
            href: '#main',
          },
          text: 'Меню навигации',
        }),
      ],
    })
  }

  render (): string {
    return template(this.getPropsAndChildren())
  }
}
