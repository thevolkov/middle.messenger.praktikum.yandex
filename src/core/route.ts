import type Component from './component'

export default class Route {
  private _pathname: string
  private readonly _blockClass: unknown
  private _block: Component | null
  private readonly _props: Record<string, unknown>

  constructor (pathname: string, view: unknown, props: Record<string, unknown>) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
    console.log(this._props)
  }

  navigate (pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave (): void {
    this._block = null
  }

  match (pathname: string): boolean {
    return pathname === this._pathname
  }

  render (): void {
    if (this._block == null) {
      // @ts-expect-error
      this._block = new this._blockClass()

      const root = document.body
      root.innerHTML = ''
      // @ts-expect-error
      root.append(this._block.getContent())
    }
  }
}
