const Canvas = require("canvas");
const Discord = require('discord.js');
const background = "https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png"
const av = {
    size: 256,
    x: 480,
    y: 170
}
const dim = {
    height: 675,
    width: 1200,
    margin: 50
}

const generateImage = async (member) => {
  let username = member.user.username;
  let discrim = member.user.discriminator;
  let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: "false", size: av.size});

  const canvas = Canvas.createCanvas(dim.width, dim.height);
  const ctx = canvas.getContext("2d");

  //draw in background
  const backimage = await Canvas.loadImage(background);
  ctx.drawImage (backimage, 0, 0);

  //draw black box
  ctx.fillStyle = "rgba(0,0,0,0.8)";
  ctx.fillRect = (dim.margin, dim.margin, dim.width - 2*dim.margin, dim.height - 2*dim.margin);

  //draw in avatar
  const avimg = await Canvas.loadImage(avatarURL);
  ctx.save();

  ctx.beginPath();
  ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip()

  ctx.drawImage(avimg, av.x, av.y)
  ctx.restore();

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");
  return attachment;
};

module.exports = generateImage;
