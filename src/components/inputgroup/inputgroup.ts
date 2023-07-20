import Component from '../../core/component'
import Label from '../../components/label/label'
import Input from '../../components/input/input'
import Span from '../../components/span/span'
import template from './inputgroup.hbs'

export default class InputGroup extends Component {
  constructor (className: string, type: string) {
    const inputData = {
      email: {
        text: 'Почта',
        name: 'email',
        type: 'email',
        span: 'Неправильный формат',
      },
      login: {
        text: 'Логин',
        name: 'login',
        type: 'text',
        span: 'Неправильный формат',
      },
      nick: {
        text: 'Имя в чатах',
        name: 'display_name',
        type: 'text',
        span: 'Неправильный формат',
      },
      first_name: {
        text: 'Имя',
        name: 'first_name',
        type: 'text',
        span: 'Неправильный формат',
      },
      second_name: {
        text: 'Фамилия',
        name: 'second_name',
        type: 'text',
        span: 'Неправильный формат',
      },
      phone: {
        text: 'Телефон',
        name: 'phone',
        type: 'tel',
        span: 'Неправильный формат',
      },
      old_password: {
        text: 'Старый пароль',
        name: 'oldPassword',
        type: 'password',
        span: 'Неправильный формат',
      },
      password: {
        text: 'Пароль',
        name: 'password',
        type: 'password',
        span: 'Неправильный формат',
      },
      password_repeat: {
        text: 'Пароль (ещё раз)',
        name: 'newPassword',
        type: 'password',
        span: 'Не совпали',
      },
    }

    const props = {
      attr: { class: 'input-group' },
      order: className,
      label: new Label({
        attr: {
          class: 'signup-page__label',

          textContent: inputData[type].text,
        },
      }),
      input: new Input({
        attr: {

          name: inputData[type].name,

          type: inputData[type].type,
        },
        events: {
          focus: {
            capture: true,
          },
          blur: {
            handler: (e: Event) => {
              if (e.target != null) {
                InputGroup.validateInputGroup(e.target)
              }
            },
            capture: true,
          },
        },
      }),

      span: new Span({ attr: { textContent: inputData[type].span } }),
    }

    super('div', props)
  }

  render (): DocumentFragment {
    this.children.span.hide()
    return this.compile(template, this.props)
  }

  static validate (): object | null {
    let isValid = true
    const fields = {}
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input) => {
      if (!InputGroup.validateInputGroup(input)) {
        isValid = false
      }

      fields[input.name] = input.value
    })
    return isValid ? fields : null
  }

  static validateInputGroup (input: HTMLInputElement): boolean {
    const span = input.parentNode.parentNode.querySelector('span') as HTMLSpanElement

    if (this.validateInput(input)) {
      span.style.display = 'none'
      return true
    } else {
      span.style.display = 'block'
      return false
    }
  }

  static validateInput (input: HTMLInputElement): boolean {
    if (input.value === null || input.value === '') {
      return false
    }
    const name = /^[A-ZЁА-Я][A-Za-zЁёА-Яа-я-]*$/ // new RegExp('^[ЁА-ЯA-Z]+[ЁёА-Яа-я-]$')
    const login = /^(?=.*[A-Za-z])[A-Za-z0-9-_]{3,20}$/ // new RegExp('^(?=.*[A-Za-z])[A-Za-z0-9]{3,20}$')
    const email = /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+$/ // new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z]+.[A-Za-z]$')
    const password = /^(?=.*[A-Z])(?=.*[0-9]).{8,40}$/ // new RegExp('^(?=.*[A-Z])(?=.*[0-9]).{8,40}$')
    const phone = /^\+?[0-9]{10,15}$/ // new RegExp('^[\+]?[0-9]{10,15}$')
    const message = /^.+$/ // new RegExp('^.+$')

    let result = true

    switch (input.name) {
      case 'first_name':
      case 'second_name':
        result = name.test(input.value)
        break
      case 'login':
        result = login.test(input.value)
        break
      case 'email':
        result = email.test(input.value)
        break
      case 'oldPassword':
      case 'password':
        result = password.test(input.value)
        break
      case 'phone':
        result = phone.test(input.value)
        break
      case 'message':
        result = message.test(input.value)
        break
      default:
        break
    }
    return result
  }
}
