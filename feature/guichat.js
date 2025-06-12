import settings from '../cf'
let textBox = null;
let isGuiOpen = false;

const TEXT_BOX_ID = 0; 
let X_OFFSET_PIXELS = settings().guiChatOffsetX
let Y_OFFSET_PIXELS = settings().guiChatOffsetY
let BOX_WIDTH_PIXELS = settings().guiChatWidth
let BOX_HEIGHT_PIXELS = settings().guiChatHeight
function sizes() {
    // it gets the sizes!
    X_OFFSET_PIXELS = settings().guiChatOffsetX;
    Y_OFFSET_PIXELS = settings().guiChatOffsetY;
    BOX_WIDTH_PIXELS = settings().guiChatWidth;
    BOX_HEIGHT_PIXELS = settings().guiChatHeight;

}
register("guiOpened", () => {
    sizes()
    if (settings().guiChatEnabled) {
    isGuiOpen = true;
    const screenWidth = Renderer.screen.getWidth();
    const screenHeight = Renderer.screen.getHeight();
    const x = X_OFFSET_PIXELS;
    const y = screenHeight - Y_OFFSET_PIXELS - BOX_HEIGHT_PIXELS;
    textBox = new net.minecraft.client.gui.GuiTextField(TEXT_BOX_ID, Client.getMinecraft().field_71466_p, x, y, BOX_WIDTH_PIXELS, BOX_HEIGHT_PIXELS);
    textBox.func_146180_a("");
    textBox.func_146195_b(false);
}});

register("guiClosed", () => {
    if (settings().guiChatEnabled) {
    isGuiOpen = false;
    textBox = null;
    }
});
register("renderOverlay", () => {
    if (settings().guiChatEnabled) {
    if (isGuiOpen && textBox !== null) {
        textBox.func_146194_f(); 
    }
}});

register("guiKey", (char, keyCode, gui, event) => {
    if (settings().guiChatEnabled) {
    if (isGuiOpen && textBox !== null) {
        textBox.func_146201_a(char, keyCode);
        if (keyCode === Keyboard.KEY_E) {
            if (textBox.func_146206_l()) {
                event.setCanceled(true);
            }
        }
        if (keyCode === Keyboard.KEY_RETURN) { 
            if (textBox.func_146206_l()) { 
                const inputText = textBox.func_146179_b(); x
                if (inputText.length > 0) {
                    ChatLib.say(inputText); 
                    textBox.func_146180_a(""); 
                }
                textBox.func_146195_b(false);
            } else {
                textBox.func_146195_b(true); 
            }
        }
    }
}});

register("guiMouseClick", (mouseX, mouseY, mouseButton, gui) => {
    if (settings().guiChatEnabled) {
    if (isGuiOpen && textBox !== null) {
        textBox.func_146192_a(mouseX, mouseY, mouseButton);
    }
}});