let recent = [];
const Discord = require("discord.js");
const bot = new Discord.Client();
const http = require("http");
const express = require("express");
const app = express();
const fs = require("fs");
const prefix = "p";
const credits =
  "Code in JS Herberg in  Heroku \nSimpleJavaScript Version Cookie ^0.0.1";
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
var botOwnerID = "357455162111033345";
var unusedWords = ["est", "un", "de", "le", "c"];

bot.on("ready", function() {
  console.log("Connecté !");
  bot.user.setActivity({
  "game": {
    "name": "Visual Studio Code",
    "type": "STREAMING",
    "url": "https://www.twitch.tv/creeperbot"
  }
  })
  .then(presence => {})
  .catch(console.error);
});


//Debut des cmds de test//
bot.on("message", message => {
  if (recent.includes(message.author.id))
    return message.reply(
      "Je suis pas sûr que spam est autorisé, Va lire les règles de ton serveur"
    );

  let command = message.content
    .split(" ")[0]
    .slice(prefix.length)
    .toLowerCase();
  let args = message.content.split(" ").slice(1);
  const mc = message.content;
  const cmds = message.content === prefix;
  const pping = prefix + "ping";
  const pcredits = prefix + "credits";
  if (message.content === pping) {
    var ping = new Date().getTime - message.createdTimestamp;
    message.reply("Pong !", ping, "ms.");
  }
  if (message.content === pcredits) {
    message.reply(credits);
  }
  if (mc === "yani le bg") {
    message.reply("XD t ki ?");
  }
  if (mc === "ton createur.") {
    message.reply("ah");
  }
  if (message.member.user.bot) return;
  recent.push(message.author.id);
  setTimeout(() => {
    recent.splice(recent.indexOf(message.author.id), 1);
  }, 5000);
});

bot.on("message", message => {
  var words = message.content
    .toLowerCase()
    .trim()
    .split(/[ '?!,.;:]+/g); // Pass 1
  words = words.join(" ").trim();
  words = words
    .toLowerCase()
    .trim()
    .split(/[ '?,.;:]+/g); // Pass 2
  for (var W = 0; W < unusedWords.length; W++) {
    if (words.indexOf(unusedWords[W]) > -1)
      words.splice(words.indexOf(unusedWords[W]), 1);
  }
  words = words.join(" ");
  if (words == bot.user.username.toLowerCase() + " help") {
    message.channel.send(
      new Discord.RichEmbed()
        .setTitle("Aide " + bot.user.username)
        .setDescription(
          "Vous trouverez ici toutes mes commandes. \n" +
            "Toutes les phrases doivent être préfixées par ``" +
            bot.user.username +
            "``. "
        )
        .addField(
          "Qui est ton créateur ? ",
          "Donne le nom du créateur du bot. "
        )
        .setFooter(
          "By " + bot.users.get(botOwnerID).tag,
          bot.users.get(botOwnerID).avatarURL
        )
    );
  }
  if (words == bot.user.username.toLowerCase() + " qui ton créateur") {
    message.channel.send("C'est " + bot.users.get(botOwnerID).tag + ". ");
  }
  /* if (words == bot.user.username.toLowerCase() + " qui ton créateur") {
    message.channel.send("C'est " + bot.users.get(botOwnerID).tag + ". ");
  } */
  if (words == "yani bg") {
    message.channel.send("XD, t'es qui ?");
  }
});

// fin des cmds de test //

/* Connexion */

bot.login(./config.json);
 
