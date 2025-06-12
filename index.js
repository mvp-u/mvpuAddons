import './feature/minv'
import './feature/chathover'
import './feature/modlist'
import './feature/misc'
import './feature/lagdetector'
import './feature/api'
import './feature/dungeon'
import './feature/guichat'
import './HELP'
export const mvpu = '§1[§4mvpu§1] ';
import {goon} from './cf'
if (!FileLib.exists('dat/firstrun.json')) {
    ChatLib.chat(mvpu + `&6Thank you for using mvpu addons JOIN THE DISCORD NOW!! discord.gg/mvpu`)
    FileLib.write('mvpuAddons', 'dat/firstrun.json', '{"true":true}')
}

register('command', () => {
    goon.openGui();
}).setName('mvpu')

register('command', () => {
    ChatLib.chat(mvpu + '&6discord.gg/mvpu')
}).setName('mvpudiscord')