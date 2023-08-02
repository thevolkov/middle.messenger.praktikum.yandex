import { expect } from 'chai';
import Component from './component';
import { JSDOM } from 'jsdom';

// Create a virtual DOM using JSDOM before running the tests
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
(global as any).document = dom.window.document;
(global as any).window = dom.window;

class FakePage extends Component {
    render(): DocumentFragment {
        const content = document.createDocumentFragment(); // Use createDocumentFragment() instead
        const paragraph = document.createElement('div');
        paragraph.textContent = 'fake content';
        content.appendChild(paragraph);

        return content;
    }
}

const fakeBlock = new FakePage('main', {});

describe('Block', () => {
    it('should return element with given tagname', () => {
        expect(fakeBlock.element.tagName).to.equal('MAIN');
    });

    it('should return element with given content', () => {
        const expectedHTML = '<div>fake content</div>';
        const actualHTML = fakeBlock.element.innerHTML;
        expect(actualHTML).to.equal(expectedHTML);
    });
});
