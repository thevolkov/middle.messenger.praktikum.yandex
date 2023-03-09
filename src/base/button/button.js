import button from './button.hbs'
import Handlebars from "handlebars";

Handlebars.registerPartial('button', button)

export default () => {
    return button()
}
