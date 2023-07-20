import authAPI, { type SigninData, type SignupData } from '../api/authAPI'
import Router from '../core/router'
import store from '../core/store'

class AuthController {
  private readonly router: Router

  constructor () {
    this.router = new Router('.app')
  }

  public logout (): void {
    authAPI.logout()
      .then(() => {
        this.router.go('/')
        store.set('user', null)
      })
      .catch((error) => {
        console.log('AuthController - logout - error: ' + JSON.stringify(error.response))
      })
  }

  public signup (data: SignupData): void {
    authAPI.signup(data)
      .then(() => {
        this.router.go('/settings')
      })
      .catch((error) => {
        if (error.response === '{"reason":"User already in system"}') {
          this.router.go('/settings')
        } else {
          console.log('AuthController - signup - error: ' + JSON.stringify(error.response))
        }
      })
  }

  public signin (data: SigninData): void {
    authAPI.signin(data)
      .then(() => {
        this.router.go('/messenger')
      })
      .catch((error) => {
        if (error.response === '{"reason":"User already in system"}') {
          this.router.go('/messenger')
        } else {
          console.log(error)
        }
      })
  }

  public getUser (): void {
    authAPI.getUser()
      .then((xhr) => {
        store.set('user', JSON.parse(xhr.response))
        console.log('AuthController - getUser - OK')
      })
      .catch((error) => console.error(error))
  }
}
export default new AuthController()
