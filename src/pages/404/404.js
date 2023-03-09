import page404 from './404.hbs';

export default () => {
    document.querySelector('#root').innerHTML = page404()
}