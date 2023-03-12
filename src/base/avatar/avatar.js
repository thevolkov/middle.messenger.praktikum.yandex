import avatar from './avatar.hbs'
import Handlebars from "handlebars";

Handlebars.registerPartial('avatar', avatar)

export default () => {
    return avatar()
}
