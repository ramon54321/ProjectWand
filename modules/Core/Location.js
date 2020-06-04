import Events from '../../Events.js'
import State from '../../State.js'
import Utils from '../../Utils.js'
import Core from './Core.js'

export default class Location {
  static actionSet = {
    id: 'LocationBase',
    jump: () => {
      Events.emit("Output", "Jumping")
    },
    goto: (args) => {
      const destination = args[0]
      const currentLocation = Core.moduleUtils.getLocationFromTag(State.get("currentLocationTag"))
      const location = currentLocation.connections.map(connection => State.get(`${Core.identifier}.locations.${connection}`))
                                    .find(location => location.aliases.includes(destination))
      if (!location) {
        Events.emit("Output", `Can not get to ${destination} from here... perhaps there is another way there...`)
        return
      }
      Events.emit("Output", `Going to ${destination}`)
      Events.emit("SetLocation", location.tag)
    },
    observe: () => {
      const currentLocation = Core.moduleUtils.getLocationFromTag(State.get("currentLocationTag"))
      Events.emit("Output", Utils.getFromOptions(currentLocation.description.sight))
    },
    listen: () => {
      const currentLocation = Core.moduleUtils.getLocationFromTag(State.get("currentLocationTag"))
      Events.emit("Output", Utils.getFromOptions(currentLocation.description.hearing))
    },
    sniff: () => {
      const currentLocation = Core.moduleUtils.getLocationFromTag(State.get("currentLocationTag"))
      Events.emit("Output", Utils.getFromOptions(currentLocation.description.smell))
    },
    analyze: () => {
      Events.emit("Action", "observe")
      Events.emit("Action", "listen")
      Events.emit("Action", "sniff")
    }
  }

  onEnter() {
    
  }
  onExit() {
    
  }
}