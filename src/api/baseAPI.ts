import HTTPTransport from './HTTPTransport'

export default abstract class BaseAPI {
  protected readonly http: HTTPTransport

  constructor (url: string) {
    this.http = new HTTPTransport(url)
  }

  create (): never {throw new Error('Not implemented')}

  request (): never {throw new Error('Not implemented')}

  update (): never {throw new Error('Not implemented')}

  delete (): never {throw new Error('Not implemented')}
}
