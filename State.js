import { Events } from './Events.js'

export default class State {
  static _state = {}

  static get(path) {
    const properties = path.split('.')
    return properties.slice(1).reduce((acc, property) => acc = acc ? acc[property] : acc, this._state[properties[0]])
  }

  static set(path, value) {
    Events.emit('StatePathSet', path, value)
    const properties = path.split('.')
    let statePointer = this._state
    properties.forEach((property, index) => {
      let stepPointer = statePointer[property]
      const isLast = index === properties.length - 1
      if (stepPointer) {
        if (isLast) {
          // If property exists, but it is being set
          statePointer[property] = value
        } else {
          // If property exists, continue down the tree
          statePointer = stepPointer
        }
        return
      }
      // Property does not exist, add it to state
      if (isLast) {
        statePointer[property] = value
      } else {
        statePointer[property] = {}
        statePointer = statePointer[property]
      }
    })
  }
}