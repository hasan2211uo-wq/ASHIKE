module.exports = {
    config: {
        name: "mou",
        version: "1.0.2",
        permission: 2,  // admin only (role 2 এর মতো)
        credits: "MOHAMMAD AKASH (updated by Grok)",
        description: "Random 18+ hot video send",
        category: "18+",
        usages: "",
        cooldown: 5,
        prefix: false  // false মানে যেকোনো মেসেজে ট্রিগার হবে
    },

    run: async function ({ api, event }) {
        const axios = global.nodemodule["axios"];
        const fs = global.nodemodule["fs-extra"];

        const videos = [
            "https://files.catbox.moe/qc2fyv.mp4",
            "https://files.catbox.moe/6ep6xv.mp4",
            "https://files.catbox.moe/7t22sz.mp4",
            "https://files.catbox.moe/x0p41v.mp4",
            "https://files.catbox.moe/f01kns.mp4",
            "https://files.catbox.moe/vz0jlm.mp4",
            "https://files.catbox.moe/4895c8.mp4",
            "https://files.catbox.moe/5o27zb.mp4",
            "https://files.catbox.moe/7kxfbm.mp4",
            "https://files.catbox.moe/cz7y07.mp4",
            "https://files.catbox.moe/46a4wn.mp4",
            "https://files.catbox.moe/43y1x3.mp4",
            "https://files.catbox.moe/9bpfy4.mp4",
            "https://files.catbox.moe/e21w0w.mp4",
            "https://files.catbox.moe/6g1xtz.mp4",
            "https://files.catbox.moe/vk5bzj.mp4",
            "https://files.catbox.moe/49f44f.mp4",
            "https://files.catbox.moe/pvu0l6.mp4",
            "https://files.catbox.moe/v8sdwh.mp4",
            "https://files.catbox.moe/h2i70o.mp4",
            "https://files.catbox.moe/l606y1.mp4",
            "https://files.catbox.moe/2269pw.mp4",
            "https://files.catbox.moe/noupty.mp4",
            "https://files.catbox.moe/o5489m.mp4",
            "https://files.catbox.moe/no27n2.mp4",
            "https://files.catbox.moe/0ousw0.mp4"
        ];

        const randomLink = videos[Math.floor(Math.random() * videos.length)];
        const path = __dirname + "/cache/mou.mp4";

        try {
            const response = await axios({
                url: randomLink,
                method: "GET",
                responseType: "stream"
            });

            const writer = fs.createWriteStream(path);
            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on("finish", () => {
                    api.sendMessage(
                        {
                            body: "__(-𝐍𝐞𝐞𝐃 𝐀 বেস্টি/💚😻",
                            attachment: fs.createReadStream(path)
                        },
                        event.threadID,
                        () => fs.unlinkSync(path),
                        event.messageID
                    );
                    resolve();
                });

                writer.on("error", (err) => {
                    api.sendMessage("❌ ভিডিও ডাউনলোডে সমস্যা হয়েছে!", event.threadID);
                    reject(err);
                });
            });

        } catch (error) {
            api.sendMessage("❌ ভিডিও লোড করা যায়নি!", event.threadID);
            console.error(error);
        }
    }
};
