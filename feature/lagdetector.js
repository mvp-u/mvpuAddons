import config from "../cf";
const S32PacketConfirmTransaction = Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction");
let lastTransaction = 0;
let notify = false;

register("packetReceived", () => {
    if (!config().packetlossDetector) return;
    if (notify) ChatLib.chat(`§1[§4mvpu§1]&c Packet Loss Detected! (lag) (${getTimePassed()}ms)`);
    lastTransaction = Date.now();
    notify = false;
}).setFilteredClass(S32PacketConfirmTransaction)

register("tick", () => {
    if (config().packetlossDetector && getTimePassed() >= 500) notify = true;
})

function getTimePassed() {
    return Date.now() - lastTransaction;
}