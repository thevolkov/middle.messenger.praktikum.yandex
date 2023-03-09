import link from './link.hbs'
import Handlebars from "handlebars";

Handlebars.registerPartial('link', link)

export default () => {
    return link()
}
