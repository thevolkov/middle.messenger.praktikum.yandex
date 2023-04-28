import Component from '../../utils/Component'
import template from './signIn.hbs'
import Button from '../../base/button/button'
import Form from '../../components/form/form'
import Title from '../../base/title/title'
import Input from '../../base/input/input'
import Link from '../../base/link/link'

export default class LoginPage extends Component {
  constructor () {
    const props = {
      class: 'form-template',
      form: new Form({
        title: new Title({
          attr: { class: 'title' },
          text: 'ЯНДЕКС.ЧАТ',
        }),
        inputs: [
          new Input('input-container', 'login'),
          new Input('input-container', 'password'),
        ],
        button: new Button({
          attr: {
            class: ['button', 'button__black'],
          },
          text: 'ВОЙТИ',
        }),
      }),
      link: [
        new Link({
          attr: {
            class: ['link'],
            href: '#signup',
          },
          text: 'Зарегистрироваться',
        }),
        new Link({
          attr: {
            class: ['link', 'link__red'],
            href: '#main',
          },
          text: 'Меню навигации',
        }),
      ],
    }
    props.events = {
      submit: {
        handler: (e: { preventDefault: () => void }) => {
          e.preventDefault()
          Input.validate()
        },
        capture: false,
      },
      focus: {
        handler: (e) => {
          e.preventDefault()
        },
        capture: true,
      },
      blur: {
        handler: (e) => {
          e.preventDefault()
          if (e.target != null && e.target instanceof HTMLInputElement) {
            Input.validateInputs(e.target)
          }
        },
        capture: true,
      },
    }
    super('main', props)
  }

  render (): string {
    return template(this.getPropsAndChildren())
  }
}
