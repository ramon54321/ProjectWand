import { Events } from '../Events.js'
import State from '../State.js'

export default {
  identifier: 'Health',
  async init() {
    Events.on("ConsumeAlcohol", () => {
      if (State.get("beersDrunk") >= 6) {
        Events.emit("PlayerGettingTipsy", State.get("beersDrunk"))
      }
    })
    
    Events.on("ConsumeAlcohol", () => {
      if (State.get("health") < 100) {
        const difference = 100 - State.get("health")
        State.set("health", State.get("health") + (difference < 15 ? difference : 15))
      }
    })
    
    Events.on("PlayerGettingTipsy", count => {
      console.log("You probably should not drink any more... You have already had " + count + " beers!")
    })
  }
}