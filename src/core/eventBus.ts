export default class EventBus {
  listeners: Record<string, Function[]>

  constructor () {
    this.listeners = {}
  }

  on (event: string, callback: any): void {
    if (this.listeners[event] == null) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  // off (event: string, callback: (...args: unknown[]) => void): void {
  //   if (this.listeners[event] == null) {
  //     throw new Error(`Нет события: ${event}`)
  //   }
  //
  //   this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback)
  // }

  emit (event: string, ...args: unknown[]): void {
    if (this.listeners[event] == null) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event].forEach((listener) => {
      listener(...args)
    })
  }
}
