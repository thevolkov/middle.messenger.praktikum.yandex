export const Links = [
  { url: '#signin', text: 'Войти' },
  { url: '#signup', text: 'Регистрация' },
  { url: '#profile', text: 'Профиль' },
  { url: '#profile-edit', text: 'Редактировать профиль' },
  { url: '#change-password', text: 'Сменить пароль' },
  { url: '#chat', text: 'Чат' },
  { url: '#error404', text: 'Страница 404' },
  { url: '#error500', text: 'Страница 500' },
]
export const enum PageIds {
  SignIn = 'signin',
  SignUp = 'signup',
  Profile = 'profile',
  ProfileEdit = 'profile-edit',
  ChangePassword = 'change-password',
  Chat = 'chat',
  Page404 = 'error404',
  Page500 = 'error500',
  MainPage = 'main',
}

export const inputData = {
  email: {
    text: 'Почта',
    name: 'email',
    type: 'email',
    span: 'латиница',
  },
  login: {
    text: 'Логин',
    name: 'login',
    type: 'text',
    span: 'от 3 до 20 символов',
  },
  display_name: {
    text: 'Имя в чатах',
    name: 'display_name',
    type: 'text',
    span: 'от 3 до 20 символов',
  },
  first_name: {
    text: 'Имя',
    name: 'first_name',
    type: 'text',
    span: 'латиница или кириллица',
  },
  second_name: {
    text: 'Фамилия',
    name: 'second_name',
    type: 'text',
    span: 'латиница или кириллица',
  },
  phone: {
    text: 'Телефон',
    name: 'phone',
    type: 'tel',
    span: 'от 10 до 15 символов',
  },
  password: {
    text: 'Пароль',
    name: 'password',
    type: 'password',
    span: 'от 8 до 40 символов',
  },
  password_repeat: {
    text: 'Повторить пароль',
    name: 'password_repeat',
    type: 'password',
    span: 'от 8 до 40 символов',
  },
  password_old: {
    text: 'Старый пароль',
    name: 'password_old',
    type: 'password',
    span: 'от 8 до 40 символов',
  },
  search: {
    text: 'Поиск',
    name: 'search',
    type: 'text',
  },
}
