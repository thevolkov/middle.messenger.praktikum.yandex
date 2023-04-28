export default class EventBus {

  public listeners: { [event: string]: ((...args: unknown[]) => void)[] } = {}

  public constructor () {
    this.listeners = {}
  }

  public on (event: string, callback: any): void {
    if (this.listeners[event] == null)  this.listeners[event] = []

    this.listeners[event].push(callback)
  }

  public off (event: string, callback: (...args: unknown[]) => void): void {
    if (this.listeners[event] == null)  throw new Error(`Нет события: ${event}`)

    this.listeners[event] = this.listeners[event]
      .filter((listener: (...args: unknown[]) => void) => listener !== callback)
  }

  public emit(event: string, ...args: unknown[]): void {
    if (this.listeners[event] == null) throw new Error(`Нет события: ${event}`)

    this.listeners[event]
      .forEach((listener: (...args: unknown[]) => void) => listener(...args))
  }
}
