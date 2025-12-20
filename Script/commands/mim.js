const fs = require("fs-extra");
const axios = require("axios");

module.exports.config = {
  name: "mim",
  version: "2.0",
  hasPermssion: 2,  // 0 = সবাই ব্যবহার করতে পারবে
  credits: "MOHAMMAD AKASH × Modified",
  description: "18+ Random Hot Video",
  commandCategory: "18+",
  usages: "mim",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const videos = [
    "https://files.catbox.moe/qp6uk2.mp4",
    "https://files.catbox.moe/nw7aw8.mp4",
    "https://files.catbox.moe/h2unee.mp4",
    "https://files.catbox.moe/nhvjfg.mp4",
    "https://files.catbox.moe/e1cezw.mp4",
    "https://files.catbox.moe/r09ry9.mp4",
    "https://files.catbox.moe/9nehr5.mp4",
    "https://files.catbox.moe/j3tcbj.mp4",
    "https://files.catbox.moe/6r1tgb.mp4",
    "https://files.catbox.moe/5u8xp1.mp4",
    "https://files.catbox.moe/65h0j8.mp4",
    "https://files.catbox.moe/knlrxy.mp4",
    "https://files.catbox.moe/ltcpgk.mp4",
    "https://files.catbox.moe/x76x1u.mp4",
    "https://files.catbox.moe/y57ocv.mp4",
    "https://files.catbox.moe/3v5zc4.mp4",
    "https://files.catbox.moe/0ls25p.mp4",
    "https://files.catbox.moe/r8jhva.mp4",
    "https://files.catbox.moe/qd76xj.mp4",
    "https://files.catbox.moe/ahe7o0.mp4",
    "https://files.catbox.moe/lwbvyp.mp4",
    "https://files.catbox.moe/1cbr7w.mp4",
    "https://files.catbox.moe/h400f7.mp4",
    "https://files.catbox.moe/nz6gmi.mp4",
    "https://files.catbox.moe/qsghg2.mp4",
    "https://files.catbox.moe/ah0a9p.mp4",
    "https://files.catbox.moe/vedczn.mp4",
    "https://files.catbox.moe/oke0n5.mp4",
    "https://files.catbox.moe/aofe6s.mp4",
    "https://files.catbox.moe/7cyjzv.mp4",
    "https://files.catbox.moe/gfcfn6.mp4",
    "https://files.catbox.moe/ss5640.mp4",
    "https://files.catbox.moe/t612z5.mp4",
    "https://files.catbox.moe/6xo549.mp4",
    "https://files.catbox.moe/5kbg2f.mp4",
    "https://files.catbox.moe/0cs06c.mp4",
    "https://files.catbox.moe/y76exy.mp4",
    "https://files.catbox.moe/clxo8m.mp4",
    "https://files.catbox.moe/9hmtkp.mp4",
    "https://files.catbox.moe/hboa7n.mp4"
  ];

  const randomLink = videos[Math.floor(Math.random() * videos.length)];
  const path = __dirname + "/cache/mim.mp4";

  try {
    api.sendMessage("🔥 ভিডিও লোড হচ্ছে, একটু অপেক্ষা করো... 🥵", event.threadID, event.messageID);

    const response = await axios({
      url: randomLink,
      method: "GET",
      responseType: "stream"
    });

    const writer = fs.createWriteStream(path);
    response.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage(
        {
          body: "🥵 এই নে তোর জন্য স্পেশাল 🔥🍑",
          attachment: fs.createReadStream(path)
        },
        event.threadID,
        () => fs.unlinkSync(path),
        event.messageID
      );
    });

    writer.on("error", (err) => {
      api.sendMessage("❌ ভিডিও ডাউনলোড করতে সমস্যা হয়েছে!", event.threadID);
      console.error(err);
    });

  } catch (error) {
    api.sendMessage("❌ Error হয়েছে, আবার চেষ্টা করো!", event.threadID);
    console.error(error);
  }
};
