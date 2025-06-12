import settings from '../cf'
const mvpu = '§1[§4mvpu§1]'

register('chatComponentHovered', (component, event) => {
    let chatCompHover = settings().mvpuChatHoverMain
    const clickValue = component.getClickValue();
    if (!clickValue) return;
    const newText = new TextComponent(mvpu + ` §f${clickValue}`);
    if (chatCompHover === true) { component.setHoverValue(newText.getText());}
});
