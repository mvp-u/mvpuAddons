import settings from '../cf'
import { checkCata } from './api'
register('chat', (event) =>{
    if (settings().lfINV === true) {    
        checkCata(event)
    }
}).setCriteria(/^(?:\w+(?:-\w+)?\s>\s)?(?:\[[^\]]+\]\s)?(?:\S+\s)?(?:\[[^\]]+\]\s)?([A-Za-z0-9_.-]+)(?:\s[^\s\[\]:]+)?(?:\s\[[^\]]+\])?:\s(?:[A-Za-z0-9_.-]+(?:\s[^\s\[\]:]+)?(?:\s\[[^\]]+\])?\s?(?:[»>]|:)\s)?lf inv$/i)
// credit kiwidotzip for the regex