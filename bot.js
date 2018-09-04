const Discord = require('discord.js');
const ytdl = require("ytdl-core");
const client = new Discord.Client();

var guilds = {};

const prefix = 'ye';

const embed = new Discord.RichEmbed().setColor(0x00AE86).setImage("https://imgur.com/Olreq87.jpg").setThumbnail("https://imgur.com/wnUYwje.png").setTimestamp();

function playAudio(id, msg) {
	if(msg.member.voiceChannel !== undefined){
	    guilds[msg.guild.id].voiceChannel = msg.member.voiceChannel;

	    guilds[msg.guild.id].voiceChannel.join().then(function(connection) {
	    	stream = ytdl("https://www.youtube.com/watch?v=" + id, {
	            filter: 'audioonly'
	        });
	        guilds[msg.guild.id].dispatcher = connection.playStream(stream);
	        guilds.isPlaying = true;
	        guilds[msg.guild.id].dispatcher.on('end', function() {
	        	guilds[msg.guild.id].voiceChannel.leave();
	        	msg.channel.send('Audio done playing.');
	        	guilds.isPlaying = false;
	    	});
		});
	}
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

	var id = null;

	if(!guilds[msg.guild.id]){
        guilds[msg.guild.id] = {
            isPlaying: false,
            dispatcher: null,
            voiceChannel: null
        };
    }

	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	if(msg.content.startsWith(prefix + ' help')){
		msg.channel.send('[Text Commands]\nblip, dead\n\n[Picture Commands]\nslippers\n\n[Soundboard Commands]\nlaser, stop\n\n[Song Commands]\nsavage, stop');
	}
	if(msg.content.startsWith(prefix + ' blip')){
		msg.channel.send('it ain\'t no joke!');
	}
	if(msg.content.startsWith(prefix + ' dead')){
		msg.channel.send('Picasso is dead! Steve Jobs is dead! Walt Disney is dead! I\'m dead!');
	}
	if(msg.content.startsWith(prefix + ' slippers')){
		msg.channel.send({embed});
	}
	if(msg.content.startsWith(prefix + ' laser')){
		id = '3iMz5J7w1kU';
		//msg.channel.send('I will fucking laser you with alien fuckin eyes and explode your fuckin...head.');
		playAudio(id, msg);
	}
	if(msg.content.startsWith(prefix + ' savage')){
		id = '6bywWYOzZdY';
		//msg.channel.send('I will fucking laser you with alien fuckin eyes and explode your fuckin...head.');
		playAudio(id, msg);
	}
	if(msg.content.startsWith(prefix + ' stop')){
		if(guilds.isPlaying === true){
			guilds[msg.guild.id].voiceChannel.leave();
        	msg.channel.send('Audio stopped.');
        	guilds.isPlaying = false;
		}
	}

	//console.log(guilds);
});
 
client.login('/* token */');