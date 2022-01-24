const Discord = require('discord.js');
require("dotenv").config();

const generateImage  = require("./generateImage");

const client = new Discord.Client({
   intents: [
     "GUILDS",
     "GUILD_MESSAGES",
     "GUILD_MEMBERS"
   ]
 });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
});

client.on("messageCreate", (message) =>{
  if (message.content == "hi"){
      message.reply("hello")
  }
});

const generalChannelId = "934906615956643863";

client.on("guildMemberAdd", async(member) =>{
    const img = await generateImage(member);
    member.guild.channels.cache.get(generalChannelId).send({
      content: `<@${member.id}> hi welcome to the server`,
      files: [img]

    });
});

//must be last line in file
client.login(process.env.TOKEN);
