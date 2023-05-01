import Component from '../../utils/Component'
import template from './input.hbs'
import Label from '../../base/label/label'
import Span from '../../base/span/span'
import { inputData } from '../../constants'
import { checkInput, validation } from '../../utils/validation'

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

  static checkInput (arg: HTMLInputElement): void {
    checkInput(arg)
  }

  static validation (): boolean {
    return validation()
  }
}
