const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = 'ye';

const embed = new Discord.RichEmbed().setColor(0x00AE86).setImage("https://imgur.com/Olreq87.jpg").setThumbnail("https://imgur.com/wnUYwje.png").setTimestamp();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	if(msg.content.startsWith(prefix + ' blip')){
		msg.channel.send('it ain\'t no joke!');
	}
	if(msg.content.startsWith(prefix + ' dead')){
		msg.channel.send('Picasso is dead! Steve Jobs is dead! Walt Disney is dead! I\'m dead!');
	}
	if(msg.content.startsWith(prefix + ' slippers')){
		msg.channel.send({embed});
	}
});
 
client.login('/* token */');