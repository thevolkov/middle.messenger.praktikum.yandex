import { v4 as makeUUID } from 'uuid'
import EventBus from './eventBus'

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}
// @ts-expect-error
export default abstract class Component<Props extends Record<string, any> = unknown> {
  protected id: string
  protected _element: HTMLElement
  protected _meta: Record<string, unknown>
  protected props: Props
  protected children: Record<string, Component | Component[]>
  protected eventBus: EventBus

  constructor (tag: string, all: Props) {
    this.eventBus = new EventBus()

    this.id = makeUUID()
    this._meta = { tag, all }

    const tempProps = {}
    const tempChildren = {}
    Object.entries(all).forEach(([key, value]) => {
      if (value instanceof Component ||
          (Array.isArray(value) && value.length > 0 && value[0] instanceof Component)) {
        // @ts-expect-error
        tempChildren[key] = value
      } else {
        // @ts-expect-error
        tempProps[key] = value
      }
    })
    // @ts-expect-error
    this.props = this._makePropsProxy({ ...tempProps, __id: this.id })
    this.children = tempChildren

    this.registerEvents()
    this.eventBus.emit(EVENTS.INIT)
  }

  /* private _getChildrenAndProps(all: Props): object {
    const props: Props = {}
    const children: Record<string, Block | Block[]> = {}

    Object.entries(all).forEach(([key, value]) => {
      if (value instanceof Block ||
      (Array.isArray(value) && value.length > 0 && value[0] instanceof Block)) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return {props, children}
  }*/

  registerEvents (): void {
    this.eventBus.on(EVENTS.INIT, this.init.bind(this))
    this.eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    this.eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    this.eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  init (): void {
    const { tag } = this._meta
    // @ts-expect-error
    this._element = document.createElement(tag)
    // console.log('INIT - call render')
    this.eventBus.emit(EVENTS.FLOW_RENDER)
  }

  private _componentDidMount (): void {
    this.componentDidMount()
  }

  componentDidMount (): void {
  }

  dispatchComponentDidMount (): void {
    this.eventBus.emit(EVENTS.FLOW_CDM)
  }

  _componentDidUpdate (oldProps: Props, newProps: Props): void {
    const needRender = this.componentDidUpdate(oldProps, newProps)
    if (needRender) {
      // console.log('UPDATE - call render')
      this.eventBus.emit(EVENTS.FLOW_RENDER)
      // this._render()
    }
  }

  componentDidUpdate (oldProps: Props, newProps: Props): boolean {
    if (oldProps === newProps) {
      console.log('oldProps === newProps')
    }
    return true
  }

  _render (): void {
    this._removeEvents()
    // this._element.replaceWith(this.render())
    this._element.innerHTML = ''
    this._element.append(this.render())
    // this._element.innerHTML = this.render()
    this._addAttributes()
    this._addEvents()
  }

  protected compile (template: (props: Props) => string, props: Props): DocumentFragment {
    // console.log('Compile')
    const contentAndStubs = { ...props }

    Object.entries(this.children).forEach(([name, child]) => {
      // console.log('Block - compile() - sort children')
      if (Array.isArray(child)) {
        // console.log('Block - compile - isArray , name: ' + name)
        let result = ''
        for (let i = 0; i < child.length; i++) {
          result += `<div data-id="${child[i].id}">${name}${i}</div>`
        }
        // @ts-expect-error
        contentAndStubs[name] = result
      } else {
        // @ts-expect-error
        contentAndStubs[name] = `<div data-id="${child.id}">${name}</div>`
        // console.log('Block - compile() - name: ' + name + ', value: ' + contentAndStubs[name])
      }
    })

    const html: string = template(contentAndStubs)

    const temp = document.createElement('template')
    temp.innerHTML = html

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        for (let i = 0; i < child.length; i++) {
          const stub = temp.content.querySelector(`[data-id="${child[i].id}"]`)
          if (stub != null) {
            stub.replaceWith(child[i].getContent())
          }
        }
      } else {
        const stub = temp.content.querySelector(`[data-id="${child.id}"]`)
        if (stub != null) {
          stub.replaceWith(child.getContent())
        }
      }
    })
    return temp.content
  }

  private _addAttributes (): void {
    const { attr = {} } = this.props
    Object.entries(attr).forEach(([key, value]) => {
      if (key === 'class') {
        this._element.classList.add(value as string)
      } else {
        // @ts-expect-error
        this._element[key] = value
      }
    })
  }

  render (): DocumentFragment {
    return new DocumentFragment()
  }

  private _makePropsProxy (props: Props): Props {
    const self = this
    return new Proxy(props, {
      get (target: Props, prop: string): unknown {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set (target: Props, prop: string, value: unknown): boolean {
        const oldTarget = { ...target }
        // @ts-expect-error
        target[prop] = value
        // console.log('_makePropsProxy - in set: key='+prop+', value='+value)
        // console.log(target)
        // this.eventBus.emit(EVENTS.FLOW_CDU)
        self.eventBus.emit(EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty (): boolean {
        throw new Error('Нет доступа')
      },
    })
  }

  setProps = (nextProps: Props): void => {
    if (nextProps == null) {
      // console.log('Block setProps - null')
      return
    }
    Object.assign(this.props, nextProps)
    // console.log(nextProps)
  }

  get element (): HTMLElement {
    return this._element
  }

  getPropsAndChildren (): Props {
    const combined = { ...this.props }
    Object.entries(this.children).forEach(([key, value]) => {
      if (value instanceof Component) {
        // @ts-expect-error
        combined[key] = value.element.outerHTML
      } else {// value is Block[]
        // @ts-expect-error
        combined[key] = ''
        value.forEach((child) => {
          // @ts-expect-error
          combined[key] = (combined[key] as string) + (child.element.outerHTML)
        })
      }
    })

    return combined
  }

  getContent (): HTMLElement {
    return this.element
  }

  show (): void {
    console.log('Block - show ')
    // console.log(this.getContent())
    this.getContent().style.display = 'flex'
    // console.log(this.getContent())
  }

  hide (): void {
    console.log('BLOCK -_ HIDE')
    this.getContent().style.display = 'none'
  }

  private _addEvents (): void {
    const { events = {} } = this.props

    Object.entries(events).forEach(([key, value]) => {
      // @ts-expect-error
      this._element.addEventListener(key, value.handler, value.capture)
    })
    /* Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName])
    })*/
  }

  private _removeEvents (): void {
    const { events = {} } = this.props

    Object.entries(events).forEach(([key, value]) => {
      // @ts-expect-error
      this._element.removeEventListener(key, value.handler)
    })
  }

  static renderDOM (query: string, block: Component): Element | null {
    const root = document.querySelector(query)

    if (root != null) {
      root.append(block.getContent())
      block.dispatchComponentDidMount()
    }

    return root
  }
}
