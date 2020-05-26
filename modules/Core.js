import Utils from '../Utils.js'
import Events from '../Events.js'
import State from '../State.js'

export default {
  async init() {
    console.log('Main module init')

    Events.on("Drink", () => {
      const beersDrunk = State.get("beersDrunk")
      State.set("beersDrunk", beersDrunk ? beersDrunk + 1 : 1)
    })

    const world = await Utils.loadFile('world.json')
    world.locations.forEach(Utils.loadLocationIntoState)

    State.set("currentLocation", "bar")
  }
}