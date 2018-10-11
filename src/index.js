import "./scss/main.scss";
import Tone from "tone";

import setPianoRangeFields from "./modules/setPianoRangeFields";
import createPianoRangeArray from "./modules/createPianoRangeArray";

// Standard musical alphabet (C --> B).
const musicalAlphabet = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// var synth = new Tone.Synth().toMaster();
var synth = new Tone.Synth({
			"oscillator" : {
				"type" : "amtriangle",
				"harmonicity" : 0.5,
				"modulationType" : "sine"
			},
			"envelope" : {
				"attackCurve" : 'exponential',
				"attack" : 0.05,
				"decay" : 0.2,
				"sustain" : 0.2,
				"release" : 1.5,
			},
			"portamento" : 0.05
}).toMaster();



// Default values for first and last note.
var startNote = 'C4',
    endNote = 'D7';

// startRange and endRange <select> DOM Elements.
var startRangeSelect = document.getElementById('startRange'),
    endRangeSelect = document.getElementById('endRange');

// Initializes the select range fields.
setPianoRangeFields(startNote, endNote, startRangeSelect, endRangeSelect, musicalAlphabet);

document.getElementById('startRange').addEventListener('change', (e) => {
  startNote = e.target.value;
  setPianoRangeFields(startNote, endNote, startRangeSelect, endRangeSelect, musicalAlphabet);
});

document.getElementById('endRange').addEventListener('change', (e) => {
  endNote = e.target.value;
  setPianoRangeFields(startNote, endNote, startRangeSelect, endRangeSelect, musicalAlphabet);
});


// NEXT THING TODO: SET THE RUN THE FUNCTION THAT RESETS THE PIANO RANGE KEYS SO IT BECOMES RESPONSIVE.\

// Builds the pianoRange array to capture all notes from the first to last.
var pianoRange = createPianoRangeArray(startNote, endNote, musicalAlphabet);
console.log(pianoRange);

var pianoKeys = ``;

pianoRange.forEach((currentNote) => {
  if (currentNote[1] === "#") {
    pianoKeys += `<div class="blackKey pianoKeys" id="${currentNote}"></div> \n`;
  } else {
    pianoKeys += `<div class="whiteKey pianoKeys" id="${currentNote}"></div> \n`;
  }
});

document.getElementById('piano').innerHTML = pianoKeys;



document.getElementById('piano').addEventListener('mousedown', (e) => {
  if (e.target.id !== "piano") {
    synth.triggerAttack(e.target.id);
    console.log('Playing note: ' + e.target.id);
  }
});

document.getElementById('piano').addEventListener('mouseup', (e) => {
  if (e.target.id !== "piano") {
    synth.triggerRelease();
  }
});








/*
TODO:
- We need both click and mousedown events to account for moving from one note to the next with the mouse button still held down.
- Need to add keyboard hotkeys for playing notes, using horizontal arrow keys to shift those hot keys...
- Continue modularizing.

MUCH LATER TODO:
- CSS for the piano needs fixing, needs to be responsive to smaller screens (need to decide how that will even work).
- Larger range for a desktop (tablet too) will need to allow horizontal scrolling of the keys to access others.
*/
