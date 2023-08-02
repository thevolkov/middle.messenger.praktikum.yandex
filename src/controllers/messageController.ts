import chatAPI from '../api/chatAPI'
import store, { StoreEvents } from '../core/store'

class MessageController {
  private chatId: number | undefined
  private userId: number | undefined
  private socket: WebSocket | null

  constructor () {
    this.socket = null
    store.on(StoreEvents.Updated, () => {
      const chatId = store.getState().activeChat
      const user = store.getState().user

      if (user != null && chatId != null && (this.chatId !== chatId || this.userId !== user.id)) {
        this.chatId = chatId
        this.userId = user.id
        const url = 'wss://ya-praktikum.tech/ws/chats'
        chatAPI.getToken(chatId)
            .then((xhr) => {
              const token = JSON.parse(xhr.response).token as string
              // console.log(`User id: ${this.userId}, chat id: ${this.chatId}, token: ${token}`)
              this.socket = new WebSocket(`${url}/${this.userId}/${this.chatId}/${token}`)

              this.socket.addEventListener('open', () => {
                console.log('Socket opened')
                this.getOldMessages()
              })
              this.socket.addEventListener('close', (event) => {
                if (event.wasClean) {
                  console.log('Соединение закрыто чисто')
                } else {
                  console.log('Обрыв соединения')
                }
                console.log(`Код: ${event.code} | Причина: ${event.reason}`)
              })
              this.socket.addEventListener('message', (event) => {
                this.message(event.data)
                // console.log(Array.isArray(event.data))
              })
              this.socket.addEventListener('error', (event) => {
                console.log(event)
              })
            })
            .catch((error) => {
              console.log(error)
            })
      }
    })
  }

  private message (data: unknown): void {
    if (data != null) {
      // @ts-expect-error
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed)) {
        // console.log('MessageController - message - got old messages for chat')
        if (parsed.length > 0) {
          store.set('messages', parsed)
        } else {
          store.set('messages', [])
        }
      } else {
        console.log('MessageController - new message')
        store.set('newMessage', parsed)
      }
    }
  }

  public getOldMessages (): void {
    if (this.socket != null) {
      // console.log('MessageController - getOldMessages - OK, will send')
      this.socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }))
    } else {
      console.log(`MessageController - getOldMessages - socket is null, chatId: ${this.chatId}, userId: ${this.userId}`)
    }
  }

  public sendMessage (message: string): void {
    // console.log('MessegeController - sendMessage')
    if (this.socket != null) {
      this.socket.send(JSON.stringify({
        content: message,
        type: 'message',
      }))
      this.getOldMessages()
    } else {
      console.log('Socket is null')
    }
  }
}

export default new MessageController()
