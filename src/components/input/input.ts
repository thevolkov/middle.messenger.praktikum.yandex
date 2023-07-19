import Component from '../../core/component'
import store, { StoreEvents } from '../../core/store'

export default class Input extends Component {
  constructor (props: Record<string, unknown> = {}) {
    super('input', props)
    store.on(StoreEvents.Updated, () => {
      const user = store.getState().user
      if (user != null) {
        Object.entries(user).forEach(([key, value]) => {
          if (this.getContent().name === key) {
            this.setProps({
              attr: {
                value,
              },
            })
          }
        })
      }
    })
  }
}
