module.exports.config = {
  name: "sexy",
  version: "2.0.0",
  hasPermssion: 2,
  credits: "MOHAMMAD AKASH",
  description: "Random hardcore video 😈",
  commandCategory: "18+",
  usages: "sexy",
  cooldowns: 3
};

module.exports.run = async ({ api, event }) => {
  const axios = require("axios");
  const fs = require("fs-extra");
  const { threadID, messageID } = event;

  const videos = [
    "https://files.catbox.moe/51zmkl.mp4",
    "https://files.catbox.moe/9u0w4q.mp4",
    "https://files.catbox.moe/amp199.mp4",
    "https://files.catbox.moe/uz1e0i.mp4",
    "https://files.catbox.moe/k6qnu0.mp4",
    "https://files.catbox.moe/xvatrl.mp4",
    "https://files.catbox.moe/n97gxb.mp4",
    "https://files.catbox.moe/801hbm.mp4",
    "https://files.catbox.moe/7dhy2j.mp4",
    "https://files.catbox.moe/kbp9vk.mp4",
    "https://files.catbox.moe/ggv0ns.mp4",
    "https://files.catbox.moe/tcvf4s.mp4",
    "https://files.catbox.moe/18fghb.mp4",
    "https://files.catbox.moe/sn3yyi.mp4",
    "https://files.catbox.moe/3kbn3c.mp4",
    "https://files.catbox.moe/wb3cyy.mp4",
    "https://files.catbox.moe/rchruk.mp4",
    "https://files.catbox.moe/5dtorv.mp4",
    "https://files.catbox.moe/nz4mbp.mp4",
    "https://files.catbox.moe/ulodhq.mp4",
    "https://files.catbox.moe/7kgeiw.mp4",
    "https://files.catbox.moe/w79eym.mp4",
    "https://files.catbox.moe/lfxa4l.mp4",
    "https://files.catbox.moe/omn3ux.mp4",
    "https://files.catbox.moe/6r3r5i.mp4",
    "https://files.catbox.moe/1ltwnu.mp4",
    "https://files.catbox.moe/iz959z.mp4"
  ];

  const videoUrl = videos[Math.floor(Math.random() * videos.length)];
  const path = __dirname + "/cache/sexy_video.mp4"; // ফাইলের নাম চেঞ্জ করা হয়েছে

  try {
    api.sendMessage("😇.ওয়েট ভালোবাসা দিচ্ছে মেহেদী হাসান", threadID, messageID);

    const response = await axios({
      url: videoUrl,
      method: "GET",
      responseType: "stream"
    });

    const writer = fs.createWriteStream(path);
    response.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage({
        body: " 🍒.এই নাও তোমার জন্য ভালোবাসা.🍒 ┏━━━━━━━✦❘༻༺❘✦━━━━━━━┓       ✾:-𝐌𝐞𝐡𝐞𝐝𝐢✥𝐒𝐩𝐞𝐜𝐢𝐚𝐥-:✾ ┗━━━━━━━✦❘༻༺❘✦━━━━━━━",
        attachment: fs.createReadStream(path)
      }, threadID, () => fs.unlinkSync(path), messageID);
    });

    writer.on("error", () => {
      api.sendMessage("❌ আবার চালা কুত্তার বাচ্চা, লোড হচ্ছে না 🤬", threadID, messageID);
    });

  } catch (err) {
    api.sendMessage("❌ গান্ডু কোথাকার, এরর হয়েছে! আবার চালা 🤬", threadID, messageID);
  }
};
