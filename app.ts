import type Component from './src/utils/Component'
import './src/styles/main.scss'
import SignIn from './src/pages/signIn/signIn'
import SignUp from './src/pages/signUp/signUp'
import MainPage from './src/pages/mainPage/mainPage'
import Profile from './src/pages/profile/profile'
import ProfileEdit from './src/pages/profileEdit/profileEdit'
import ChangePassword from './src/pages/changePassword/changePassword'
import Page404 from './src/pages/404/404'
import Page500 from './src/pages/500/500'
import Chat from './src/pages/chat/chat'
import { PageIds } from './src/constants'

export default class App {
  private static readonly bodyContainer: HTMLElement = document.body

  static pages (pageId: string): void {
    let page: Component | null = null

    switch (pageId) {
      case PageIds.Chat:
        page = new Chat()
        break
      case PageIds.SignIn:
        page = new SignIn()
        break
      case PageIds.SignUp:
        page = new SignUp()
        break
      case PageIds.Profile:
        page = new Profile()
        break
      case PageIds.ProfileEdit:
        page = new ProfileEdit()
        break
      case PageIds.ChangePassword:
        page = new ChangePassword()
        break
      case PageIds.Page404:
        page = new Page404()
        break
      case PageIds.Page500:
        page = new Page500()
        break
      default:
        page = new MainPage()
        break
    }

    if (page !== null) {
      App.bodyContainer.innerHTML = ''
      App.bodyContainer.append(page.element)
    }
  }

  enableRouteChange (): void {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      App.pages(hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()
  }

  run (): void {
    App.pages(PageIds.MainPage)
    this.enableRouteChange()
  }
}
