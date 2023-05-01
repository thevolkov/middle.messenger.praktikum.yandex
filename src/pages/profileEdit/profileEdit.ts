import Component from '../../utils/Component'
import template from './profileEdit.hbs'
import Button from '../../base/button/button'
import Form from '../../components/form/form'
import Title from '../../base/title/title'
import Input from '../../base/input/input'
import Link from '../../base/link/link'

export default class ProfileEditPage extends Component {
  constructor () {
    const props = {
      class: 'form-template',
      form: new Form({
        title: new Title({
          attr: { class: 'title' },
          text: 'МОЙ ПРОФИЛЬ',
          subtitle: 'Редактирование',
        }),
        inputs: [
          new Input('input-container', 'first_name'),
          new Input('input-container', 'second_name'),
          new Input('input-container', 'display_name'),
          new Input('input-container', 'login'),
          new Input('input-container', 'email'),
          new Input('input-container', 'phone'),
        ],
        button: new Button({
          attr: {
            class: ['button', 'button__black'],
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
          text: 'Назад в профиль',
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
          handler: (event: { preventDefault: () => void }) => {
            event.preventDefault()
            Input.validation()
          },
          capture: false,
        },
        focus: {
          handler: (event: { preventDefault: () => void }) => {
            event.preventDefault()
          },
          capture: true,
        },
        blur: {
          handler: (event: { preventDefault: () => void, target: HTMLInputElement | null }) => {
            event.preventDefault()
            if (event.target !== null && event.target instanceof HTMLInputElement) {
              Input.checkInput(event.target)
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
