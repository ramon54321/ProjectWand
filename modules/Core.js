import Utils from '../Utils.js'
import { Events } from '../Events.js'
import State from '../State.js'

const Actions = {
  "bar.haveDrink"() {
    const beersDrunk = State.get("beersDrunk")
    State.set("beersDrunk", beersDrunk ? beersDrunk + 1 : 1)
    Events.emit("ConsumeAlcohol")
  }
}

export default {
  identifier: 'Core',
  async init() {
    Events.on("Answer", answer => {
      const currentLocation = State.get(`locations.${State.get('currentLocation')}`)
      const actionTag = `${currentLocation.tag}.${currentLocation.actions[answer]}`
      Actions[actionTag]()
      Events.emit("Output")
    })

    const world = await Utils.loadFile('world.json')
    world.locations.forEach(Utils.loadLocationIntoState)

    State.set("currentLocation", "bar")
  }
}