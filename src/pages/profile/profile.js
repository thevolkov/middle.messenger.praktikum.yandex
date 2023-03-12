import profile from './profile.hbs';

export default () => {
    document.querySelector('#root').innerHTML = profile()
}
