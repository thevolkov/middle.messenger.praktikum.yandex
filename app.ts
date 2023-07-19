import LoginPage from './src/pages/login/login'
import SignupPage from './src/pages/signup/signup'
import ProfilePage from './src/pages/profile/profile'
import UserPage from './src/pages/user/user'
import Router from './src/core/router'
import './src/styles/main.scss';

export const enum Pages {
  Login = '/',
  SignUp = '/sign-up',
  Settings = '/settings',
  Messenger = '/messenger',
}

export default class App {
  private static readonly router: Router

  constructor () {
    this.router = new Router('.app')
    this.router.use(Pages.Login, LoginPage)
      .use(Pages.SignUp, SignupPage)
      .use(Pages.Settings, ProfilePage)
      .use(Pages.Messenger, UserPage)
  }

  run (): void {
    this.router.start()
  }
}
