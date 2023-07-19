// import { PageIds } from '../../app.ts'
import Component from '../../core/component'
import template from './navigation.hbs'

const Pages = [
  { url: '#login', text: 'Страница авторизации' },
  { url: '#signup', text: 'Страница регистрации' },
  { url: '#user', text: 'Страница пользователя' },
  { url: '#profile', text: 'Страница профиля' },
  { url: '#error', text: 'Страница ошибок' },
  // { url:'./404', text:'Страница 404'},
  // { url:'./5xx', text:'Страница 5хх ошибок'},
]

export default class Navigation extends Component {
  constructor () {
    super('nav', {
      attr: { class: 'navigation' },
      pages: Pages,
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
