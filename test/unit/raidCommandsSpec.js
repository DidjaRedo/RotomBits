"use strict";

const CommandProcessor = require("botsbits/lib/commandProcessor");
const RaidCommands = require("../../lib/raidCommands.js");

const eggByStartTimeStrings = [
    "!add some gym at 11:30 pm",
    "!add some gym at 10:30 am",
    "!add some gym at 9:30",
    "!add some gym at somewhere at 130",
    "!add some other gym at 1410",
    "!add some gym in some town at 130p",
    "!add some gym @ 1030",
];

const eggByTimerStrings = [
    "!add some gym in 20",
    "!add some gym in some town in 20",
];

const bossWithTimerStrings = [
    "!add ttar at some gym 20 left",
    "!add ttar at some gym",
    "!add pidgey at some gym 1 left",
];

describe("raidCommands", () => {
    let cmds = new CommandProcessor();
    RaidCommands.initCommands(cmds);

    describe("egg by start time strings", () => {
        it("should recognize all valid strings", () => {
            eggByStartTimeStrings.forEach((s) => {
                let match = cmds.processAll(s);
                expect(match).toBeDefined();
                expect(match.length).toBe(1);
            });
        });
    });

    describe("egg by timer strings", () => {
        it("should recognize all valid strings", () => {
            eggByTimerStrings.forEach((s) => {
                let match = cmds.processAll(s);
                expect(match).toBeDefined();
                expect(match.length).toBe(1);
            });
        });
    });

    describe("boss with timer strings", () => {
        it("should recognize all valid strings", () => {
            bossWithTimerStrings.forEach((s) => {
                let match = cmds.processAll(s);
                expect(match).toBeDefined();
                expect(match.length).toBe(1);
            });
        });
    });
});
