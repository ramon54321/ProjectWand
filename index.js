import Events from './Events.js'
import State from './State.js'

// const gameWorld = {
//     bar: {
//       desription: 'There is a counter in the corner, with a strange looking man cleaning glasses...',
//       actions: [
//         {
//           label: 'Drink Beer',
//           action: () => Events.emit('Drink')
//         }
//       ]
//     }
//   }

class Game {
  static modules = []

  static addModule(module) {
    this.modules.push(module)
  }

  static init() {
    this.modules.forEach(module => module.init())
  }
}

const mainModule = {
  init() {
    console.log('Main module init')

    Events.on("Drink", () => {
      const beersDrunk = State.get("beersDrunk")
      State.set("beersDrunk", beersDrunk ? beersDrunk + 1 : 1)
    })

    State.set("currentRoom", "bar")
  }
}

const healthModule = {
  init() {
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
  init() {
    console.log('Renderer module init')

    Events.on("Render", (path, value) => {
      console.log("This is the current state: " + JSON.stringify(State._state))
    })
  }
}

const debugModule = {
  init() {
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

Game.addModule(mainModule)
Game.addModule(healthModule)
Game.addModule(rendererModule)
Game.addModule(debugModule)
Game.init()

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
