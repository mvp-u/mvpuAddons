const File = Java.type("java.io.File");
const FileInputStream = Java.type("java.io.FileInputStream");
const ZipInputStream = Java.type("java.util.zip.ZipInputStream");
const InputStreamReader = Java.type("java.io.InputStreamReader");
const BufferedReader = Java.type("java.io.BufferedReader");
const Clipboard = Java.type("java.awt.datatransfer.StringSelection");
const Toolkit = Java.type("java.awt.Toolkit");
function readMcmodInfo(zipInputStream) {
    let entry;
    while ((entry = zipInputStream.getNextEntry()) !== null) {
        if (entry.getName() === "mcmod.info") {
            const reader = new BufferedReader(new InputStreamReader(zipInputStream));
            let line;
            let content = "";
            while ((line = reader.readLine()) !== null) {
                content += line + "\n";
            }
            return content;
        }
    }
    return null;
}

function parseModInfo(content) {
    try {
        const element = JSON.parse(content);
        const arr = Array.isArray(element) ? element : element.modList;
        if (!arr) return [];
        return arr.map(mod => `${mod.name} (${mod.modid})`);
    } catch (_) {
        return [];
    }
}
const mvpu = '§1[§4mvpu§1] ';
export function scanModsFolder() {
    const modsDir = new File("./mods/");
    if (!modsDir.exists() || !modsDir.isDirectory()) return "";
    const files = modsDir.listFiles();
    const output = [];
    for (let file of files) {
        if (file.isFile() && file.getName().endsWith(".jar")) {
            try {
                const fis = new FileInputStream(file);
                const zis = new ZipInputStream(fis);
                const mcmodInfo = readMcmodInfo(zis);
                fis.close();
                if (mcmodInfo) {
                    const entries = parseModInfo(mcmodInfo);
                    output.push(...entries);
                }
            }
            catch (_) { }
        }
    }
    return output.join("\n");
}

export function copyToClipboard(text) {
    const selection = new Clipboard(text);
    Toolkit.getDefaultToolkit().getSystemClipboard().setContents(selection, null);
    const cut = text.length > 20 ? text.slice(0, 20) + "..." : text;
    ChatLib.chat(mvpu + `&cCopied \"${cut}\" to clipboard.`)
}
