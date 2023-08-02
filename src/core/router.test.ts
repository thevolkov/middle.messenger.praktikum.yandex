import Component from './component'
import Router from './router'

class FakePage extends Component {
  render (): DocumentFragment {
    return new DocumentFragment()
  }
}

document.body.innerHTML = '<div class="app"></div>'
const router = new Router('.app')

describe('Router', () => {
  test('use() should return Router instance', () => {
    const result = router.use('/test', FakePage)
    expect(result).toEqual(router)
  })

  test('transition to page change history', () => {
    window.history.pushState({}, 'Page', '/')
    window.history.pushState({}, 'OtherPage', '/otherpage')

    expect(window.history.length).toBe(3)
  })
})
