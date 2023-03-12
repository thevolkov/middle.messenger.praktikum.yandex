import title from './title.hbs'
import Handlebars from "handlebars";

Handlebars.registerPartial('title', title)

export default () => {
    return title()
}
