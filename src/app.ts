import LoginPage from './pages/login/login'
import SignupPage from './pages/signup/signup'
import ProfilePage from './pages/profile/profile'
import UserPage from './pages/user/user'
import Router from './core/router'
import './styles/main.scss';

export const enum Pages {
  Login = '/',
  SignUp = '/sign-up',
  Settings = '/settings',
  Messenger = '/messenger',
}

export default class App {
  private readonly router: Router

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
