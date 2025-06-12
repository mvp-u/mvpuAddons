import settings from '../cf';

const mvpu = '§1[§4mvpu§1]';
const ITEM_BASE_SIZE = 16;  
let ITEM_RENDER_SIZE = ITEM_BASE_SIZE * 1
let notifiedFull = false; 


const ITEM_BOX_BORDER_COLOR = 0xAA888888; 
const ITEM_BOX_THICKNESS = 1; const pad    = 4; 
const titleH = 12; 
const cols   = 9; 
const maxRows= 3;
function parseRGBA(input) {
    const parts = String(input).split(',').map(Number);
    if (parts.length !== 4 || parts.some(n => isNaN(n))) {
      throw new Error("Invalid RGBA string");
    }
    return parts;
  }
function rgbaToInt(r, g, b, a = 255) {
    return (a << 24) | (r << 16) | (g << 8) | b;
  }
let scale = 1;
let slot, mainW, mainH, hotH, armorW, bgW, bgH;
function recalcSizes() {
    scale = settings().mINVScale;
    ITEM_RENDER_SIZE = ITEM_BASE_SIZE * scale
    slot   = 16 * scale;
    mainW  = cols * slot;
    mainH  = maxRows * slot;
    hotH   = slot;
    armorW = 4 * slot;
    bgW    = mainW + pad + armorW;
    bgH    = titleH + pad + mainH + pad + hotH;
}


function drawtheitem(item, drawX, drawY, itemScale, renderSize, boxBorderColor, boxThickness) {
    if (!item) return;
    const x1 = drawX; const y1 = drawY; const x2 = drawX + renderSize; const y2 = drawY + renderSize;
    Renderer.drawLine(boxBorderColor, x1, y1, x2, y1, boxThickness);  Renderer.drawLine(boxBorderColor, x1, y2, x2, y2, boxThickness);  Renderer.drawLine(boxBorderColor, x1, y1, x1, y2, boxThickness);  Renderer.drawLine(boxBorderColor, x2, y1, x2, y2, boxThickness);
    item.draw(drawX, drawY, itemScale);
    const count = item.getStackSize();
    if (count > 1) {
        const countStr = count.toString();
        const strWidth = Renderer.getStringWidth(countStr);
        Renderer.drawString(
            countStr,
            (drawX + renderSize - strWidth - (boxThickness * scale) + 2.5)*scale, 
            (drawY + renderSize - 9 - (boxThickness * scale) + 2.5)*scale,     
            true
        );
    }
}
let debug = false;
register('command', () => {debug = !debug;ChatLib.chat(mvpu + `Debug: ${debug}`)}).setName('mvpudebug')
const minv = register("renderOverlay", () => {
    if (!settings().mINVMainToggle) return;
    const inv = Player.getInventory();
    if (!inv) return; 
    recalcSizes();
    const x = settings().mINVxPos;
    const y = settings().mINVyPos;
    const scale = settings().mINVScale;
    const timeEnabled = settings().mINVtime
    const items = inv.getItems();
    if (!items || items.length < 40) return;
    const hotbar = items.slice(0, 9);
    const main   = items.slice(9, 36);
    const isFull = items.slice(0, 36).every(item => item !== null && item.getID() !== 0);
    const armor = [items[39], items[38], items[37], items[36]];
    const [sr,sg,sb,sa] = parseRGBA(settings().mINVSelectedColor);
    const selectColor = rgbaToInt(sr,sg,sb,sa)
    const [br,bg,bb,ba] = parseRGBA(settings().minvBG);
    const bgCol = rgbaToInt(br,bg,bb,ba)
    const [bor,bog,bob,boa] = parseRGBA(settings().minvBorder);
    const bordCol = rgbaToInt(bor,bog,bob,boa)
    const thick = 1;  
    if (debug === true) ChatLib.chat(`BorderColor: ${settings().minvBorder}\nBGColor: ${settings().minvBG}`);
    

  
    Renderer.drawRect(bgCol, x, y, bgW, bgH);
    Renderer.drawRect(bordCol, x, y, bgW, thick); 
    Renderer.drawRect(bordCol, x, y + bgH - thick, bgW, thick); 
    Renderer.drawRect(bordCol, x, y, thick, bgH); 
    Renderer.drawRect(bordCol, x + bgW - thick, y, thick, bgH); 
    Renderer.drawString("mINV", x + pad + (scale > 1 ? 5 * scale : 10), y + pad, true); 

    if (timeEnabled  === true) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const time24h = `${hours}:${minutes}`;
        Renderer.drawString(time24h, x + bgW - Renderer.getStringWidth(time24h) - pad - (scale > 1 ? 2 * scale : 5), y + pad, true);
    }
    if (isFull && !notifiedFull) {
        const component = new TextComponent(mvpu + " &cYour Inventory is full! Click this message for /trades.");
        component.setClick("run_command", "/trades").setHover("show_text", "&7Click to run /trades!");
        component.chat();
        World.playSound("random.anvil_break", 1.0, 0.5);
        notifiedFull = true;
    } else if (!isFull) {
        notifiedFull = false;
    }
    const hotbarY = y + titleH + pad + mainH + pad;
    hotbar.forEach((item, i) => {
        const sx = x + pad + i * slot;
        const sy = hotbarY - pad;

        if (i === Player.getHeldItemIndex()) {
            Renderer.drawRect(
                selectColor,
                sx - ITEM_BOX_THICKNESS,
                sy - ITEM_BOX_THICKNESS,
                ITEM_RENDER_SIZE + (ITEM_BOX_THICKNESS * 2),
                ITEM_RENDER_SIZE + (ITEM_BOX_THICKNESS * 2)
            );
        }
        drawtheitem(item, sx, sy, scale, ITEM_RENDER_SIZE, ITEM_BOX_BORDER_COLOR, ITEM_BOX_THICKNESS);
    });
    main.forEach((item, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        if (row >= maxRows) return; 

        const sx = x + pad + col * slot;
        const sy = y + titleH + pad + row * slot;
        drawtheitem(item, sx, sy, scale, ITEM_RENDER_SIZE, ITEM_BOX_BORDER_COLOR, ITEM_BOX_THICKNESS);
    });

    const armorX = x + pad + mainW + pad + (scale > 1 ? 5 * scale : 10);
    armor.forEach((item, i) => {
        const sx = armorX;
        const sy = y + titleH + pad + i * slot;
        drawtheitem(item, sx, sy, scale, ITEM_RENDER_SIZE, ITEM_BOX_BORDER_COLOR, ITEM_BOX_THICKNESS);
    });
});

