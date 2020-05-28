import Location from '../Location.js'
import Events from '../../../Events.js'

export default class Bar extends Location {
  tag = 'Bar'
  aliases = ['bar', 'pub']
  name = 'Glorod\'s Mystic Bar'
  description = {
    sight: 'A rustic old bar, there are paintings on the dark oak walls, seemingly all of a man... a man with a beard and a chiseled jaw... there seems to be a door leading to a back room...',
    smell: 'Oaky and that of alcohol...',
    hearing: 'Glasses clanking and a bar man... just... speaking into thin air... as though days roll by slow'
  }
  connections = ['BackRoom']
  drink() {
    Events.emit("Output", "Goin for a drink")
    Events.emit("Drink")
  }
}