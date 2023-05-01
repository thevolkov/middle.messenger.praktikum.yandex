import Component from '../../utils/Component'
import template from './input.hbs'
import Label from '../../base/label/label'
import Span from '../../base/span/span'
import { inputData } from '../../constants'

class Input extends Component {
  constructor (props: { [x: string]: any, attr?: { name: any, type: any, class: string } }) {
    super('input', props)
  }
}

export default class Inputs extends Component {
  constructor (className: string, type: string) {
    const props = {
      attr: { class: 'input-wrapper' },
      class: className,
      label: new Label({
        attr: { class: 'signUp-page__label' },
        text: inputData[type].text,
      }),
      input: new Input({
        attr: {
          name: inputData[type].name,
          type: inputData[type].type,
          class: 'input',
        },
      }),
      span: new Span({
        text: inputData[type].span,
      }),
    }

    super('div', props)
  }

  render (): string {
    if (!Array.isArray(this.children.span)) this.children.span.hide()
    return template(this.getPropsAndChildren())
  }

  static validatePatterns (input: HTMLInputElement): boolean {
    const patterns: Record<string, RegExp> = {
      name: /^[A-ZЁА-Я][A-Za-zЁёА-Яа-я-]*$/,
      login: /^(?=.*[A-Za-z])[A-Za-z0-9-_]{3,20}$/,
      email: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+$/,
      password: /^(?=.*[A-Z])(?=.*[0-9]).{8,20}$/,
      phone: /^\+?[0-9]{10,15}$/,
    }
    const pattern = patterns[input.name]
    if (pattern === undefined) return true

    return pattern.test(input.value)
  }

  static checkInput (input: HTMLInputElement): void {
    const parentNode = input.parentNode
    const grandparentNode = parentNode?.parentNode
    const span = grandparentNode?.querySelector('span')
    const isValid = this.validatePatterns(input)
    if (span === undefined || span === null) return
    if (isValid) {
      span.style.display = 'none'
      console.log(input.name + ' Validation OK')
    } else {
      span.style.display = 'block'
      console.error(input.name + ' Validation ERROR')
    }
  }

  static validation (): boolean {
    const fields: Record<string, any> = {}
    const result = true
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input) => {
      Inputs.checkInput(input)
      fields[input.name] = input.value
    })
    return result
  }
}
