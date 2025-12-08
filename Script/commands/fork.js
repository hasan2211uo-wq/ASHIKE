module.exports.config = {
    name: "fork",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "SHAHADAT SAHU",
    description: "Send YouTube channel and GitHub fork link with intro text",
    commandCategory: "other",
    usages: "fork",
    cooldowns: 0,
};

module.exports.run = async function({ api, event }) {
    const message = 
        "🔗 আমার GitHub Repo:
হুদাই, সর ফকিন্নি চাইয়া আসোস কেন,আমার কোন repo tipo নাই, জা বাগ শালা 😎😜/MAISHA-CHAT-BOT";

    return api.sendMessage(message, event.threadID, event.messageID);
};
