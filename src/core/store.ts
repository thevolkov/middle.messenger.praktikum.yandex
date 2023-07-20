import EventBus from './eventBus'

export enum StoreEvents {
  Updated = 'updated',
}

type Indexed<T = any> = {
  [key in string]: T;
}

function merge (lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!(Object.prototype.hasOwnProperty.call(rhs, p) as boolean)) {
    // if (!rhs.hasOwnProperty(p)) {
      continue
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed)
      } else {
        lhs[p] = rhs[p]
      }
    } catch (e) {
      lhs[p] = rhs[p]
    }
  }
  return lhs
}

function set (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object
  }

  // if (typeof path !== 'string') {
  //   throw new Error('path must be string')
  // }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any)
  return merge(object as Indexed, result)
}

class Store extends EventBus {
  private readonly state: Indexed
  // public static readonly STORE_NAME: string = 'myAppStore'

  constructor () {
    super()
    // const saveState = localStorage.getItem(Store.STORE_NAME)
    // this.state = savedState ? (JSON.parce(savedState) ?? {}) : {}
    this.state = {}
    // this.on(StoreEvents.Update, () => {
    //  localStorage.setItem(Store.STORE_NAME, JSON.stringify(this.state))
    // })
  }

  public getState (): Indexed {
    return this.state
  }

  // public removeState (): void {
  //   this.state = {}
  //   // this.emit(StoreEvents.Update)
  // }

  public set (path: string, value: unknown): void {
    set(this.state, path, value)
    this.emit(StoreEvents.Updated)
  }
}

export default new Store()
