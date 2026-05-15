import { ROLLS_JSON_KEY, INITIAL_ROLLS, ROLL_LEVEL_MAX, RESET_ROLLS_LEVEL } from './constants.js';
import { shuffle } from './utils.js';

window.Rolls = function () {
    return {
        isPlContent: true,
        isSpeak: true,
        resetRollsLevel: 0,
        rolls: {},

        init() {
            this.rolls = this._getRollsFromLocalStorage();
        },

        nextRoll() {
            this.isPlContent = true;
            this.rolls[0].level = 0;
            this.rolls.push(this.rolls.shift());
            this._setLocalStorageRolls();
        },

        passedRoll() {
            this.isPlContent = true;
            this.rolls[0].level++;
            this._advanceRoll();
            this._setLocalStorageRolls();
        },

        trySpeakCurrentRollEn() {
            if (this.isSpeak) {
                this.speakCurrentRollEn();
            }
        },

        rollPlContentClick() {
            this.resetRollsLevel = 0;
            this.isPlContent = false;
            this.trySpeakCurrentRollEn();
        },

        rollsLengthTextClick() {
            if (this.resetRollsLevel++ === RESET_ROLLS_LEVEL) {
                this.resetRolls();
            }
        },

        resetRolls() {
            localStorage.removeItem(ROLLS_JSON_KEY);
            this.init();
        },

        speakCurrentRollEn() {
            const text = this.rolls[0]?.en?.trim();
            responsiveVoice.speak(text, "US English Female", {
                rate: 0.8,
                pitch: 1,
                volume: 1
            });
        },

        _setLocalStorageRolls() {
            const rollsJson = JSON.stringify(this.rolls);
            localStorage.setItem(ROLLS_JSON_KEY, rollsJson);
        },

        _advanceRoll() {
            if (this.rolls[0].level >= ROLL_LEVEL_MAX) {
                this.rolls.shift()
            } else {
                this.rolls.push(this.rolls.shift());
            }
        },

        _getRollsFromLocalStorage() {
            const rollsJson = localStorage.getItem(ROLLS_JSON_KEY) ?? this._getStartRollsJson();
            const rolls = JSON.parse(rollsJson);
            return rolls;
        },

        _getStartRollsJson() {
            console.log('_getStartRollsJson()');
            const rolls = shuffle(INITIAL_ROLLS);
            return JSON.stringify(rolls);
        },

    };
};