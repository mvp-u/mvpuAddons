import settings from '../cf'
register('dropItem', (item, player, event) => {
    if (settings().dropItemNoti)
    ChatLib.chat(`§1[§4mvpu§1]&c You dropped ${item.getName()}`)
})
register("actionBar", () => {
    if (settings().manaAlert) {
    ChatLib.chat(`§1[§4mvpu§1]&c Not enough mana.`)
    enoughMana = false
    if (!enoughMana) Client.scheduleTask(100, () => enoughMana = true)
    }
}).setCriteria("NOT ENOUGH MANA").setContains()