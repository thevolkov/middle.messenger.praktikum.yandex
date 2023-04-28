const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

type Options = {
  method: string
  headers?: Record<string, string>
  data?: any
  timeout?: void
}

type Url = string | URL

function queryStringify(data: { [x: string]: any; }) {
  return Object.keys(data).reduce((acc, value, index) => {
    return `${acc}${value}=${data[value]}${index < Object.keys(data).length - 1 ? '&' : ''}`;
  }, '?');
}

export default class HTTPTransport {
  request = async (url: Url, options: Options, timeout = 5000) => {
    try {
      return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(options.method, url);
        xhr.timeout = timeout;
        xhr.withCredentials = true;

        if (options.headers) {
          Object.keys(options.headers).forEach(key => {
            if (options.headers) xhr.setRequestHeader(key, options.headers[key]);
          });
        }

        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr);
          } else {
            reject(new Error(`HTTP error ${xhr.status}: ${xhr.statusText}`));
          }
        };

        xhr.onerror = function() {
          reject(new Error('Network error'));
        };

        xhr.ontimeout = function() {
          reject(new Error('Request timed out'));
        };

        xhr.send(options.data ? JSON.stringify(options.data) : null);
      });
    } catch (error) {
      console.log(error);
    }
  };

  get = (url: Url, options: Options) => {
    const query = options.data ? queryStringify(options.data) : '';
    return this.request(`${url}${query}`, { ...options, method: METHODS.GET }, options.timeout!);
  };

  put = (url: Url, options: Options) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout!);
  };

  post = (url: Url, options: Options) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout!);
  };

  delete = (url: Url, options: Options) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout!);
  };
}