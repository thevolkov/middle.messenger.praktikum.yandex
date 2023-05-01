import './src/styles/main.scss';
import SignIn from './src/pages/signIn/signIn';
import SignUp from './src/pages/signUp/signUp';
import MainPage from './src/pages/mainPage/mainPage';
import Profile from './src/pages/profile/profile';
import ProfileEdit from './src/pages/profileEdit/profileEdit';
import ChangePassword from './src/pages/changePassword/changePassword';
import Page404 from './src/pages/404/404';
import Page500 from './src/pages/500/500';
import Chat from './src/pages/chat/chat';
import { Pages } from './src/constants';

export default class App {
  private static readonly body = document.body;

  static pages(id: string): void {
    let page;

    switch (id) {
      case Pages.Chat:
        page = new Chat();
        break;
      case Pages.SignIn:
        page = new SignIn();
        break;
      case Pages.SignUp:
        page = new SignUp();
        break;
      case Pages.Profile:
        page = new Profile();
        break;
      case Pages.ProfileEdit:
        page = new ProfileEdit();
        break;
      case Pages.ChangePassword:
        page = new ChangePassword();
        break;
      case Pages.Page404:
        page = new Page404();
        break;
      case Pages.Page500:
        page = new Page500();
        break;
      default:
        page = new MainPage();
        break;
    }

    if (page !== null) {
      App.body.textContent = '';
      App.body.append(page.element);
    }
  }

  routes(): void {
    const handleHashChange = () => { App.pages(window.location.hash.slice(1)) };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
  }

  run(): void {
    App.pages(Pages.MainPage);
    this.routes();
  }
}
