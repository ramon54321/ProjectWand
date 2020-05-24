
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

const addDrinkHealthListener = Events.on("Drink", () => console.log("Adding Health"))
const addDrinkHeadacheListener = Events.on("Drink", () => console.log("Getting Headache"))

console.log(Events.get("Drink"))
console.log(Events.remove("Drink", addDrinkHeadacheListener))
console.log(Events.get("Drink"))

Events.on("Drink", () => {
  const beersDrunk = State.get("beersDrunk")
  State.set("beersDrunk", beersDrunk ? beersDrunk + 1 : 1)
})

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

Events.on("StatePathSet", (path, value) => {
  console.log(`State change detected:\n\t${path}: ${value}`)
})

Events.emit("Drink")
Events.emit("Drink")
Events.emit("Drink")
Events.emit("Drink")
Events.emit("Drink")
Events.emit("Drink")
Events.emit("Drink")
Events.emit("Drink")

console.log(State._state)
console.log(Events.getRegisteredEventNames())
