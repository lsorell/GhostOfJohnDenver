var Discord = require('discord.io');
var fs = require('fs');
var auth = require('./auth.json');

var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

var VCID = auth.vcid;
var song = 'John Denver - Take Me Home Country Roads.mp3';

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
	
	bot.joinVoiceChannel(VCID, function(err, events) {
        if (err) return console.error(err);

        bot.getAudioContext(VCID, function(err, stream) {
            if (err) return console.error(err);			
            fs.createReadStream(song).pipe(stream, {end: false});
            stream.on('done', function() {				
                fs.createReadStream(song).pipe(stream, {end: false});
            });
        });
    });
});