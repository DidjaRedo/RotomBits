const commando = require('discord.js-commando');
const cmdParser = require('discord-command-parser');
const { FlexTime } = require('botsbits');

const addEggByStartTimeRegex = /^!add\s+(?:L?([1-5])\s+)?(\w+(?:\s|\w)*)(?:\s+(?:@|at)\s*)((?:\d?\d):?(?:\d\d)\s*(?:a|A|am|AM|p|P|pm|PM)?)$/;
const addEggByTimerRegex = /^!add\s+(?:L?([1-5])\s+)?(\w+(?:\s|\w)*)(?:\s+(?:in)\s*)(\d?\d)\s*?$/;
const addBossWithTimerRegex = /^!add\s*(\w+)\s*(?:at)\s*(\w+(?:\w|\s)*)(?:\s+(\d?\d)\s*(?:left))?\s*?$/;

function getGym(client, location) {
    // Get closest result and add to raid list
    let searchResults = client.RaidsFuzzySearch.search(location);
    if (searchResults.length < 1)
    {
        client.ReportError(message, "!add", "no gym found matching search results");
        return undefined;
    }
    return searchResults[0];
}

//!add command
class raid extends commando.Command{
    constructor(client){
        super(client,{
            name: 'add',
            group: 'raids',
            memberName: 'add',
            description: 'add raid or boss to active raids list',
            examples: [
              '!add <pkmn> <location> <minute countdown> left',
              '!add ho-oh Luke McRedmond 30 left',
              '!add <location> (at|@) <time>',
              '!add wells fargo at 1012',
              '!add <location> in <minutes>',
              '!add library in 20'
            ]
        })
    }

    async run(message) {

        const client = message.client;
        const output = `Processing !add command submitted by user ${message.author}\n`;
        process.stdout.write(output);
        message.channel.send(output);

        if (message.channel.type.toString() == "dm")
        {
            client.ReportError(message, "!raid", "cannot add active raids via DMs.");
            return;
        }

        let processed = false;

        let match = message.content.match(addEggByStartTimeRegex);
        if (match != null) {
            const [, tierSpec, location, timeSpec] = match;
            const tier = tierSpec || 5;
            const time = new FlexTime(timeSpec);
            const delta = new FlexTime().getDeltaInMinutes(time);
            if (delta > 60) {
                client.ReportError(message, "!add", "That time is too far in the future.");
                return;
            }
            else if (delta < -2) {
                client.ReportError(message, "!add", "That time is too far in the past.");
                return;
            }
            
            // Get closest result and add to raid list
            let closestResult = getGym(client, location);
            if (!closestResult) {
                return;
            }

            client.RaidManager.addEggAbsolute(tier, closestResult.RaidLocation, time.toDate() );
            message.channel.send(client.RaidManager.listFormatted());
            return;
        }

        match = message.content.match(addEggByTimerRegex);
        if (match != null) {
            const [, tierSpec, location, timer] = match;
            const tier = tierSpec || 5;
            if ((timer < 1) || (timer > 60)) {
                client.ReportError(message, "!add", "Timer must be 1-60 minutes.");
                return;
            }

            let closestResult = getGym(client, location);
            if (!closestResult) {
                return;
            }

            client.RaidManager.addEggCountdown(tier, closestResult.RaidLocation, timer );
            message.channel.send(client.RaidManager.listFormatted());
            return;
        }

        client.ReportError(message, "!add", "My circuitzzz are tingling! I didn't understand that command...");
      }
}

module.exports = raid;
