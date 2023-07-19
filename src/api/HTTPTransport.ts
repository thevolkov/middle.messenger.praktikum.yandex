enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method?: string
  headers?: Record<string, string>
  data?: any
  timeout?: number
}

function queryStringify (data: any): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  let result = ''
  Object.entries(data).forEach(([key, value]) => {
    result = result + key + '=' + (value as string) + '&'
  })
  if (result.length > 0) {
    result = '?' + result.slice(0, -1)
  }
  return result
}

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>

export default class HTTPTransport {
  private readonly host: string
  constructor (host: string) {
    this.host = host
  }

  get: HTTPMethod = async (url, options = {}) => {
    return await this.request(url, { ...options, method: METHOD.GET }, options.timeout)
  }

  post: HTTPMethod = async (url, options = {}) => {
    return await this.request(url, { ...options, method: METHOD.POST }, options.timeout)
  }

  put: HTTPMethod = async (url, options = {}) => {
    return await this.request(url, { ...options, method: METHOD.PUT }, options.timeout)
  }

  delete: HTTPMethod = async (url, options = {}) => {
    return await this.request(url, { ...options, method: METHOD.DELETE }, options.timeout)
  }

  async request (url: string, options: Options = { method: METHOD.DELETE }, timeout: number = 5000): Promise<XMLHttpRequest> {
    url = this.host + url
    const { method, headers = {}, data } = options

    return await new Promise(function (resolve, reject) {
      if (method === null) {
        reject(new Error('No method'))
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet: boolean = method === METHOD.GET

      xhr.open(method as string, isGet && data != null ? url + queryStringify(data) : url)

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })
      xhr.withCredentials = true
      xhr.onload = function () {
        // console.log('HTTPTransport - request - onLoad - ' + xhr.status)
        // console.log('HTTPTransport - request - onLoad - ' + xhr.response)
        if (xhr.status < 400) {
          resolve(xhr)
        } else {
          reject(xhr)
        }
      }

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (isGet || (data == null)) {
        xhr.send()
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
