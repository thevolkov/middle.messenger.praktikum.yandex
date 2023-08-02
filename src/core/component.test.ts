import Component from './component'

class FakePage extends Component {
  render (): DocumentFragment {
    const content = new DocumentFragment()
    const paragraph = document.createElement('div')
    paragraph.textContent = 'fake content'
    content.appendChild(paragraph)

    return content
  }
}

const fakeBlock = new FakePage('main', {})

describe('Block', () => {
  test('should return element with given tagname', () => {
    expect(fakeBlock.element.tagName).toEqual('MAIN')
  })

  test('should return element with given content', () => {
    expect(fakeBlock.element.innerHTML).toEqual('<div>fake content</div>')
  })
})
