const discord = require('discord.js')
const bot = new discord.Client()
const config = require("./config.json");
var blacklistedids = require("./config.json").blacklisted_ids;

var admin_ids = require("./config.json").admin_ids;

var owner_ids = require("./config.json").ownerid;

const fs = require("fs");

const sql = require('sqlite');
sql.open('./thinkpoints.sqlite');

let points = JSON.parse(fs.readFileSync('./thinkpoints.json', 'utf8'));

bot.login(config.token)

bot.on('ready', () => {
	console.log('Logged in as ' + bot.user.username + ' and I am on ' + bot.guilds.size + ' guilds!')


});


bot.on("guildMemberAdd", (member) => {
  const guild = member.guild;
	let joinlog = bot.guilds.get(message.guild.id).channels.find('name', 'join-logs')
	member.guild.channels.get(joinlog.id).sendEmbed(new discord.RichEmbed().setTitle('Welcome to ' + guild.name + '!').setAuthor(member.user.username + '#' + member.user.discriminator, member.user.avatarURL).setThumbnail(guild.iconURL).setColor(0xFFB6C1).setDescription('Hope you have a great time here!').setTimestamp());

});
bot.on("guildMemberRemove", (member) => {
  const guild = member.guild;
	let joinlog = bot.guilds.get(message.guild.id).channels.find('name', 'join-logs')
	member.guild.channels.get(joinlog.id).sendEmbed(new discord.RichEmbed().setTitle('Has left ' + guild.name + '!').setAuthor(member.user.username + '#' + member.user.discriminator, member.user.avatarURL).setThumbnail(guild.iconURL).setColor(0xFFB6C1).setDescription('Rest in pieces :(').setTimestamp());
});


bot.on('message', message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(config.prefix)) return;

	let command = message.content.split(" ")[0];
	command = command.slice(config.prefix.length);

  console.log(message.author.username + '#' + message.author.discriminator + ' (' + message.author.id + ') did the command: ' + command + " on " + message.guild.name);

  let args = message.content.split(" ").slice(1);









  if (command === "defgame"){
    if(isBlacklisted(message.author.id)) return message.reply(config.blacklist_message)
    if(isAdmin(message.author.id)) return bot.user.setGame(config.playing);
    message.reply("No Permissions :/")
  }

  if (command === "restart"){
    if(isBlacklisted(message.author.id)) return message.reply(config.blacklist_message)
    if(!isAdmin(message.author.id)) return message.reply("No Permissions :/")
    console.log("Restarting...")
    process.exit()
  }
/**
	if (command === "test"){

		if(args.join(" ") === "testa"){
			message.reply("huh")
		} else

		if(args.join(" ") === "fun"){
			message.reply("yay")
		} else
		message.reply("ehhh")

	}
	**/
  if (command === "setgame"){
    if(isBlacklisted(message.author.id)) return message.reply(config.blacklist_message)
    if(!isAdmin(message.author.id)) return message.reply("No Permissions :/")
    bot.user.setGame(args.join(" "))
  }
  if (!points[message.author.id]) points[message.author.id] = {
    points: 0
  };
  let userData = points[message.author.id];

	let topThinkerPoints = points[config.topthinker]

	let topThinkerPointstwo = points[config.topthinkertwo]

	let topThinkerPointsthree = points[config.topthinkerthree]


  if (command === "think"){

		sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			} else {

				sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
			}
		}).catch(() => {
			console.error;
			sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			});
		});


		let thinkerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Thinker');
		let noviceRole = bot.guilds.get(message.guild.id).roles.find('name', 'Novice');
		let apprenticeRole = bot.guilds.get(message.guild.id).roles.find('name', 'Apprentice');
		let adeptRole = bot.guilds.get(message.guild.id).roles.find('name', 'Adept');
		let expertRole = bot.guilds.get(message.guild.id).roles.find('name', 'Expert');
		let masterRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master');
		let superintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'Super Intellegent');
		let geniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Genius');
		let mastergeniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master Genius');
		let godofintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'God of Intellegent')
		let thinklegendRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Legend')
		let thinkgodRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think God')
		let thinkoverseerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Overseer')
    if(isBlacklisted(message.author.id)) return message.reply(config.blacklist_message)
		if (message.member.roles.has(thinkerRole.id)) {
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			} else {

				sql.run(`UPDATE scores SET points = ${row.points + 2} WHERE userId = ${message.author.id}`);
			}
		}).catch(() => {
			console.error;
			sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 2]);
			});
		});
				//for(count = 0; count < 3; count++){
					//userData.points++;
				//}
				message.reply("You have earned +2 think points!")

				//fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
					//if (err) console.error(err)
				//});
		} else
		if (message.member.roles.has(noviceRole.id)) {
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			} else {

				sql.run(`UPDATE scores SET points = ${row.points + 2} WHERE userId = ${message.author.id}`);
			}
		}).catch(() => {
			console.error;
			sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 2]);
			});
		});
				//for(count = 0; count < 3; count++){
					//userData.points++;
				//}
				message.reply("You have earned +2 think points!")

				//fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
					//if (err) console.error(err)
				//});
		} else
		if (message.member.roles.has(apprenticeRole.id)) {
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			} else {

				sql.run(`UPDATE scores SET points = ${row.points + 3} WHERE userId = ${message.author.id}`);
			}
		}).catch(() => {
			console.error;
			sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 3]);
			});
		});
				//for(count = 0; count < 3; count++){
					//userData.points++;
				//}
				message.reply("You have earned +3 think points!")

				//fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
					//if (err) console.error(err)
				//});
		} else
		if (message.member.roles.has(adeptRole.id)) {
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			} else {

				sql.run(`UPDATE scores SET points = ${row.points + 4} WHERE userId = ${message.author.id}`);
			}
		}).catch(() => {
			console.error;
			sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 4]);
			});
		});
				//for(count = 0; count < 5; count++){
					//userData.points++;
				//}
				message.reply("You have earned +4 think points!")

				//fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
					//if (err) console.error(err)
				//});
		} else
		if (message.member.roles.has(expertRole.id)) {
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			} else {

				sql.run(`UPDATE scores SET points = ${row.points + 6} WHERE userId = ${message.author.id}`);
			}
		}).catch(() => {
			console.error;
			sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 6]);
			});
		});
				//for(count = 0; count < 3; count++){
					//userData.points++;
				//}
				message.reply("You have earned +6 think points!")

				//fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
					//if (err) console.error(err)
				//});
		} else
		if (message.member.roles.has(masterRole.id)) {
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			} else {

				sql.run(`UPDATE scores SET points = ${row.points + 10} WHERE userId = ${message.author.id}`);
			}
		}).catch(() => {
			console.error;
			sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 10]);
			});
		});
				//for(count = 0; count < 3; count++){
					//userData.points++;
				//}
				message.reply("You have earned +10 think points!")

				//fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
					//if (err) console.error(err)
				//});
		} else
		if (message.member.roles.has(superintellegentRole.id)) {
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			} else {

				sql.run(`UPDATE scores SET points = ${row.points + 12} WHERE userId = ${message.author.id}`);
			}
		}).catch(() => {
			console.error;
			sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 12]);
			});
		});
				//for(count = 0; count < 3; count++){
					//userData.points++;
				//}
				message.reply("You have earned +12 think points!")

				//fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
					//if (err) console.error(err)
				//});
		} else
		if (message.member.roles.has(geniusRole.id)) {
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			} else {

				sql.run(`UPDATE scores SET points = ${row.points + 13} WHERE userId = ${message.author.id}`);
			}
		}).catch(() => {
			console.error;
			sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 13]);
			});
		});
				//for(count = 0; count < 3; count++){
					//userData.points++;
				//}
				message.reply("You have earned +13 think points!")

				//fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
					//if (err) console.error(err)
				//});
		} else
		if (message.member.roles.has(mastergeniusRole.id)) {
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			} else {

				sql.run(`UPDATE scores SET points = ${row.points + 15} WHERE userId = ${message.author.id}`);
			}
		}).catch(() => {
			console.error;
			sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 15]);
			});
		});
				//for(count = 0; count < 3; count++){
					//userData.points++;
				//}
				message.reply("You have earned +15 think points!")

				//fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
					//if (err) console.error(err)
				//});
		} else
		if (message.member.roles.has(godofintellegentRole.id)) {
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			} else {

				sql.run(`UPDATE scores SET points = ${row.points + 45} WHERE userId = ${message.author.id}`);
			}
		}).catch(() => {
			console.error;
			sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 45]);
			});
		});
				//for(count = 0; count < 3; count++){
					//userData.points++;
				//}
				message.reply("You have earned +45 think points!")

				//fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
					//if (err) console.error(err)
				//});
		} else
		if (message.member.roles.has(thinklegendRole.id)) {
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			} else {

				sql.run(`UPDATE scores SET points = ${row.points + 56} WHERE userId = ${message.author.id}`);
			}
		}).catch(() => {
			console.error;
			sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 56]);
			});
		});
				//for(count = 0; count < 3; count++){
					//userData.points++;
				//}
				message.reply("You have earned +56 think points!")

				//fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
					//if (err) console.error(err)
				//});
		} else

		if (message.member.roles.has(thinkgodRole.id)) {
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			} else {

				sql.run(`UPDATE scores SET points = ${row.points + 350} WHERE userId = ${message.author.id}`);
			}
		}).catch(() => {
			console.error;
			sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 350]);
			});
		});
				//for(count = 0; count < 3; count++){
					//userData.points++;
				//}
				message.reply("You have earned +350 think points!")

				//fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
					//if (err) console.error(err)
				//});
		} else

		if (message.member.roles.has(thinkoverseerRole.id)) {
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1]);
			} else {

				sql.run(`UPDATE scores SET points = ${row.points + 1000} WHERE userId = ${message.author.id}`);
			}
		}).catch(() => {
			console.error;
			sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
				sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [message.author.id, 1000]);
			});
		});
				//for(count = 0; count < 3; count++){
					//userData.points++;
				//}
				message.reply("You have earned +1000 think points!")

				//fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
					//if (err) console.error(err)
				//});
		} else

    //userData.points++;

    message.reply("You have earned +1 think point!")
/**
    fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
      if (err) console.error(err)
    });
		**/
  }

	if (command === "thinkshop"){
		message.channel.sendMessage("```css\n--- Think Shop ---\n\nThinker - 10 Think Points(Type \"t!buyrole thinker\" To buy the role.)\nNovice - 50 Think points(Type \"t!buyrole novice\" To buy the role.)\nApprentice - 100 Think points(Type \"t!buyrole apprentice\" To buy the role.)\nAdept - 150 Think points(Type \"t!buyrole adept\" To buy the role.)\nExpert - 500 Think points(Type \"t!buyrole expert\" To buy the role.)\nMaster - 1000 Think points (Type \"t!buyrole master\" To buy the role.)\nSuper Intellegent - 2000 Think Points(Type \"t!buyrole superintellegent\")\nGenius - 3000 Think Points(Type \"t!buyrole genius\")\nMaster Genius - 5000 Think Points(Type \"t!buyrole mastergenius\")\nGod of Intellegent - 10000 Think Points(Type \"t!buyrole godofintellegent\")\nThink Legend - 50000 Think Points(Type \"t!buyrole thinklegend\")\nThink God - 100000 Think Points(Type \"t!buyrole thinkgod\")\nThink Overseer - 1000000 Think Points(Type \"t!buyrole thinkoverseer\")\n\nWarning, Before you buy:\nThis will take away your think points if you buy these.```")
	}

	if (command === "thinkinspect"){
		let inspectThinkPoints = args[0]

		sql.get(`SELECT * FROM scores WHERE userId ='${inspectThinkPoints}'`).then(row => {
			if (!row) return message.reply('That user does not have ANY Think points.');
			if(!args[0]){
				message.reply("Please use this input:\nt!thinkinspect `userid`")
			}

			message.channel.sendMessage("<@" + args[0] + "> has " + row.points + " Think Points")


	}).catch(() => {
		console.error;
		sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
			sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [inspectThinkPoints, 1]);
		});
	});
}

/**
	if (command === "topspenders"){
		if(isBlacklisted(message.author.id)) return message.reply(config.blacklist_message)
		message.channel.sendEmbed(new discord.RichEmbed().setTitle(":trophy: Top People who had spent their thinkpoints the most :trophy:").addField(":first_place: Top 1", "<@" + config.topspenderone + "> spent 1810 Think Points").addField(":second_place: Top 2", "<@" + config.topspendertwo + "> spent 1810 Think Points")
		.addField(":third_place: Top 3", "<@" + config.topspenderthree + "> spent 700 Think Points"))
  }
**/
	if (command === "buyrole"){




		if(args.join(" ") === "thinker"){

			let thinkerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Thinker');
			let noviceRole = bot.guilds.get(message.guild.id).roles.find('name', 'Novice');
			let apprenticeRole = bot.guilds.get(message.guild.id).roles.find('name', 'Apprentice');
			let adeptRole = bot.guilds.get(message.guild.id).roles.find('name', 'Adept');
			let expertRole = bot.guilds.get(message.guild.id).roles.find('name', 'Expert');
			let masterRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master');
			let superintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'Super Intellegent');
			let geniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Genius');
			let mastergeniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master Genius');
			let godofintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'God of Intellegent')
			let thinklegendRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Legend')
			let thinkgodRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think God')
			let thinkoverseerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Overseer')


			if (message.member.roles.has(thinkerRole.id)) {
				message.reply("Sorry but you have bought the same role!")
			} else
			if (message.member.roles.has(noviceRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(apprenticeRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(adeptRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(expertRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(masterRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(superintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(geniusRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(mastergeniusRole.id)){
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(godofintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinklegendRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkgodRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkoverseerRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else

			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
				if (!row) return message.reply('You do not have enough Think Points! (Need 10 Think Points)');


			if(row.points < 10){
				message.reply("You do not have enough Think Points! (Need 10 Think Points)")
			} else {
				/**
				for(count = 0; count < 10; count++){
					userData.points--;
					fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
						if (err) console.error(err)
					});
				}
				**/
				sql.run(`UPDATE scores SET points = ${row.points - 10} WHERE userId = ${message.author.id}`);
				message.reply("Successfully purchased Thinker! `-10 Think points Removed`")
				message.guild.member(message.author).addRole(thinkerRole)
		}
		})
	} else

		if(args.join(" ") === "novice"){
			let thinkerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Thinker');
			let noviceRole = bot.guilds.get(message.guild.id).roles.find('name', 'Novice');
			let apprenticeRole = bot.guilds.get(message.guild.id).roles.find('name', 'Apprentice');
			let adeptRole = bot.guilds.get(message.guild.id).roles.find('name', 'Adept');
			let expertRole = bot.guilds.get(message.guild.id).roles.find('name', 'Expert');
			let masterRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master');
			let superintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'Super Intellegent');
			let geniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Genius');
			let mastergeniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master Genius');
			let godofintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'God of Intellegent')
			let thinklegendRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Legend')
			let thinkgodRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think God')
			let thinkoverseerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Overseer')
			if (message.member.roles.has(noviceRole.id)) {
				message.reply("Sorry but you have bought the same role!")
			} else
			if (message.member.roles.has(apprenticeRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(adeptRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(expertRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(masterRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(superintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(geniusRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(mastergeniusRole.id)){
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(godofintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinklegendRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkgodRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkoverseerRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
				if (!row) return message.reply('You do not have enough Think Points! (Need 50 Think Points)');


			if(row.points < 50){
				message.reply("You do not have enough Think Points! (Need 50 Think Points)")
			} else {
				/**
				for(count = 0; count < 10; count++){
					userData.points--;
					fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
						if (err) console.error(err)
					});
				}
				**/
				sql.run(`UPDATE scores SET points = ${row.points - 50} WHERE userId = ${message.author.id}`);
				message.reply("Successfully purchased Novice! `-50 Think points Removed`")
				message.guild.member(message.author).addRole(noviceRole)
				message.guild.member(message.author).removeRole(thinkerRole)
		}
		})
		} else
		if(args.join(" ") === "apprentice"){
			let thinkerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Thinker');
			let noviceRole = bot.guilds.get(message.guild.id).roles.find('name', 'Novice');
			let apprenticeRole = bot.guilds.get(message.guild.id).roles.find('name', 'Apprentice');
			let adeptRole = bot.guilds.get(message.guild.id).roles.find('name', 'Adept');
			let expertRole = bot.guilds.get(message.guild.id).roles.find('name', 'Expert');
			let masterRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master');
			let superintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'Super Intellegent');
			let geniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Genius');
			let mastergeniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master Genius');
			let godofintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'God of Intellegent')
			let thinklegendRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Legend')
			let thinkgodRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think God')
			let thinkoverseerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Overseer')

			if (message.member.roles.has(apprenticeRole.id)) {
				message.reply("Sorry but you have bought the same role!")
			} else
			if (message.member.roles.has(adeptRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(expertRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(masterRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(superintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(geniusRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(mastergeniusRole.id)){
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(godofintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinklegendRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkgodRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkoverseerRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else

			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
				if (!row) return message.reply('You do not have enough Think Points! (Need 100 Think Points)');


			if(row.points < 100){
				message.reply("You do not have enough Think Points! (Need 100 Think Points)")
			} else {
				/**
				for(count = 0; count < 10; count++){
					userData.points--;
					fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
						if (err) console.error(err)
					});
				}
				**/
				sql.run(`UPDATE scores SET points = ${row.points - 100} WHERE userId = ${message.author.id}`);
				message.reply("Successfully purchased Apprentice! `-100 Think points Removed`")
				message.guild.member(message.author).addRole(apprenticeRole)
				message.guild.member(message.author).removeRole(noviceRole)
				message.guild.member(message.author).removeRole(thinkerRole)
		}
		})




		}
	}

		if(args.join(" ") === "adept"){
			let thinkerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Thinker');
			let noviceRole = bot.guilds.get(message.guild.id).roles.find('name', 'Novice');
			let apprenticeRole = bot.guilds.get(message.guild.id).roles.find('name', 'Apprentice');
			let adeptRole = bot.guilds.get(message.guild.id).roles.find('name', 'Adept');
			let expertRole = bot.guilds.get(message.guild.id).roles.find('name', 'Expert');
			let masterRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master');
			let superintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'Super Intellegent');
			let geniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Genius');
			let mastergeniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master Genius');
			let godofintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'God of Intellegent')
			let thinklegendRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Legend')
			let thinkgodRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think God')
			let thinkoverseerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Overseer')

			if (message.member.roles.has(adeptRole.id)) {
				message.reply("Sorry but you have bought the same role!")
			} else
			if (message.member.roles.has(expertRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(masterRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(superintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(geniusRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(mastergeniusRole.id)){
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(godofintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinklegendRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkgodRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkoverseerRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else

			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
				if (!row) return message.reply('You do not have enough Think Points! (Need 150 Think Points)');


			if(row.points < 150){
				message.reply("You do not have enough Think Points! (Need 150 Think Points)")
			} else {
				/**
				for(count = 0; count < 10; count++){
					userData.points--;
					fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
						if (err) console.error(err)
					});
				}
				**/
				sql.run(`UPDATE scores SET points = ${row.points - 150} WHERE userId = ${message.author.id}`);
				message.reply("Successfully purchased Adept! `-150 Think points Removed`")
				message.guild.member(message.author).addRole(adeptRole)
				message.guild.member(message.author).removeRole(apprenticeRole)
				message.guild.member(message.author).removeRole(noviceRole)
				message.guild.member(message.author).removeRole(thinkerRole)
		}
		})

		} else

		if(args.join(" ") === "expert"){

			let thinkerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Thinker');
			let noviceRole = bot.guilds.get(message.guild.id).roles.find('name', 'Novice');
			let apprenticeRole = bot.guilds.get(message.guild.id).roles.find('name', 'Apprentice');
			let adeptRole = bot.guilds.get(message.guild.id).roles.find('name', 'Adept');
			let expertRole = bot.guilds.get(message.guild.id).roles.find('name', 'Expert');
			let masterRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master');
			let superintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'Super Intellegent');
			let geniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Genius');
			let mastergeniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master Genius');
			let godofintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'God of Intellegent')
			let thinklegendRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Legend')
			let thinkgodRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think God')
			let thinkoverseerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Overseer')
			if (message.member.roles.has(expertRole.id)) {
				message.reply("Sorry but you have bought the same role!")
			} else
			if (message.member.roles.has(masterRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(superintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(geniusRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(mastergeniusRole.id)){
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(godofintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinklegendRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkgodRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkoverseerRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else

			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
				if (!row) return message.reply('You do not have enough Think Points! (Need 500 Think Points)');


			if(row.points < 500){
				message.reply("You do not have enough Think Points! (Need 500 Think Points)")
			} else {
				/**
				for(count = 0; count < 10; count++){
					userData.points--;
					fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
						if (err) console.error(err)
					});
				}
				**/
				sql.run(`UPDATE scores SET points = ${row.points - 500} WHERE userId = ${message.author.id}`);
				message.reply("Successfully purchased Expert! `-500 Think points Removed`")
				message.guild.member(message.author).addRole(expertRole)
				message.guild.member(message.author).removeRole(adeptRole)
				message.guild.member(message.author).removeRole(apprenticeRole)
				message.guild.member(message.author).removeRole(noviceRole)
				message.guild.member(message.author).removeRole(thinkerRole)
		}
		})


		} else

		if(args.join(" ") === "master"){
			let thinkerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Thinker');
			let noviceRole = bot.guilds.get(message.guild.id).roles.find('name', 'Novice');
			let apprenticeRole = bot.guilds.get(message.guild.id).roles.find('name', 'Apprentice');
			let adeptRole = bot.guilds.get(message.guild.id).roles.find('name', 'Adept');
			let expertRole = bot.guilds.get(message.guild.id).roles.find('name', 'Expert');
			let masterRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master');
			let superintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'Super Intellegent');
			let geniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Genius');
			let mastergeniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master Genius');
			let godofintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'God of Intellegent')
			let thinklegendRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Legend')
			let thinkgodRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think God')
			let thinkoverseerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Overseer')

			if (message.member.roles.has(masterRole.id)) {
				message.reply("Sorry but you have bought the same role!")
			} else
			if (message.member.roles.has(superintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(geniusRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(mastergeniusRole.id)){
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(godofintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinklegendRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkgodRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkoverseerRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else

			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
				if (!row) return message.reply('You do not have enough Think Points! (Need 1000 Think Points)');


			if(row.points < 1000){
				message.reply("You do not have enough Think Points! (Need 1000 Think Points)")
			} else {
				/**
				for(count = 0; count < 10; count++){
					userData.points--;
					fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
						if (err) console.error(err)
					});
				}
				**/
				sql.run(`UPDATE scores SET points = ${row.points - 1000} WHERE userId = ${message.author.id}`);
				message.reply("Successfully purchased Master! `-1000 Think points Removed`")
				message.guild.member(message.author).addRole(masterRole)
				message.guild.member(message.author).removeRole(expertRole)
				message.guild.member(message.author).removeRole(adeptRole)
				message.guild.member(message.author).removeRole(apprenticeRole)
				message.guild.member(message.author).removeRole(noviceRole)
				message.guild.member(message.author).removeRole(thinkerRole)
		}
		})


		} else

		if(args.join(" ") === "superintellegent"){
			let thinkerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Thinker');
			let noviceRole = bot.guilds.get(message.guild.id).roles.find('name', 'Novice');
			let apprenticeRole = bot.guilds.get(message.guild.id).roles.find('name', 'Apprentice');
			let adeptRole = bot.guilds.get(message.guild.id).roles.find('name', 'Adept');
			let expertRole = bot.guilds.get(message.guild.id).roles.find('name', 'Expert');
			let masterRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master');
			let superintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'Super Intellegent');
			let geniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Genius');
			let mastergeniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master Genius');
			let godofintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'God of Intellegent')
			let thinklegendRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Legend')
			let thinkgodRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think God')
			let thinkoverseerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Overseer')

			if (message.member.roles.has(superintellegentRole.id)) {
				message.reply("Sorry but you have bought the same role!")
			} else
			if (message.member.roles.has(geniusRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(mastergeniusRole.id)){
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(godofintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinklegendRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkgodRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkoverseerRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else

			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
				if (!row) return message.reply('You do not have enough Think Points! (Need 2000 Think Points)');


			if(row.points < 2000){
				message.reply("You do not have enough Think Points! (Need 2000 Think Points)")
			} else {
				/**
				for(count = 0; count < 10; count++){
					userData.points--;
					fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
						if (err) console.error(err)
					});
				}
				**/
				sql.run(`UPDATE scores SET points = ${row.points - 2000} WHERE userId = ${message.author.id}`);
				message.reply("Successfully purchased Super Intellegent! `-2000 Think points Removed`")
				message.guild.member(message.author).addRole(superintellegentRole)
				message.guild.member(message.author).removeRole(masterRole)
				message.guild.member(message.author).removeRole(expertRole)
				message.guild.member(message.author).removeRole(adeptRole)
				message.guild.member(message.author).removeRole(apprenticeRole)
				message.guild.member(message.author).removeRole(noviceRole)
				message.guild.member(message.author).removeRole(thinkerRole)
		}
		})


		} else

		if(args.join(" ") === "genius"){

			let thinkerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Thinker');
			let noviceRole = bot.guilds.get(message.guild.id).roles.find('name', 'Novice');
			let apprenticeRole = bot.guilds.get(message.guild.id).roles.find('name', 'Apprentice');
			let adeptRole = bot.guilds.get(message.guild.id).roles.find('name', 'Adept');
			let expertRole = bot.guilds.get(message.guild.id).roles.find('name', 'Expert');
			let masterRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master');
			let superintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'Super Intellegent');
			let geniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Genius');
			let mastergeniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master Genius');
			let godofintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'God of Intellegent')
			let thinklegendRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Legend')
			let thinkgodRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think God')
			let thinkoverseerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Overseer')

			if (message.member.roles.has(geniusRole.id)) {
				message.reply("Sorry but you have bought the same role!")
			} else
			if (message.member.roles.has(mastergeniusRole.id)){
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(godofintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinklegendRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkgodRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkoverseerRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
				if (!row) return message.reply('You do not have enough Think Points! (Need 3000 Think Points)');


			if(row.points < 3000){
				message.reply("You do not have enough Think Points! (Need 3000 Think Points)")
			} else {
				/**
				for(count = 0; count < 10; count++){
					userData.points--;
					fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
						if (err) console.error(err)
					});
				}
				**/
				sql.run(`UPDATE scores SET points = ${row.points - 3000} WHERE userId = ${message.author.id}`);
				message.reply("Successfully purchased Genius! `-3000 Think points Removed`")
				message.guild.member(message.author).addRole(geniusRole)
				message.guild.member(message.author).removeRole(superintellegentRole)
				message.guild.member(message.author).removeRole(masterRole)
				message.guild.member(message.author).removeRole(expertRole)
				message.guild.member(message.author).removeRole(adeptRole)
				message.guild.member(message.author).removeRole(apprenticeRole)
				message.guild.member(message.author).removeRole(noviceRole)
				message.guild.member(message.author).removeRole(thinkerRole)
		}
		})



		if(args.join(" ") === "mastergenius"){
			let thinkerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Thinker');
			let noviceRole = bot.guilds.get(message.guild.id).roles.find('name', 'Novice');
			let apprenticeRole = bot.guilds.get(message.guild.id).roles.find('name', 'Apprentice');
			let adeptRole = bot.guilds.get(message.guild.id).roles.find('name', 'Adept');
			let expertRole = bot.guilds.get(message.guild.id).roles.find('name', 'Expert');
			let masterRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master');
			let superintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'Super Intellegent');
			let geniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Genius');
			let mastergeniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master Genius');
			let godofintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'God of Intellegent')
			let thinklegendRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Legend')
			let thinkgodRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think God')
			let thinkoverseerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Overseer')

			if (message.member.roles.has(mastergeniusRole.id)) {
				message.reply("Sorry but you have bought the same role!")
			} else
			if (message.member.roles.has(godofintellegentRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinklegendRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkgodRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkoverseerRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
				if (!row) return message.reply('You do not have enough Think Points! (Need 5000 Think Points)');


			if(row.points < 5000){
				message.reply("You do not have enough Think Points! (Need 5000 Think Points)")
			} else {
				/**
				for(count = 0; count < 10; count++){
					userData.points--;
					fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
						if (err) console.error(err)
					});
				}
				**/
				sql.run(`UPDATE scores SET points = ${row.points - 5000} WHERE userId = ${message.author.id}`);
				message.reply("Successfully purchased Master Genius! `-5000 Think points Removed`")
				message.guild.member(message.author).addRole(mastergeniusRole)
				message.guild.member(message.author).removeRole(geniusRole)
				message.guild.member(message.author).removeRole(superintellegentRole)
				message.guild.member(message.author).removeRole(masterRole)
				message.guild.member(message.author).removeRole(expertRole)
				message.guild.member(message.author).removeRole(adeptRole)
				message.guild.member(message.author).removeRole(apprenticeRole)
				message.guild.member(message.author).removeRole(noviceRole)
				message.guild.member(message.author).removeRole(thinkerRole)
		}
		})


		} else

		if(args.join(" ") === "godofintellegent"){
			let thinkerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Thinker');
			let noviceRole = bot.guilds.get(message.guild.id).roles.find('name', 'Novice');
			let apprenticeRole = bot.guilds.get(message.guild.id).roles.find('name', 'Apprentice');
			let adeptRole = bot.guilds.get(message.guild.id).roles.find('name', 'Adept');
			let expertRole = bot.guilds.get(message.guild.id).roles.find('name', 'Expert');
			let masterRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master');
			let superintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'Super Intellegent');
			let geniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Genius');
			let mastergeniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master Genius');
			let godofintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'God of Intellegent')
			let thinklegendRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Legend')
			let thinkgodRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think God')
			let thinkoverseerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Overseer')
			if (message.member.roles.has(godofintellegentRole.id)) {
				message.reply("Sorry but you have bought the same role!")
			} else
			if (message.member.roles.has(thinklegendRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkgodRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkoverseerRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else

			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
				if (!row) return message.reply('You do not have enough Think Points! (Need 10000 Think Points)');


			if(row.points < 10000){
				message.reply("You do not have enough Think Points! (Need 10000 Think Points)")
			} else {
				/**
				for(count = 0; count < 10; count++){
					userData.points--;
					fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
						if (err) console.error(err)
					});
				}
				**/
				sql.run(`UPDATE scores SET points = ${row.points - 10000} WHERE userId = ${message.author.id}`);
				message.reply("Successfully purchased God of Intellegent! `-10000 Think points Removed`")
				//message.guild.member(message.author).removeRole(thinkoverseerRole)
				//message.guild.member(message.author).removeRole(thinkgodRole)
				//message.guild.member(message.author).removeRole(thinklegendRole)
				message.guild.member(message.author).addRole(godofintellegentRole)

				message.guild.member(message.author).removeRole(mastergeniusRole)
				message.guild.member(message.author).removeRole(geniusRole)
				message.guild.member(message.author).removeRole(superintellegentRole)
				message.guild.member(message.author).removeRole(masterRole)
				message.guild.member(message.author).removeRole(expertRole)
				message.guild.member(message.author).removeRole(adeptRole)
				message.guild.member(message.author).removeRole(apprenticeRole)
				message.guild.member(message.author).removeRole(noviceRole)
				message.guild.member(message.author).removeRole(thinkerRole)
		}
		})


		} else
		if(args.join(" ") === "thinklegend"){
			let thinkerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Thinker');
			let noviceRole = bot.guilds.get(message.guild.id).roles.find('name', 'Novice');
			let apprenticeRole = bot.guilds.get(message.guild.id).roles.find('name', 'Apprentice');
			let adeptRole = bot.guilds.get(message.guild.id).roles.find('name', 'Adept');
			let expertRole = bot.guilds.get(message.guild.id).roles.find('name', 'Expert');
			let masterRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master');
			let superintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'Super Intellegent');
			let geniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Genius');
			let mastergeniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master Genius');
			let godofintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'God of Intellegent')
			let thinklegendRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Legend')
			let thinkgodRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think God')
			let thinkoverseerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Overseer')
			if (message.member.roles.has(thinklegendRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkgodRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkoverseerRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else

			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
				if (!row) return message.reply('You do not have enough Think Points! (Need 50000 Think Points)');


			if(row.points < 50000){
				message.reply("You do not have enough Think Points! (Need 50000 Think Points)")
			} else {
				/**
				for(count = 0; count < 10; count++){
					userData.points--;
					fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
						if (err) console.error(err)
					});
				}
				**/
				sql.run(`UPDATE scores SET points = ${row.points - 50000} WHERE userId = ${message.author.id}`);
				message.reply("Successfully purchased Think Legend! `-50000 Think points Removed`")
				//message.guild.member(message.author).removeRole(thinkoverseerRole)
				//message.guild.member(message.author).removeRole(thinkgodRole)
				message.guild.member(message.author).addRole(thinklegendRole)
				message.guild.member(message.author).removeRole(godofintellegentRole)

				message.guild.member(message.author).removeRole(mastergeniusRole)
				message.guild.member(message.author).removeRole(geniusRole)
				message.guild.member(message.author).removeRole(superintellegentRole)
				message.guild.member(message.author).removeRole(masterRole)
				message.guild.member(message.author).removeRole(expertRole)
				message.guild.member(message.author).removeRole(adeptRole)
				message.guild.member(message.author).removeRole(apprenticeRole)
				message.guild.member(message.author).removeRole(noviceRole)
				message.guild.member(message.author).removeRole(thinkerRole)
		}
		})

		} else
		if(args.join(" ") === "thinkgod"){
			let thinkerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Thinker');
			let noviceRole = bot.guilds.get(message.guild.id).roles.find('name', 'Novice');
			let apprenticeRole = bot.guilds.get(message.guild.id).roles.find('name', 'Apprentice');
			let adeptRole = bot.guilds.get(message.guild.id).roles.find('name', 'Adept');
			let expertRole = bot.guilds.get(message.guild.id).roles.find('name', 'Expert');
			let masterRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master');
			let superintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'Super Intellegent');
			let geniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Genius');
			let mastergeniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master Genius');
			let godofintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'God of Intellegent')
			let thinklegendRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Legend')
			let thinkgodRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think God')
			let thinkoverseerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Overseer')

			if (message.member.roles.has(thinkgodRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else
			if (message.member.roles.has(thinkoverseerRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else

			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
				if (!row) return message.reply('You do not have enough Think Points! (Need 100000 Think Points)');


			if(row.points < 100000){
				message.reply("You do not have enough Think Points! (Need 100000 Think Points)")
			} else {
				/**
				for(count = 0; count < 10; count++){
					userData.points--;
					fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
						if (err) console.error(err)
					});
				}
				**/
				sql.run(`UPDATE scores SET points = ${row.points - 100000} WHERE userId = ${message.author.id}`);
				message.reply("Successfully purchased Think God! `-100000 Think points Removed`")
				//message.guild.member(message.author).removeRole(thinkoverseerRole)
				message.guild.member(message.author).addRole(thinkgodRole)
				message.guild.member(message.author).removeRole(thinklegendRole)
				message.guild.member(message.author).removeRole(godofintellegentRole)

				message.guild.member(message.author).removeRole(mastergeniusRole)
				message.guild.member(message.author).removeRole(geniusRole)
				message.guild.member(message.author).removeRole(superintellegentRole)
				message.guild.member(message.author).removeRole(masterRole)
				message.guild.member(message.author).removeRole(expertRole)
				message.guild.member(message.author).removeRole(adeptRole)
				message.guild.member(message.author).removeRole(apprenticeRole)
				message.guild.member(message.author).removeRole(noviceRole)
				message.guild.member(message.author).removeRole(thinkerRole)
		}
		})


		} else
		if(args.join(" ") === "thinkoverseer"){
			let thinkerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Thinker');
			let noviceRole = bot.guilds.get(message.guild.id).roles.find('name', 'Novice');
			let apprenticeRole = bot.guilds.get(message.guild.id).roles.find('name', 'Apprentice');
			let adeptRole = bot.guilds.get(message.guild.id).roles.find('name', 'Adept');
			let expertRole = bot.guilds.get(message.guild.id).roles.find('name', 'Expert');
			let masterRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master');
			let superintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'Super Intellegent');
			let geniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Genius');
			let mastergeniusRole = bot.guilds.get(message.guild.id).roles.find('name', 'Master Genius');
			let godofintellegentRole = bot.guilds.get(message.guild.id).roles.find('name', 'God of Intellegent')
			let thinklegendRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Legend')
			let thinkgodRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think God')
			let thinkoverseerRole = bot.guilds.get(message.guild.id).roles.find('name', 'Think Overseer')
			if (message.member.roles.has(thinkoverseerRole.id)) {
				message.reply("Sorry but you have bought a higher role than this role!")
			} else

			sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
				if (!row) return message.reply('You do not have enough Think Points! (Need 1000000 Think Points)');


			if(row.points < 1000000){
				message.reply("You do not have enough Think Points! (Need 1000000 Think Points)")
			} else {
				/**
				for(count = 0; count < 10; count++){
					userData.points--;
					fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
						if (err) console.error(err)
					});
				}
				**/
				sql.run(`UPDATE scores SET points = ${row.points - 1000000} WHERE userId = ${message.author.id}`);
				message.reply("Successfully purchased Think Overseer! `-1000000 Think points Removed`")
				message.guild.member(message.author).addRole(thinkoverseerRole)
				message.guild.member(message.author).removeRole(thinkgodRole)
				message.guild.member(message.author).removeRole(thinklegendRole)
				message.guild.member(message.author).removeRole(godofintellegentRole)

				message.guild.member(message.author).removeRole(mastergeniusRole)
				message.guild.member(message.author).removeRole(geniusRole)
				message.guild.member(message.author).removeRole(superintellegentRole)
				message.guild.member(message.author).removeRole(masterRole)
				message.guild.member(message.author).removeRole(expertRole)
				message.guild.member(message.author).removeRole(adeptRole)
				message.guild.member(message.author).removeRole(apprenticeRole)
				message.guild.member(message.author).removeRole(noviceRole)
				message.guild.member(message.author).removeRole(thinkerRole)
		}
		})


		} else
		message.reply("Please type `t!thinkshop` for more info.")

}


  if (command === "thinkpoints") {
    if(isBlacklisted(message.author.id)) return message.reply(config.blacklist_message)
		sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) return message.reply('You have 0 think points.');
			if(message.author.id === config.topthinker) return message.reply(`You have ${row.points} think points, You are the top thinker!`);
			message.reply(`You have ${row.points} think points.`);
		});
    //if(message.author.id === config.topthinker) return message.reply(`You have ${userData.points} think points, You are the top thinker!`);
    //message.reply(`You have ${userData.points} think points.`);
  }

  if (command === "thinkboard"){
    if(isBlacklisted(message.author.id)) return message.reply(config.blacklist_message)

		let thinkpointsone = sql.get(`SELECT * FROM scores WHERE userId ='${config.topthinker}'`).then(row => {})
		let thinkpointstwo = sql.get(`SELECT * FROM scores WHERE userId = '${config.topthinkertwo}'`).then(row1 => {})
		let thinkpointsthree = sql.get(`SELECT * FROM scores WHERE userId = '${config.topthinkerthree}'`).then(row2 => {})


			message.channel.sendEmbed(new discord.RichEmbed().setTitle(":trophy: Top People who had the most Think Points :trophy:").addField(":first_place: Top 1", "<@" + config.topthinker + "> with " + thinkpointsone.row + " Think Points").addField(":second_place: Top 2", "<@" + config.topthinkertwo + "> with " + thinkpointstwo.row1 + " Think Points")
			.addField(":third_place: Top 3", "<@" + config.topthinkerthree + "> with " + thinkpointsthree.row2 + " Think Points"))







	}
	//message.channel.sendEmbed(new discord.RichEmbed().setTitle(":trophy: Top People who had the most Think Points :trophy:").addField(":first_place: Top 1", "<@" + config.topthinker + "> with " + topThinkerPoints.points + " Think Points").addField(":second_place: Top 2", "<@" + config.topthinkertwo + "> with " + topThinkerPointstwo.points + " Think Points")
	//.addField(":third_place: Top 3", "<@" + config.topthinkerthree + "> with " + topThinkerPointsthree.points + " Think Points"))



	if (command === "top10000people"){
    if(isBlacklisted(message.author.id)) return message.reply(config.blacklist_message)
		message.channel.sendEmbed(new discord.RichEmbed().setTitle(":trophy: Top People who had 10000 Think Points :trophy:").addField(":first_place: Top 1", "<@277074998894526464>, Achieved on 5/4/17 at 5:14 PM EST").addField(":second_place: Top 2", "<@217654917597364225>, Achieved on 5/4/17 at 7:32 PM EST")
		.addField(":third_place: Top 3", "NONE"))
  }

  if (command === "ping") {
		if(isBlacklisted(message.author.id)) return message.reply(config.blacklist_message)
		message.channel.sendEmbed(new discord.RichEmbed().setTitle(":ping_pong: Pong! " + bot.ping + " ms.").setColor(0x00FF00))
	}

	if (command === "suggestemoji"){
		let emojiname = args[0]
		let urllink = args.splice(1).join(' ');

		let emojivoting = bot.channels.find('name', 'emoji-voting');

		if (!args[0]){
			message.reply("Please use the following format:\n" + config.prefix + "suggestemoji `emoji` `Image URL`\n\nExample:\n" + config.prefix
		+ "suggestemoji :thinkinglull: https://cdn.discordapp.com/emojis/262068170968399872.png")
	} else {
		message.reply("Successfully suggsted " + emojiname + " Emoji! Please wait pacient while people vote.")
		//bot.channels.get('307991605879504898').sendMessage("<@308401252574691330>")
		bot.channels.get(emojivoting.id).sendMessage("@everyone " + emojiname + " Emoji By <@" + message.author.id + ">\n" + urllink)

		message.react("👍")
		message.react("👎")

}



}
/**
if (command === "removepoints"){
	if(isBlacklisted(message.author.id)) return message.reply(config.blacklist_message)
	if(!isOwner(message.author.id)) return message.reply("You do not have permission to use this command.")
	let userid = args[0]
	let pointstoremove = args.splice(1).join(' ');
	let removeThinkPoint = points[userid]


	if(!userid){
		message.reply("Please enter the following:\n" + config.prefix + "removepoints (userid) (points)\n\nExample: " + config.prefix + "removepoints 1234 1")
	} else {
		removeThinkPoint.points-pointstoremove;


	message.reply("Removed " + pointstoremove + " Think point(s)")

	fs.writeFile('./thinkpoints.json', JSON.stringify(points), (err) => {
		if (err) console.error(err)
	});
}
}
**/

if (command === "eval"){



	if(isBlacklisted(message.author.id)) return message.reply(config.blacklist_message);
	//if(!isAdmin(message.author.id)) return message.reply("This command is disabled until fire re-enables it.");
	if(!isOwner(message.author.id)) return message.reply("You do not have permission to use this command.")
	//if(message.author.id !== "126119057232625664") return;
	try {

		var code = args.join(" ");
		var evaled = eval(code);

		if (typeof evaled !== "string")
			evaled = require("util").inspect(evaled);
		//message.channel.sendMessage(":inbox_tray: **INPUT**\n")
		message.channel.sendEmbed(new discord.RichEmbed().addField("Javascript Eval:", "Success!").addField(":inbox_tray: **INPUT**", "```" + args.join(" ") + "```").addField(":outbox_tray: **OUTPUT**", "```" + clean(evaled) + "```"))
		//message.channel.sendCode("xl", args.join(" "));
		//message.channel.sendMessage(":outbox_tray: **OUTPUT**\n")

		//message.channel.sendCode("xl", clean(evaled));

	} catch (err){

		message.channel.sendEmbed(new discord.RichEmbed().addField("Javascript Eval ERROR:", "There was a problem with the code your trying to run!").addField("Error", "```" + clean(err) + "```"))
		//message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}
}

});

function clean(text) {
	if (typeof(text) === "string")
		return text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
}

function isAdmin(id) {
  return (admin_ids.indexOf(id) > -1);
}

function isOwner(id) {
  return (owner_ids.indexOf(id) > -1);
}

function isBlacklisted(id) {
  return (blacklistedids.indexOf(id) > -1);
}
