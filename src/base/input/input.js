import input from './input.hbs'
import Handlebars from "handlebars";

Handlebars.registerPartial('input', input)

export default () => {
    return input()
}
