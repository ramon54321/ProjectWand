import Events from '../../Events.js'
import State from '../../State.js'

export default class Location {
  jump() {
    Events.emit("Output", "Jumping")
  }

  goto(args) {
    const destination = args[0]
    const location = this.connections.map(connection => State.get(`locations.${connection}`))
                                  .find(location => location.aliases.includes(destination))
    if (!location) {
      Events.emit("Output", `Can not get to ${destination} from here... perhaps there is another way there...`)
      return
    }
    Events.emit("Output", `Going to ${destination}`)
    Events.emit("SetLocation", location.tag)
  }
  move = this.goto
  walk = this.goto

  observe() {
    Events.emit("Output", this.description.sight)
  }
  look = this.observe
  see = this.observe
  stare = this.observe
  glance = this.observe

  listen() {
    Events.emit("Output", this.description.hearing)
  }
  hear = this.listen

  sniff() {
    Events.emit("Output", this.description.smell)
  }
  smell = this.sniff

  analyse() {
    this.observe
    this.listen
    this.sniff
  }

  onEnter() {
    
  }
  onExit() {
    
  }
}