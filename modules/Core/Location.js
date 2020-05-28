import Events from '../../Events.js'

export default class Location {
  jump() {
    Events.emit("Output", "Jumping")
  }
  goto(args) {
    Events.emit("Output", `Going to ${args[0]}`)
    Events.emit("SetLocation", args[0])
  }
  observe() {
    Events.emit("Output", this.description.sight)
  }
  onEnter() {
    console.log("Enter location")
  }
  onExit() {
    console.log("Exit location")
  }
}