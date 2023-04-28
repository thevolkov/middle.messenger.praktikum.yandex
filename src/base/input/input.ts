import Component from '../../utils/Component';
import template from './input.hbs';
import Label from '../../base/label/label';
import Span from '../../base/span/span';
import { inputData } from '../../constants';

class Input extends Component {
  constructor(props: { [x: string]: any; attr?: { name: any; type: any; class: string; }; }) {
    super('input', props);
  }
}

export default class Inputs extends Component {
  constructor(className: string, type: string, value?: string) {
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
    };

    super('div', props);
  }

  render(): string {
    this.children.span.hide();
    return template(this.getPropsAndChildren());
  }

  static validate(): boolean {
    const fields = {};
    let result = true;
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      Inputs.validateInputs(input);
      fields[input.name] = input.value;
    });
    return result;
  }

  static validateInputs(input: HTMLInputElement): boolean {
    const span = input.parentNode.parentNode.querySelector('span') as HTMLSpanElement;

    if (this.validateInput(input)) {
      console.log('OK, ' + input.name + ': ' + input.value);
      span.style.display = 'none';
      return true;
    } else {
      span.style.display = 'block';
      console.log('Validation failed: ' + input.name + ': ' + input.value);
      return false;
    }
  }

  static validateInput(input: HTMLInputElement): boolean {
    if (input.value === null || input.value === '') {
      return false;
    }
    const name = /^[A-ZЁА-Я][A-Za-zЁёА-Яа-я-]*$/; // new RegExp('^[ЁА-ЯA-Z]+[ЁёА-Яа-я-]$')
    const login = /^(?=.*[A-Za-z])[A-Za-z0-9-_]{3,20}$/; // new RegExp('^(?=.*[A-Za-z])[A-Za-z0-9]{3,20}$')
    const email = /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+$/; // new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z]+.[A-Za-z]$')
    const password = /^(?=.*[A-Z])(?=.*[0-9]).{8,40}$/; // new RegExp('^(?=.*[A-Z])(?=.*[0-9]).{8,40}$')
    const phone = /^\+?[0-9]{10,15}$/; // new RegExp('^[\+]?[0-9]{10,15}$')
    const message = /^.+$/; // new RegExp('^.+$')

    let result = true;

    switch (input.name) {
      case 'first_name':
      case 'second_name':
        result = name.test(input.value);
        break;
      case 'login':
        result = login.test(input.value);
        break;
      case 'email':
        result = email.test(input.value);
        break;
      case 'password':
        result = password.test(input.value);
        break;
      case 'phone':
        result = phone.test(input.value);
        break;
      case 'message':
        result = message.test(input.value);
        break;
      default:
        break;
    }
    return result;
  }
}
