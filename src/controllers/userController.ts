import userAPI, {ChangeProfileData, ChangePasswordData} from '../api/userAPI'
import store from '../core/store'

class UserController {
  public changeAvatar (data: FormData): void {
    console.log('UserController - change avatar')
    userAPI.changeAvatar(data)
      .then((xhr) => {
        const parsed = JSON.parse(xhr.response)
        store.set('user', parsed)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  public changePassword(data: ChangePasswordData) {
    console.log('UserController - change password')
    userAPI.changePassword(data)
      .then((xhr) => {
        console.log(xhr)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  public changeProfile(data: ChangeProfileData) {
    console.log('UserController - change profile')
    userAPI.changeProfile(data)
      .then((xhr) => {
        console.log(xhr)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
export default new UserController()
