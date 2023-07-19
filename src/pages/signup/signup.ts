import Component from '../../core/component'
import Button from '../../components/button/button'
import Form from '../../components/form/form'
import InputGroup from '../../components/inputgroup/inputgroup'
import Link from '../../components/link/link'
import template from './signup.hbs'
import authController from '../../controllers/authController'
import { type SignupData } from '../../api/authAPI'
import store, { StoreEvents } from '../../core/store'

export default class SignupPage extends Component {
  constructor () {
    const props = {
      form: new Form({
        attr: { class: 'signup-page__form' },
        header_class: 'signup-page__header',
        header_name: 'Регистрация',
        inputgroups: [
          new InputGroup('signup-page__input-groups', 'email'),
          new InputGroup('signup-page__input-groups', 'login'),
          new InputGroup('signup-page__input-groups', 'first_name'),
          new InputGroup('signup-page__input-groups', 'second_name'),
          new InputGroup('signup-page__input-groups', 'phone'),
          new InputGroup('signup-page__input-groups', 'password'),
          new InputGroup('signup-page__input-groups', 'password_repeat'),
        ],
        button: new Button({
          attr: { textContent: 'Зарегистрироваться' },
        }),
        link: new Link({
          attr: {
            class: 'signup-page__link',
            textContent: 'Войти',
          },
          href: '/',
        }),
      }),
      events: {
        submit: {
          handler: (e: Event) => {
            e.preventDefault()
            const data = InputGroup.validate()
            if (data !== null) {
              authController.signup(data as SignupData)
            }
          },
          capture: false,
        },
      },
    }
    super('main', props)

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState())
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
