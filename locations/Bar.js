import Location from '../Location.js'

export default class Bar extends Location {
  name = 'Glorod\'s Mystic Bar'
  onEnter() {
    this.on("drink", () => {
      console.log("Goin for a drink")
      Events.emit("Drink")
    })
  }
}