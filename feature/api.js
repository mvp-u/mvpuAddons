import { request } from '../../requestV2'
import { getLevel, formatTime } from '../HELP';
// request({
//     url: "https://addons.mvpu.cc/someEndpoint",
//     method: "POST|GET",
//     headers: {"User-agent":"Mozilla/5.0"},
//     body: {
//         something: true
//     }
// })
const mvpu = '§1[§4mvpu§1] ';

register('command', (username) => {
    
    ChatLib.chat(mvpu + `&cChecking CATA lvl for &6${username}...`)
    checkCata(username)
}).setName('md')
export function checkCata(username) {
    const req = request({
        url: `https://api.minetools.eu/uuid/${username}`, //mojang api was down while making ts
        method: 'GET'
    }).then(data => {
        const a = JSON.parse(data)
            const more = request({
                url: `https://addons.mvpu.cc/api/hypixel/v2/skyblock/profiles?uuid=${a.id}`,
                method: 'GET'
            }).then(data => {
                const a2 = JSON.parse(data)
                console.log(a2.profiles)
                a2.profiles.forEach(profile => {    
                    if (profile.selected === true) {
                        const cataXP = profile.members[a.id].dungeons.dungeon_types.catacombs.experience
                        const cataLVL = getLevel(cataXP)
                        const normal7 = profile.members[a.id]?.dungeons?.dungeon_types?.catacombs?.fastest_time?.['7'] ?? "None";
                        let F7PB = 'None';
                        if (normal7 != 'None') {F7PB = formatTime(normal7)}
                        const master7 = profile.members[a.id]?.dungeons?.dungeon_types?.master_catacombs?.fastest_time?.['7'] ?? "None";
                        let M7PB = 'None'
                        if (master7 != 'None') {M7PB = formatTime(master7)}
                        const MMComps = profile.members[a.id]?.dungeons?.dungeon_types?.master_catacombs?.tier_completions?.total ?? 0;

                        const NMComps = profile.members[a.id].dungeons.dungeon_types.catacombs.tier_completions.total
                        const TotalComps = MMComps + NMComps
                        
                        const Secrets = profile.members[a.id].dungeons.secrets
                        const SPR = Secrets / TotalComps
                        ChatLib.chat(mvpu + `&c${username}'s Cata LVL: &6${cataLVL}\n${mvpu}&cF7: &6${F7PB}\n${mvpu}&cM7: &6${M7PB}\n${mvpu}&cSecrets (spr): &6${Secrets} &6(&7${SPR.toFixed(2)}&6)`)
                    }
                    
                });
            })
        }
    )
}