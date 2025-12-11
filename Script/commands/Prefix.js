module.exports.config = {
  name: "prefix",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "MOHAMMAD AKASH",
  description: "Display the bot's prefix and owner info",
  commandCategory: "Information",
  usages: "",
  cooldowns: 5
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body } = event;
  if (!body) return;

  var dataThread = await Threads.getData(threadID);
  var data = dataThread.data || {};
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  const groupName = dataThread.threadInfo?.threadName || "Unnamed Group";

  const triggerWords = [
    "prefix", "mprefix", "mpre", "bot prefix", "what is the prefix", "bot name",
    "how to use bot", "bot not working", "bot is offline", "prefx", "prfix",
    "perfix", "bot not talking", "where is bot", "bot dead", "bots dead",
    "dấu lệnh", "daulenh", "what prefix", "freefix", "what is bot", "what prefix bot",
    "how use bot", "where are the bots", "where prefix"
  ];

  let lowerBody = body.toLowerCase();
  if (triggerWords.includes(lowerBody)) {
    return api.sendMessage(
`🌟━━━━━━━━━━━━━━━━━━━━━━━━━━━━🌟
      『 🛡️ 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐏𝐑𝐄𝐅𝐈𝐗 𝐌𝐄𝐍𝐔 🛡️ 』
🌟━━━━━━━━━━━━━━━━━━━━━━━━━━━━🌟

🦋 𝘼𝙎𝙎𝘼𝙇𝘼𝙈𝙐𝘼𝙇𝘼𝙄𝙆𝙐𝙈 ✨
𝐇𝐞𝐥𝐥𝐨, 𝐈 𝐚𝐦 𝐌𝐚𝐢𝐬𝐡𝐚 𝐀𝐢 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 🤖💙

『 𝗣𝗥𝗘𝗙𝗜𝗫 𝗦𝗘𝗖𝗧𝗜𝗢𝗡 』

🔹 𝙎𝙮𝙨𝙩𝙚𝙢 𝙋𝙧𝙚𝙛𝙞𝙭 : 【 ${prefix} 】  
🔹 𝙂𝙧𝙤𝙪𝙥 𝙋𝙧𝙚𝙛𝙞𝙭  : 【 ${prefix} 】

『 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 』

🤖 𝘽𝙤𝙩 𝙉𝙖𝙢𝙚 : 𝐌𝐄𝐇𝐄𝐃𝐈 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭   
⚙️ 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝘽𝙮 : 𝐌𝐞𝐡𝐞𝐝𝐢 𝐌𝐚𝐢𝐬𝐡𝐚 𝐀𝐢  
🚀 𝙎𝙩𝙖𝙩𝙪𝙨 : 𝘼𝙘𝙩𝙞𝙫𝙚 ✔️

『 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 』

👤 𝙊𝙬𝙣𝙚𝙧 :   𝐌𝐄𝐇𝐄𝐃𝐈
🌐 𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠 : https://www.facebook.com/profile.php?id=61583147223219
📞 𝙒𝙝𝙖𝙩𝙨𝘼𝙥𝙥 : wa.me/880000000000  

『 𝗚𝗥𝗢𝗨𝗣 𝗗𝗘𝗧𝗔𝗜𝗟𝗦 』

💬 𝙂𝙧𝙤𝙪𝙥 𝙉𝙖𝙢𝙚 : 【 ${groupName} 】  
🆔 𝙂𝙧𝙤𝙪𝙥 𝙄𝘿 : 【 ${threadID} 】

🌟━━━━━━━━━━━━━━━━━━━━━━━━━━━━🌟
          𝙏𝙝𝙖𝙣𝙠 𝙔𝙤𝙪 𝙁𝙤𝙧 𝙐𝙨𝙞𝙣𝙜 💙
🌟━━━━━━━━━━━━━━━━━━━━━━━━━━━━🌟`,
threadID );
  }
};

module.exports.run = async ({ event, api }) => {
  return api.sendMessage("Type 'prefix' or similar to get the bot info.", event.threadID);
};
