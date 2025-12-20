const fs = require("fs-extra");
const axios = require("axios");

module.exports.config = {
  name: "mehedi",
  version: "3.0",
  hasPermssion: 2,  // role 0 = সবাই ব্যবহার করতে পারবে
  credits: "MOHAMMAD AKASH × Modified by Mehedi",
  description: "18+ Random Hot Video",
  commandCategory: "18+",
  usages: "mehedi অথবা hot",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const videos = [
    "https://files.catbox.moe/2yr7tt.mp4",
    "https://files.catbox.moe/83ipdo.mp4",
    "https://files.catbox.moe/wo30ui.mp4",
    "https://files.catbox.moe/h9wg9k.mp4",
    "https://files.catbox.moe/m3gd3l.mp4",
    "https://files.catbox.moe/ke7v7i.mp4",
    "https://files.catbox.moe/d585sn.mp4",
    "https://files.catbox.moe/h7nevt.mp4",
    "https://files.catbox.moe/e5ovjo.mp4",
    "https://files.catbox.moe/c3dygo.mp4",
    "https://files.catbox.moe/21uywy.mp4",
    "https://files.catbox.moe/v6miwy.mp4",
    "https://files.catbox.moe/7fntxs.mp4",
    "https://files.catbox.moe/6b2u6t.mp4",
    "https://files.catbox.moe/7pbsoz.mp4",
    "https://files.catbox.moe/l43hd9.mp4",
    "https://files.catbox.moe/1hb473.mp4",
    "https://files.catbox.moe/5d1elo.mp4",
    "https://files.catbox.moe/dm08f7.mp4",
    "https://files.catbox.moe/kmepba.mp4",
    "https://files.catbox.moe/atihux.mp4",
    "https://files.catbox.moe/zwlvks.mp4",
    "https://files.catbox.moe/cpmgx2.mp4",
    "https://files.catbox.moe/x0edhn.mp4",
    "https://files.catbox.moe/cllkp1.mp4",
    "https://files.catbox.moe/xvrzfc.mp4",
    "https://files.catbox.moe/i8u4kd.mp4",
    "https://files.catbox.moe/94vtoq.mp4",
    "https://files.catbox.moe/q6i2rm.mp4",
    "https://files.catbox.moe/xz0klw.mp4",
    "https://files.catbox.moe/ptce1i.mp4"
  ];

  const randomLink = videos[Math.floor(Math.random() * videos.length)];
  const path = __dirname + "/cache/mehedi.mp4";  // Mirai bot-এ cache folder টা এভাবেই কাজ করে

  try {
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
          body: "এই নে তোর জন্য স্পেশাল 🔥",
          attachment: fs.createReadStream(path)
        },
        event.threadID,
        () => fs.unlinkSync(path),  // ফাইল ডিলিট করে দিবে সেন্ড করার পর
        event.messageID
      );
    });

    writer.on("error", (err) => {
      api.sendMessage("ভিডিও ডাউনলোড করতে সমস্যা হয়েছে!", event.threadID);
      console.error(err);
    });

  } catch (error) {
    api.sendMessage("Error হয়েছে, আবার চেষ্টা কর ভাই!", event.threadID);
    console.error(error);
  }
};
