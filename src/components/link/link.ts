import Component from '../../core/component'
import Router from '../../core/router'

export default class Link extends Component {
  private readonly router: Router
  constructor (props: Record<string, unknown>) {
    props = {
      ...props,
      events: {
        click: {
          handler: (e) => {
            e.preventDefault()
            if (this.props.href != null) {
              this.router.go(this.props.href)
            }
          },
          capture: false,
        },
      },
    }
    super('button', props)
    this.router = new Router()
  }
}
