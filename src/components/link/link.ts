import Component from '../../core/component'
import Router from '../../core/router'

export default class Link extends Component {
  private readonly router: Router
  constructor (props: Record<string, unknown>) {
    props = {
      ...props,
      events: {
        click: {
          handler: (e: Event) => {
            e.preventDefault()
            // @ts-ignore
            const href: string = this.props.href
            if (href != null) {
              this.router.go(href)
            }
          },
          capture: false,
        },
      },
    }
    super('button', props)
    this.router = new Router('.app')
  }
}
