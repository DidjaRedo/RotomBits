"use strict";

let addEggByStartTime = {
    name: "Add Egg by Start Time",
    description: "!add <gym> [@|at] <time-of-day>",
    pattern: /^!add\s+(\w+(?:\s|\w)*)(?:\s+(?:@|at)\s*)(\d?\d):?(\d\d)\s*(a|A|am|AM|p|P|pm|PM)?$/,
    handleCommand: function (args) {
        // console.log("Add egg by start time: " + JSON.stringify(args));
        return {
            gym: args[1],
            hour: args[2],
            minutes: args[3],
            ampm: args[4],
        };
    },
};

let addEggByTimer = {
    name: "Add Egg by Timer",
    description: "!add <gym> [in] <time-span>",
    pattern: /^!add\s+(\w+(?:\s|\w)*)(?:\s+(?:in)\s*)(\d?\d)\s*?$/,
    handleCommand: function (args) {
        // console.log("Add egg by timer: " + JSON.stringify(args));
        return {
            gym: args[1],
            timer: args[2],
        };
    },
};

let addBossWithTimer = {
    name: "Add Raid Boss with Timer",
    description: "!add <mon> at <gym> <duration> left",
    pattern: /^!add\s*(\w+)\s*(?:at)\s*(\w+(?:\w|\s)*)(?:\s+(\d?\d)\s*(?:left))?\s*?$/,
    handleCommand: function (args) {
        // console.log("Add boss with timer: " + JSON.stringify(args));
        return {
            boss: args[1],
            gym: args[2],
            timer: args[3],
        };
    },
};

module.exports = {
    initCommands: function (processor) {
        processor.addCommand(addEggByStartTime);
        processor.addCommand(addEggByTimer);
        processor.addCommand(addBossWithTimer);
    },
};
