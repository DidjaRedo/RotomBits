"use strict";

let FlexTime = require("botsbits/lib/flexTime");

let addEggByStartTime = {
    name: "Add Egg by Start Time",
    description: "!add <gym> [@|at] <time-of-day>",
    pattern: /^!add\s+(\w+(?:\s|\w)*)(?:\s+(?:@|at)\s*)((?:\d?\d):?(?:\d\d)\s*(?:a|A|am|AM|p|P|pm|PM)?)$/,
    handleCommand: function (args) {
        return {
            gym: args[1],
            time: new FlexTime(args[2]),
        };
    },
};

let addEggByTimer = {
    name: "Add Egg by Timer",
    description: "!add <gym> [in] <time-span>",
    pattern: /^!add\s+(\w+(?:\s|\w)*)(?:\s+(?:in)\s*)(\d?\d)\s*?$/,
    handleCommand: function (args) {
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
