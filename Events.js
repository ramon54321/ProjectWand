export class EventBus {
  _latestId = 0
  bus = {}

  on(eventName, func) {
    const event = this.bus[eventName]
    if (!event) {
      this.bus[eventName] = {}
    }
    const id = this._latestId
    this.bus[eventName][id] = func
    this._latestId += 1
    return id
  }

  emit(eventName, ...args) {
    const event = this.bus[eventName]
    if (!event) {
      return
    }
    for(const listener in event) {
      event[listener](...args)
    }
  }

  remove(eventName, id) {
    const event = this.bus[eventName]
    const listener = event[id]
    if (!event || !listener) {
      return false
    }
    delete event[id]
    return true
  }

  clear() {
    this.bus = {}
  }

  get(eventName) {
    const event = this.bus[eventName]
    return event
  }

  getRegisteredEventNames() {
    const eventNames = []
    for (const eventName in this.bus) {
      eventNames.push(eventName)
    }
    return eventNames
  }
}

const Events = new EventBus()
export default Events