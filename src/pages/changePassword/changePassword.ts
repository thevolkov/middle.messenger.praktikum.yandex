import Component from '../../utils/Component'
import template from './changePassword.hbs'
import Button from '../../base/button/button'
import Form from '../../components/form/form'
import Title from '../../base/title/title'
import Input from '../../base/input/input'
import Link from '../../base/link/link'

export default class ChangePassword extends Component {
  constructor () {
    const props = {
      class: 'form-template',
      form: new Form({
        title: new Title({
          attr: { class: 'title' },
          text: 'СМЕНИТЬ ПАРОЛЬ',
        }),
        inputs: [
          new Input('input-container', 'password_old'),
          new Input('input-container', 'password'),
        ],
        button: new Button({
          attr: {
            class: ['button', 'button__black'],
            type: 'submit',
          },
          text: 'СОХРАНИТЬ',
        }),
      }),
      link: [
        new Link({
          attr: {
            class: ['link'],
            href: '#profile',
          },
          text: 'Вернуться в профиль',
        }),
        new Link({
          attr: {
            class: ['link', 'link__red'],
            href: '#main',
          },
          text: 'Меню навигации',
        }),
      ],
      events: {
        submit: {
          handler: (events: { preventDefault: () => void }) => {
            events.preventDefault()
            Input.validation()
          },
          capture: false,
        },
        focus: {
          handler: (events: { preventDefault: () => void }) => {
            events.preventDefault()
          },
          capture: true,
        },
        blur: {
          handler: (events: { preventDefault: () => void, target: HTMLInputElement | null }) => {
            events.preventDefault()
            if (events.target != null && events.target instanceof HTMLInputElement) {
              Input.checkInput(events.target)
            }
          },
          capture: true,
        },
      },
    }
    super('main', props)
  }

  render (): string {
    return template(this.getPropsAndChildren())
  }
}
