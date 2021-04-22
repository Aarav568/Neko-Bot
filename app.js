const Discord = require("discord.js")
const client = new Discord.Client()
const fetch = require("node-fetch")

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
var url = "https://nekos.life/api/v2/img/";

client.on("ready", () => {
  console.log(`Logged as ${client.user.tag}`)
})

client.on("message", msg => {

  message = msg.content.toLowerCase()
  if(msg.content == "nya neko"){
    async function getNeko() {
    try{        
              const response = await fetch(url + "neko", requestOptions)
              const data = await response.json()
              msg.reply(data.url)
          } catch (err) {
              console.log(err)
          }
  }
    getNeko()
  }

  if(msg.content == "nya lewd"){
    if(msg.channel.nsfw){
      async function getLewd() {
    try{        
              const response = await fetch(url + "lewd", requestOptions)
              const data = await response.json()
              msg.reply(data.url)
          } catch (err) {
              console.log(err)
          }
  }
  getLewd()
    } else {
      msg.reply("nope bitch do it in the NSFW channel")
    }
  }

  if(msg.content == "nya nigga"){
    msg.reply("https://imgur.com/WelizP6")
  }


})
async function getNeko() {
   try{        
            const response = await fetch(url, requestOptions)
            const data = await response.json()
            msg.reply(data.url)
        } catch (err) {
            console.log(err)
        }
}

client.login("ODM0ODIyMzI5MTgzODk1NjEz.YIGe4Q.AWtR4fos4IMxEkOg0Lq0xfpJ-Qc")