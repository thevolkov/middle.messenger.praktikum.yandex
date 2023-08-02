import Route from './route'

export default class Router {
  private readonly routes: Route[] | undefined
  private readonly history: History | undefined
  private _currentRoute: Route | null | undefined
  private readonly _rootQuery: string | undefined
  private static __instance: Router | null

  constructor (rootQuery: string) {
    if (Router.__instance != null) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    Router.__instance = this
  }

  use (pathname: string, block: unknown): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this.routes && this.routes.push(route)
    return this
  }

  start (): void {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window
      this._onRoute(target.location.pathname)
    }
    this._onRoute(window.location.pathname)
  }

  _onRoute (pathname: string): void {
    const route = this.getRoute(pathname)
    if (route == null) return

    if (this._currentRoute != null && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }

  go (pathname: string): void {
    this.history && this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  // back (): void {
  //   //if (this.routes == null || this.routes.length < 2 || this._currentRoute == null) {
  //   //  return
  //   //}
  //   window.history.back()
  // }

  // forward (): void {
  //   //if (this.routes == null || this.routes.length < 2 || this._currentRoute == null) {
  //   //  return
  //   //}
  //   window.history.forward()
  // }

  getRoute (pathname: string): Route | undefined {
    return this.routes && this.routes.find((route) => route.match(pathname))
  }
}
