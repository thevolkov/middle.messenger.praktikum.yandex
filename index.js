import './src/base'
import './src/styles/main.scss'
import {
    signIn,
    signUp,
    page404,
    page500,
    chat,
    profile,
    profileEdit,
    changePassword
} from './src/pages/index'

switch (window.location.pathname) {
    case '/':
    case '/signin':
        signIn()
        break
    case '/signup':
        signUp()
        break
    case '/chat':
        chat()
        break
    case '/profile':
        profile()
        break
    case '/profile-edit':
        profileEdit()
        break
    case '/change-password':
        changePassword()
        break
    case '/404':
        page404()
        break
    case '/500':
        page500()
        break
}
