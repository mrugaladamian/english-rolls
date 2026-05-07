import { INITIAL_ROLLS } from './constants.js';
import { shuffle } from './utils.js';

window.initializeRolls = function () {
    setLocalStorageStartRolls(); // tylko do debug 
    const rolls = localStorage.getItem('rolls');
    window.rolls = JSON.parse(rolls);
    this.rolls = JSON.parse(rolls);
    console.log(window.rolls);
    executeIfRolls();
}

window.passedButton = function() {
    this.showEnglish = false;
    window.rolls.shift();
    this.rolls.shift();
    // console.log(window.rolls[0]);
    console.log(rolls[0]);
}

function executeIfRolls() {
    if (rolls) {
    } else {
        setLocalStorageStartRolls();
    }
}

function setLocalStorageStartRolls() {
    const startRollsJson = JSON.stringify(getStartRolls());
    localStorage.setItem('rolls', startRollsJson);
}

function getStartRolls() {
    return shuffle(INITIAL_ROLLS);
}

