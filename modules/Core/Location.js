import { Actions, Events } from '../../Events.js'

export default class Location {
  onEnter() {
    console.log("Enter location")
  }
  onExit() {
    console.log("Exit location")
  }
  onEnterAnyLocation() {
    this.on("jump", () => {
      console.log("Jumping")
    })
    this.on("goto", args => {
      Events.emit("SetLocation", args[0])
    })
  }
  onExitAnyLocation() {
    Actions.clear()
  }
  on(action, fn) {
    Actions.on(action, fn)
  }
}