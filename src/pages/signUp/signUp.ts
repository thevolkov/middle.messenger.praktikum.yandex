import Component from '../../utils/Component'
import template from './signUp.hbs'
import Button from '../../base/button/button'
import Input from '../../base/input/input'
import Link from '../../base/link/link'
import Form from '../../components/form/form'
import Title from '../../base/title/title'

export default class SignupPage extends Component {
  constructor () {
    const props = {
      class: 'form-template',
      form: new Form({
        title: new Title({
          attr: { class: 'title' },
          text: 'РЕГИСТРАЦИЯ',
        }),
        inputs: [
          new Input('input-container', 'email'),
          new Input('input-container', 'login'),
          new Input('input-container', 'first_name'),
          new Input('input-container', 'second_name'),
          new Input('input-container', 'phone'),
          new Input('input-container', 'password'),
          new Input('input-container', 'password_repeat'),
        ],
        button: new Button({
          attr: {
            class: ['button', 'button__black'],
          },
          text: 'Зарегистрироваться',
        }),
      }),
      link: [
        new Link({
          attr: {
            class: ['link'],
            href: '#signin',
          },
          text: 'Войти',
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
          console.log('Signup FormHbs - submit event')
          e.preventDefault()
          Input.validate()
        },
        capture: false,
      },
      focus: {
        handler: (e: { preventDefault: () => void }) => {
          e.preventDefault()
          console.log('Signup FormHbs - focus event')
        },
        capture: true,
      },
      blur: {
        handler: (e: { preventDefault: () => void, target: HTMLInputElement | null }) => {
          e.preventDefault()
          console.log('SignUp FormHbs - blur event')
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
