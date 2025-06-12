import config from './cf'
export const qwertyuiop = (x0, y0, z0, x1, y1, z1, r, g, b, a, lineWidth=2, phase=true) => {Tessellator.pushMatrix()
    GL11.glLineWidth(lineWidth);
    Tessellator.begin(3);
    Tessellator.depthMask(false);
    Tessellator.disableTexture2D();
    Tessellator.enableBlend()
    if (phase) Tessellator.disableDepth()
    Tessellator.colorize(r, g, b, a)
    Tessellator.pos(x0, y0, z0).tex(0, 0)
    Tessellator.pos(x0, y0, z1).tex(0, 0)
    Tessellator.pos(x0, y1, z1).tex(0, 0)
    Tessellator.pos(x1, y1, z1).tex(0, 0)
    Tessellator.pos(x1, y1, z0).tex(0, 0)
    Tessellator.pos(x0, y1, z0).tex(0, 0)
    Tessellator.pos(x0, y0, z0).tex(0, 0)
    Tessellator.pos(x1, y0, z0).tex(0, 0)
    Tessellator.pos(x1, y0, z1).tex(0, 0)
    Tessellator.pos(x0, y0, z1).tex(0, 0)
    Tessellator.pos(x0, y1, z1).tex(0, 0)
    Tessellator.pos(x0, y1, z0).tex(0, 0)
    Tessellator.pos(x1, y1, z0).tex(0, 0)
    Tessellator.pos(x1, y0, z0).tex(0, 0)
    Tessellator.pos(x1, y0, z1).tex(0, 0)
    Tessellator.pos(x1, y1, z1).tex(0, 0)
    Tessellator.draw()
    if (phase) Tessellator.enableDepth()
    Tessellator.enableTexture2D()
    Tessellator.disableBlend()
    Tessellator.depthMask(true)
    Tessellator.popMatrix()
}

export function Box(x, y, z, w, h, r, g, b, a, lineWidth=2, phase=true) {
    qwertyuiop(x-w/2, y, z-w/2, x+w/2, y+h, z+w/2, r, g, b, a, lineWidth, phase)
}

export function DEBUG(msg) { 
    if (config().mvpuDebug) { 
        ChatLib.chat(`§1[§4mvpu§1] &c${msg}`)
    }
}

register('command', (x,y,z,w,h,r,g,b,a) => {
    Box(x,y,z,w,h,r,g,b,a)
}).setName('mvpuboxcommand')
const cataXPDict =  {
    1:   50,
    2:  125,
    3:  235,
    4:  395,
    5:  625,
    6:  955,
    7: 1425,
    8: 2095,
    9: 3045,
   10: 4385,
   11: 6275,
   12: 8940,
   13:12700,
   14:17960,
   15:25340,
   16:35640,
   17:50040,
   18:70040,
   19:97640,
   20:135640,
   21:188140,
   22:259640,
   23:356640,
   24:488640,
   25:668640,
   26:911640,
   27:1239640,
   28:1684640,
   29:2284640,
   30:3084640,
   31:4149640,
   32:5559640,
   33:7459640,
   34:9959640,
   35:13259640,
   36:17559640,
   37:23159640,
   38:30359640,
   39:39559640,
   40:51559640,
   41:66559640,
   42:85559640,
   43:109559640,
   44:139559640,
   45:177559640,
   46:225559640,
   47:285559640,
   48:360559640,
   49:453559640,
   50:569809640
  };

export function getLevel(xp) {
    const levels = Object.keys(cataXPDict)
      .map(Number)
      .sort((a, b) => a - b);
    const maxLevel = levels[levels.length - 1];
    let lvl = levels.reduce((acc, cur) => (xp >= cataXPDict[cur] ? cur : acc), 0);
    if (lvl === 0) return `0.00`;
    if (lvl >= maxLevel) return `${maxLevel}.00`;
    const curXp = cataXPDict[lvl];
    const nextXp = cataXPDict[lvl + 1];
    const frac = (xp - curXp) / (nextXp - curXp);
    return (lvl + frac).toFixed(2);
  }
  
export function formatTime(ms) {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
}
  