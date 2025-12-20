const fs = require("fs-extra");
const axios = require("axios");

module.exports.config = {
  name: "maisha",
  version: "3.0",
  hasPermssion: 2,  // 0 = tất cả mọi người dùng được
  credits: "MOHAMMAD AKASH × Modified",
  description: "18+ Random Hot Video",
  commandCategory: "18+",
  usages: "maisha",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const videos = [
    "https://files.catbox.moe/e64laq.mp4",
    "https://files.catbox.moe/5sigio.mp4",
    "https://files.catbox.moe/xfhnjl.mp4",
    "https://files.catbox.moe/nlg2ja.mp4",
    "https://files.catbox.moe/ve6bp5.mp4",
    "https://files.catbox.moe/mxcs6o.mp4",
    "https://files.catbox.moe/iuhy14.mp4",
    "https://files.catbox.moe/qpg7hk.mp4",
    "https://files.catbox.moe/1a5zm2.mp4",
    "https://files.catbox.moe/nwcd1q.mp4",
    "https://files.catbox.moe/fy9iio.mp4",
    "https://files.catbox.moe/kw5bbp.mp4",
    "https://files.catbox.moe/c97ovn.mp4",
    "https://files.catbox.moe/p9skcq.mp4"
  ];

  const randomLink = videos[Math.floor(Math.random() * videos.length)];
  const path = __dirname + "/cache/maisha.mp4";

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
          body: "এই নে মাইশার জন্য স্পেশাল কালেকশন 🔥🍑",
          attachment: fs.createReadStream(path)
        },
        event.threadID,
        () => fs.unlinkSync(path),
        event.messageID
      );
    });

    writer.on("error", (err) => {
      console.error(err);
      api.sendMessage("ভিডিও ডাউনলোডে সমস্যা হয়েছে!", event.threadID);
    });

  } catch (error) {
    console.error(error);
    api.sendMessage("Error! আবার চেষ্টা কর।", event.threadID);
  }
};
