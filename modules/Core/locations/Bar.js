import Location from '../Location.js'
import Events from '../../../Events.js'
import Utils from '../../../Utils.js'

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
  actionSet = {
    id: 'Bar',
    drink: () => {
      Events.emit("Output", "Goin for a drink")
      Events.emit("Drink")
    },
    observe: () => {
      Location.actionSet.observe()
      this.actionSet['inspect painting'] = () => {
        Events.emit("Output", "You take a deep and keen look at the painting on the wall...")
        Events.emit("Output", "It seems to have something behind it... perhaps it can be taken off the wall")
      }
    }
  }
  onEnter() {
    const output = [
      'You enter the bar... it\'s an interesting place... you should probably <observe> your surroundings...'
    ]
    Events.emit("Output", Utils.getFromOptions(output))
  }
  onExit() {
    Events.emit("Output", "You leave the alure of the bar behind...")
  }
}