import EventBus from './EventBus'

type Props = Record<string, any>
type Handler = (event: Event) => void
type EventHandler = {
  handler: Handler
  [key: string]: any
}

export default class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CDR: 'flow:component-did-render',
    FLOW_RENDER: 'flow:render',
  }

  protected _element?: HTMLElement
  protected _meta: Record<string, any>
  protected props: Props
  protected children: Record<string, Component | Component[]>
  protected eventBus: EventBus

  constructor (tag: string, all: Props) {
    this._meta = { tag, all }

    const tempProps: Record<string, unknown> = {}
    const tempChildren: Record<string, Component | Component[]> = {}

    Object.entries(all).forEach(([key, value]) => {
      if (value instanceof Component || (
        Array.isArray(value) &&
        value.length > 0 &&
        value[0] instanceof Component
      )) {
        tempChildren[key] = value
      } else {
        tempProps[key] = value
      }
    })

    this.props = this._makePropsProxy(tempProps)
    this.children = tempChildren
    this.eventBus = new EventBus()
    this.registerEvents()
    this.eventBus.emit(Component.EVENTS.INIT)
  }

  registerEvents (): void {
    this.eventBus.on(Component.EVENTS.INIT, this.init.bind(this))
    this.eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    this.eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    this.eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  init (): void {
    const { tag } = this._meta
    this._element = document.createElement(tag)
    this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
  }

  render (): string {
    return typeof this.props.text === 'string' ?
      this.props.text :
      ''
  }

  _render (): void {
    if (this._element !== null && this._element !== undefined) this._element.innerHTML = this.render()

    this._removeEvents()
    this._addAttributes()
    this._addEvents()
  }

  componentDidMount (): void {}

  private _componentDidMount (): void {
    this.componentDidMount()
  }

  componentDidUpdate (_prev: Props, _props: Props): boolean {
    return true
  }

  _componentDidUpdate (prev: Props, props: Props): void {
    const render = this.componentDidUpdate(prev, props)

    if (render) this._render()
  }

  private _addAttributes (): void {
    const { attr = {} }: { attr?: Record<string, unknown> } = this.props

    Object.entries(attr).forEach(([key, value]) => {
      key === 'class' ?
        typeof value === 'string' ?
          this._element?.classList.add(value) :
          Array.isArray(value) && this._element?.classList.add(...value) :
        this._element?.setAttribute(key, String(value))
    })
  }

  private _makePropsProxy (props: Props): Props {
    return new Proxy(props, {
      get: (target: Props, prop: string) => (typeof target[prop] === 'function') ?
        target[prop].bind(target) :
        target[prop],
      set: (target: Props, prop: string, value: unknown) => {
        target[prop] = value
        return true
      },
      deleteProperty: () => {
        throw new Error('Error!')
      },
    })
  }

  get element (): HTMLElement {
    if (this._element == null) throw new Error('Element is undefined.')

    return this._element
  }

  getPropsAndChildren (): Props {
    return Object.entries(this.children).reduce((combined, [key, value]) => {
      if (value instanceof Component) combined[key] = value.element.outerHTML
      else combined[key] = value.reduce((acc: string, child: Component) => acc + child.element.outerHTML, '')

      return combined
    }, { ...this.props })
  }

  getContent = (): HTMLElement => this.element

  hide (): void {
    this.getContent().style.display = 'none'
  }

  private _addEvents (): void {
    const { events = {} } = this.props
    Object.entries(events).forEach(([key, value]) => {
      this._element?.addEventListener(key, (value as EventHandler).handler, (value as EventHandler).capture)
    })
  }

  private _removeEvents (): void {
    const { events = {} } = this.props
    Object.entries(events).forEach(([key, value]) => {
      this._element?.removeEventListener(key, (value as EventHandler).handler)
    })
  }
}
