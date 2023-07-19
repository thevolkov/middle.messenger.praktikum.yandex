import BaseAPI from './baseAPI'

class ChatAPI extends BaseAPI {
  constructor () {
    super('https://ya-praktikum.tech/api/v2/chats')
  }

  async getChats (/* offset: number = 0, limit: number = 10, titleToFilter: string = ''*/): Promise<XMLHttpRequest> {
    return await this.http.get('', { data: {}, headers: { 'Content-Type': 'application/json' } })
  }

  async addUsers (chatId: number, userIds: number[]): Promise<XMLHttpRequest> {
    return await this.http.put('/users', { data: { chatId, users: userIds }, headers: { 'Content-Type': 'application/json' } })
  }

  async getUsers (id: number/* , limit: number = 10, offset: number = 0, nameToFilter: string = '', emailToFilter: string = ''*/): Promise<XMLHttpRequest> {
    return await this.http.get(`/${id}/users`, { data: {}, headers: { 'Content-Type': 'application/json' } })
  }

  async deleteUsers (chatId: number, userIds: number[]): Promise<XMLHttpRequest> {
    return await this.http.delete('/users', { data: { chatId, users: userIds }, headers: { 'Content-Type': 'application/json' } })
  }

  /* async getNewMessagesCount(chatId: number): Promise<XMLHttpRequest> {
    return await this.http.get(`/new/${chatId}`)
  }*/

  async getToken (chatId: number): Promise<XMLHttpRequest> {
    return await this.http.post(`/token/${chatId}`)
  }

  // @ts-expect-error
  async create (title: string): Promise<XMLHttpRequest> {
    return await this.http.post('/', { data: { title }, headers: { 'Content-Type': 'application/json' } })
  }

  // @ts-expect-error
  async delete (id: number): Promise<XMLHttpRequest> {
    return await this.http.delete('/', { data: { chatId: id }, headers: { 'Content-Type': 'application/json' } })
  }

  /* request (): Promise<XMLHTTPRequest> {
    return chatAPIInstance.get('/full')
  }*/
}
export default new ChatAPI()
