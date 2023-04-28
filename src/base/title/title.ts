import Component from '../../utils/Component'
import template from './title.hbs'

export default class Title extends Component {
    constructor (props: { attr: { class: string }; text: string; subtitle?: string; code?: string }) {
        super('div', props)
    }

    render (): string {
        return template(this.getPropsAndChildren())
    }
}
