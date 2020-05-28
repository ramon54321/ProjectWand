import { Actions } from './Events.js'

export default class Location {
  _listeners = []
  onEnter() {
    console.log("Enter location")
  }
  onExit() {
    console.log("Exit location")
  }
  onEnterAnyLocation() {
    this._listeners.push(Actions.on("jump", () => {
      console.log("Jumping")
    }))
  }
  onExitAnyLocation() {
    this._listeners.forEach(Actions.remove)
    this._listeners = []
  }
  on(action, fn) {
    this._listeners.push(Actions.on(action, fn))
  }
}