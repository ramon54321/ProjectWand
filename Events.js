export default class Events {
  static _latestId = 0
  static bus = {}

  static on(eventName, func) {
    const event = this.bus[eventName]
    if (!event) {
      this.bus[eventName] = {}
    }
    const id = this._latestId
    this.bus[eventName][id] = func
    this._latestId += 1
    return id
  }

  static emit(eventName, ...args) {
    const event = this.bus[eventName]
    if (!event) {
      return
    }
    for(const listener in event) {
      event[listener](...args)
    }
  }

  static remove(eventName, id) {
    const event = this.bus[eventName]
    const listener = event[id]
    if (!event || !listener) {
      return false
    }
    delete event[id]
    return true
  }

  static get(eventName) {
    const event = this.bus[eventName]
    return event
  }

  static getRegisteredEventNames() {
    const eventNames = []
    for (const eventName in this.bus) {
      eventNames.push(eventName)
    }
    return eventNames
  }
}