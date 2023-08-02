import Router from './router';
import Component from './component';
import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
(global as any).document = dom.window.document;
(global as any).window = dom.window;

class FakePage extends Component {
    render(): DocumentFragment {
        return new DocumentFragment();
    }
}

document.body.innerHTML = '<div class="app"></div>';
const router = new Router('.app');

describe('Router', () => {
    it('use() should return Router instance', () => {
        const result = router.use('/test', FakePage);
        expect(result).to.eq(router);
    });

    it('transition to page change history', () => {
        const pushStateStub = sinon.stub(window.history, 'pushState');

        window.history.pushState({}, 'Page', '/');
        window.history.pushState({}, 'OtherPage', '/otherpage');
        window.history.pushState({}, 'Test', '/test');

        expect(pushStateStub.callCount).to.eq(3);

        pushStateStub.restore();
    });
});
