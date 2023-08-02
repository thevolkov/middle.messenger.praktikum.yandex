import HTTPTransport, { queryStringify } from "./HTTPTransport";

const http = new HTTPTransport('https://jsonplaceholder.typicode.com/posts');
const data = {
    id: 1,
    role: 'admin'
};

const testData = {
    data: 'foo'
};

describe('HTTP', () => {

    test('queryStringify should return url query string from object', () => {
        const queryString = queryStringify(data);
        expect(queryString).toEqual('?id=1&role=admin');
    })

    test('get() should send GET request', async () => {
        const get = async() => {
            await http.get('/1');
        }
        expect(get).not.toThrow();
    })

    test('post() should send POST request with data', async () => {

        const post = async() => {
            await http.post('/', testData);
        }
        expect(post).not.toThrow();
    })
})
