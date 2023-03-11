import chat from './chat.hbs';

export default () => {
    document.querySelector('#root').innerHTML = chat()
}
