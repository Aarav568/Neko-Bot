const app = require("express")()
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
var message = msg.content
if(message.slice(0,3) == "nya" || "NYA" || "Nya") {
  var command = message.slice(4)
  /*FUNCTION------------------------------------------------------------------------------*/
  async function getCommand(cmd) {
        try{        
            const response = await fetch(url + cmd, requestOptions)
            const data = await response.json()
            msg.reply(data.url)
        } catch (err) {
            console.log(err)
        }
    }
    /*COMMANDS----------------------------------------------------------------------------------*/

    /*-------NEKO----------*/
    if(command == "neko"){
      if(msg.channel.nsfw){
        getCommand("neko")
      } else {
        msg.reply("nope bitch do it in the 'catgirl-services' channel")
      }
    }
    /*-------NEKOGIF----------*/
    if(command == "nekogif"){
      if(msg.channel.nsfw){
        getCommand("ngif")
      } else {
        msg.reply("nope bitch do it in the 'catgirl-services' channel")
      }
    }
    /*-------LEWD----------*/
    if(command == "lewd"){
      if(msg.channel.nsfw){
        getCommand("lewd")
      } else {
        msg.reply("nope bitch do it in the 'catgirl-services' channel")
      }
    }
    /*-------WALLPAPER----------*/
    if(command == "wallpaper"){
      if(msg.channel.name == "wallpaper"){
        getCommand("wallpaper") 
      } else {
        msg.reply(`Whore go to "wallpaper" channel`)
      }
    }
    /*--------------HELP--------------*/
    if(command == "help"){
      msg.reply(`Commands............ \n **nya neko**: Get Random Catgorl pic ~nya~ \n **nya nekogif**: Get Random Catgorl GIF ~nya~ \n **nya gif searchquery**: Gives a gif according to the searchquery  \n **nya lewd**: Get a LEWD pic, use in NSFW channel \n **nya wallpaper**: Get yourself an anime Wallpaper!, use in wallpaper channel \n **nya anime searchquery**: Search an anime with the searchquery \n **nya help**: to view this message `)
    }
    /*--------------GIF--------------*/
    if(message.slice(4, 7) == "gif"){
      var query = message.slice(8)
      async function gif(q) {
        try{        
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=QJtP1YeJJCKi7paJBEUjM3BNaQ79oyQ3&q=${q}&limit=1`, requestOptions)
            const data = await response.json()
            msg.reply(data.data[0].url)
        } catch (err) {
            console.log(err)
        }
      }
      gif(query)
    }
/*    -----------------------ANIME----------------------------------------------*/    
      if(message.slice(4, 9) == "anime"){
      var query = message.slice(10)
      var searchq = "";
      for (var i = 0; i<query.length; i++){
        if(query[i] == " "){
          searchq += "%20"
        } else {
          searchq += query[i]
        }
      }
      async function anime(q) {
        try{        
            const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${q}`, requestOptions)
            const data = await response.json()
            for (var i=0; i < 3; i++){
              msg.channel.send(`\n${data.data[i].attributes.posterImage.small}\n**${data.data[i].attributes.titles.en || data.data[i].attributes.titles.en_jp}**\n${(data.data[i].attributes.synopsis).slice(300)}...`)
            }
        } catch (err) {
            console.log(err)
        }
      }
      if(msg.channel.name == "anime"){
        msg.reply("*Loading... count to 5 or maybe 10*")
        anime(searchq)
      } else {
        msg.reply(`Dumbass go to "anime" channel`)
      }
    }

    /*END*/
  }
})

/*CONFIGURATION--------------------------------------------------------------------------*/
client.login(process.env.TOKEN)

app.get("/", (req, res)=> {
  res.send("runnin' runnin'")
})

app.listen(process.env.PORT, ()=> {
  console.log("NODE STARTED")
})
