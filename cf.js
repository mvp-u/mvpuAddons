
import { scanModsFolder, copyToClipboard } from './feature/modlist'
import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"
const mvpu = '§1[§4mvpu§1] ';
const modList = scanModsFolder();
const mCon = new DefaultConfig('mvpuAddons', 'dat/set.json')
mCon
    .addSwitch({
        configName: "mINVMainToggle",
        title: "mINV Main Toggle",
        subcategory: "Main",
        description: "toggle mINV",
        category: "mINV"
        }
    )
    .addSwitch({
        configName: "mINVtime",
        title: "mINV 24h Clock",
        subcategory: "Main",
        description: "toggle the time showing by the inventory",
        category: "mINV"
        }
    )
    .addSlider({
        configName: "mINVxPos",
        title: "X",
        description: "X position of mINV",
        category: "mINV",
        subcategory: "Position",
        options: [0, 750]
    })
    .addSlider({
        configName: "mINVyPos",
        title: "Y",
        description: "Y position of mINV",
        category: "mINV",
        subcategory: "Position",
        options: [0 , 1080]
    })
    .addSlider({
        configName: "mINVScale",
        title: "Scale",
        description: "Scale of mINV",
        category: "mINV",
        subcategory: "Position",
        options: [0.1, 5]
    })
    .addColorPicker({
        configName: "minvBG",
        title: "mINV BG Color",
        description: "Background Color of mINV",
        category: "mINV",
        subcategory: "Colors",
    })
    .addColorPicker({
        configName: "mINVSelectedColor",
        title: "mINV Selected Item Color",
        description: "Color of your selected item",
        category: "mINV",
        subcategory: "Colors",
    })
    .addColorPicker({
        configName: "minvBorder",
        title: "mINV Border Color",
        description: "Border Color of mINV",
        category: "mINV",
        subcategory: "Colors",
    })
    // .addSwitch({
    //     configName: "sendDeathMessage",
    //     title: "Message when death",
    //     subcategory: "Death Message",
    //     description: "sends a p chat msg when someone dies",
    //     category: "Dungeons"
    //     }
    // )
    // .addTextInput({
    //     configName: "onDeathMessage",
    //     title: "On death message",
    //     subcategory: "Death Message",
    //     description: "message when someone dies, %un% for username",
    //     category: "Dungeons",
    //     value: "not ideal"
    //     }
    // )
    .addSwitch({
        configName: "lfINV",
        title: "LF INV?",
        description: "Shows a players stats when they message you LF INV",
        category: "Dungeons"
    })
    .addSwitch({
        configName: "mvpuChatHoverMain",
        title: "Chat Hover",
        subcategory: "Main",
        description: "Shows the command chat components run when clicked",
        category: "ChatHover"
        }
    )
    .addSwitch({
        configName: "guiChatEnabled",
        title: "Gui Chat",
        description: "Allows you to chat while in GUIs",
        category: "GuiChat"
    })
    .addSlider({
        configName: "guiChatOffsetX",
        title: "GuiChat X Offset",
        description: "Offset of GuiChat from corner of screen (X)",
        category: "GuiChat",
        value: 10,
        options: [0,50]
    })
    .addSlider({
        configName: "guiChatOffsetY",
        title: "GuiChat Y Offset",
        description: "Offset of GuiChat from corner of screen (Y)",
        category: "GuiChat",
        value: 10,
        options: [0,50]
    })
    .addSlider({
        configName: "guiChatWidth",
        title: "GuiChat Width",
        description: "Width of GuiChat (px)",
        category: "GuiChat",
        value: 300,
        options: [10,500]
    })
    .addSlider({
        configName: "guiChatHeight",
        title: "GuiChat Height",
        description: "Height of GuiChat (px)",
        category: "GuiChat",
        value: 20,
        options: [10,100]
    })
    .addButton({
        category:"Mods Folder",
        subcategory: 'Main',
        title: "Copy",
        onClick() {
            copyToClipboard(modList)
        },
        configName: "mvpucopymodsfolderbutton",
        description:"Copies your mods folder to clipboard"
    })
    .addSwitch({
        configName: "dropItemNoti",
        title: "Drop Noti",
        subcategory: "Main",
        description: "Shows when you drop an item, and what you dropped",
        category: "Drop Notifications"
    })
    .addSwitch({
        configName: "packetlossDetector",
        title: "Lag Detector",
        subcategory: "Lag Detector",
        description: "shows in chat when lag",
        category: "Misc"
    })
    .addSwitch({
        configName: "manaAlert",
        title: "Mana Alert",
        subcategory: "Main",
        description: "Alerts you when no more mana",
        category: "Misc"
    })
    .addButton({
        category: "Discord",
        subcategory: 'Link',
        title: "Get Link",
        onClick() {
            copyToClipboard('discord.gg/mvpu')
        },
        configName: "fgro9h3r4ogherghoierg",
        description:"Copies the discord link to your clipboard"
    })
    .addSwitch({
        configName: "mvpuDebug",
        title: "debug",
        subcategory: "debug",
        description: "debug",
        category: "debug"
    })
    
const mSet = new Settings('mvpuAddons', mCon, 'dat/cs.json', 'mvpuAddons')
mSet.onOpenGui(() => {
    if (mSet.mvpuDebug) {
        ChatLib.chat(mvpu + `&c GUI Opened`)
    }
})
export default () => mSet.settings
export const goon = mSet
register('command', () => copyToClipboard(modList)).setName('modlist')