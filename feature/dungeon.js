import settings from '../cf'
import { DEBUG } from '../HELP'
import { checkCata } from './api'
import PartyV2 from '../../BloomCore/PartyV2'
import Skyblock from '../../BloomCore/Skyblock'
let already = new Array()
register('chat', (event) =>{
    const m = ChatLib.getChatMessage(event)
    const a = m.match(/^(?:\w+(?:-\w+)?\s>\s)?(?:\[[^\]]+\]\s)?(?:\S+\s)?(?:\[[^\]]+\]\s)?([A-Za-z0-9_.-]+)(?:\s[^\s\[\]:]+)?(?:\s\[[^\]]+\])?:\s(?:[A-Za-z0-9_.-]+(?:\s[^\s\[\]:]+)?(?:\s\[[^\]]+\])?\s?(?:[»>]|:)\s)?(.*)$/)
    let p;
    if (a) {p = a[1]}
    else {p = null}
    
    const x = Object.keys(PartyV2.members)
    const t = p in x
    if (t === false && Skyblock.inSkyblock && !p in already) {
        if (settings().lfINV === true) {
        DEBUG(`&cChecking Cata for ${p}`)
        checkCata(p)
        already.push(p)
        }
    }
})
// credit kiwidotzip for the regex
register('command', () =>{already = new Array()}).setName('mvpudebugclearalready')