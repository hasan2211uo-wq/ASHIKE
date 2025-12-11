const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports.config = {
    name: "download",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MOHAMMAD AKASH",
    description: "Download media (images, video, audio, documents, gifs) from a direct link",
    commandCategory: "MEDIA",
    usages: "{pn} <direct-link>",
    cooldowns: 5,
    envConfig: {
        autoUnsend: false,
        delayUnsend: 0
    }
};

// Optional: কিছু সুন্দর Images দিয়ে বটের আউটপুট আরও প্রিমিয়াম দেখাতে পারো
const downloadImages = [
    "https://i.imgur.com/sxSn1K3.jpeg",
    "https://i.imgur.com/8WvpgUL.jpeg"
];

function getRandomImage() {
    return downloadImages[Math.floor(Math.random() * downloadImages.length)];
}

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID } = event;
    const url = args[0];

    if (!url) {
        return api.sendMessage(`⚠️ Please provide a media link!\n\nExample:\n/download https://example.com/image.jpg`, threadID, messageID);
    }

    const supported = [
        ".jpeg", ".jpg", ".png",
        ".mp4", ".mp3", ".gif",
        ".wav", ".pdf", ".docx",
        ".txt", ".raw"
    ];

    const fileExt = path.extname(url).toLowerCase();
    if (!supported.includes(fileExt)) {
        return api.sendMessage(`❌ Unsupported file format!\nSupported: ${supported.join(", ")}`, threadID, messageID);
    }

    const tempFile = path.join(__dirname, "cache", `downloaded${fileExt}`);

    try {
        api.sendMessage("⏳ Downloading your media, please wait...", threadID, messageID);

        const res = await axios.get(url, { responseType: "arraybuffer" });
        fs.writeFileSync(tempFile, Buffer.from(res.data));

        const attachment = fs.createReadStream(tempFile);
        api.sendMessage({ body: "✅ Download Complete!", attachment, mentions: [] }, threadID, () => fs.unlinkSync(tempFile), messageID);

    } catch (err) {
        console.error(err);
        api.sendMessage("❌ Error downloading the file! Make sure the link is direct and valid.", threadID, messageID);
    }
};
