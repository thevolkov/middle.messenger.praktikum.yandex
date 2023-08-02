import Component from '../../core/component'
import Button from '../../components/button/button'
import Input from '../../components/input/input'
import InputGroup from '../../components/inputgroup/inputgroup'
import Link from '../../components/link/link'
import template from './profile.hbs'
import authController from '../../controllers/authController'
import userController from '../../controllers/userController'
import store, { StoreEvents } from '../../core/store'
import { BASE_URL } from '../../constants'
import { type ChangePasswordData, type ChangeProfileData } from '../../api/userAPI'
// @ts-ignore
import defaultAvatar from '../../../static/chat_avatar.png'

export default class ProfilePage extends Component {
  constructor () {
    const props = {
      attr: { class: 'profile-page' },

      link: new Link({
        attr: {
          class: 'circle',
          textContent: 'Назад',
        },
        href: '/messenger',
      }),

      input: new Input({
        attr: {
          id: 'profile__avatar-input',
          type: 'file',
        },
      }),

      button: new Button({
        attr: {
          textContent: 'Изменить аватар',
        },
        events: {
          click: {
            handler: () => {
              const input = document.getElementById('profile__avatar-input') as HTMLInputElement
              if (input != null && input.files != null && input.files.length > 0) {
                const file = input.files[0]
                const data = new FormData()
                data.append('avatar', file)
                userController.changeAvatar(data)
                input.value = ''
              }
            },
            capture: false,
          },
        },
      }),

      inputgroups: [
        new InputGroup('profile__input-group', 'email'),
        new InputGroup('profile__input-group', 'login'),
        new InputGroup('profile__input-group', 'first_name'),
        new InputGroup('profile__input-group', 'nick'),
        new InputGroup('profile__input-group', 'second_name'),
        new InputGroup('profile__input-group', 'phone'),
        new InputGroup('profile__input-group', 'old_password'),
        new InputGroup('profile__input-group', 'password'),
        new InputGroup('profile__input-group', 'password_repeat'),
      ],
      buttons: [
        new Button({
          attr: {
            class: 'buttons__change-data-button',
            textContent: 'Изменить данные',
          },
          events: {
            click: {
              handler: () => {
                let isValid = true
                const fields = {}
                const inputs = document.querySelectorAll('input')
                inputs.forEach((input) => {
                  if(input.type !== 'file' && input.type !== 'password') {
                    if(InputGroup.validateInputGroup(input)) {
                      // @ts-ignore
                      fields[input.name] = input.value
                    } else {
                      isValid = false
                    }
                  }
                })
                if(isValid) {
                  userController.changeProfile(fields as ChangeProfileData)
                }
              },
              capture: false,
            },
          },
        }),
        new Button({
          attr: {
            class: 'buttons__change-password',
            textContent: 'Изменить пароль',
          },
          events: {
            click: {
              handler: () => {
                const oldPassword = (document.getElementsByName('oldPassword')[0] as HTMLInputElement)
                const newPassword = (document.getElementsByName('password')[0] as HTMLInputElement)
                const repeatPassword = (document.getElementsByName('newPassword')[0] as HTMLInputElement).value

                if(InputGroup.validateInputGroup(oldPassword) && InputGroup.validateInputGroup(newPassword)) {
                  if(oldPassword.value === newPassword.value) {
                    console.log('Profile - change password - old === new')
                  } else if (newPassword.value !== repeatPassword) {
                    console.log('Profile - change password - password !== repeatPassword')
                  } else {
                    userController.changePassword({
                      oldPassword: oldPassword.value,
                      newPassword: newPassword.value
                    } as ChangePasswordData)
                  }
                }
              },
              capture: false
            }
          }
        }),
        new Button({
          attr: {
            class: 'buttons__exit-button',
            textContent: 'Выйти',
          },
          events: {
            click: {
              handler: () => {
                authController.logout()
              },
              capture: false,
            },
          },
        }),
      ],
    }

    super('main', props)

    authController.getUser()

    store.on(StoreEvents.Updated, () => {
      const user = store.getState().user
      if (user != null) {
        this.setProps({
          avatar_link: user.avatar
            ? `${BASE_URL}/resources${user.avatar}`
            : defaultAvatar
        })
      }
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
