import Events from './Events.js'
import State from './State.js'
import Game from './Game.js'
import Utils from './Utils.js'

const mainModule = {
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

const healthModule = {
  async init() {
    console.log('Health module init')

    Events.on("Drink", () => {
      if (State.get("beersDrunk") >= 6) {
        Events.emit("PlayerGettingTipsy", State.get("beersDrunk"))
      }
    })
    
    Events.on("Drink", () => {
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

const rendererModule = {
  async init() {
    console.log('Renderer module init')

    Events.on("Render", () => {
      console.log("This is the current state: " + JSON.stringify(State._state))
    })
  }
}

const debugModule = {
  async init() {
    console.log('Debug module init')

    Events.on("StatePathSet", (path, value) => {
      console.log(`State change detected:\n\t${path}: ${value}`)
    })

    Events.on("Debug", () => {
      console.log(State._state)
      console.log(Events.getRegisteredEventNames())
    })
  }
}

const main = async () => {
  Game.addModule(mainModule)
  Game.addModule(healthModule)
  Game.addModule(rendererModule)
  Game.addModule(debugModule)
  await Game.init()

  // Gameplay Simulation

  Events.emit("Drink")
  Events.emit("Drink")
  Events.emit("Drink")
  Events.emit("Drink")
  Events.emit("Drink")
  Events.emit("Drink")
  Events.emit("Drink")
  Events.emit("Drink")

  Events.emit("Render")

  Events.emit("Debug")
}
main()
