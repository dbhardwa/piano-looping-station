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



// // Default values for first and last note.
// var startNote = 'C4',
//     endNote = 'D7',
// 		pianoRange = [];
//
// // startRange and endRange <select> DOM Elements.
// var startRangeSelect = document.getElementById('startRange'),
//     endRangeSelect = document.getElementById('endRange');
//
// // Initializes the select range fields.
// setPianoRangeFields(startNote, endNote, startRangeSelect, endRangeSelect, musicalAlphabet);
//
// document.getElementById('startRange').addEventListener('change', (e) => {
//   startNote = e.target.value;
//   setPianoRangeFields(startNote, endNote, startRangeSelect, endRangeSelect, musicalAlphabet);
// 	pianoRange = createPianoRangeArray(startNote, endNote, musicalAlphabet);
// });
//
// document.getElementById('endRange').addEventListener('change', (e) => {
//   endNote = e.target.value;
//   setPianoRangeFields(startNote, endNote, startRangeSelect, endRangeSelect, musicalAlphabet);
// 	pianoRange = createPianoRangeArray(startNote, endNote, musicalAlphabet);
// });

// const musicalAlphabet = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const PianoApp = {
	musicalAlphabet: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
	// Default start and end notes.
	startNote: "C4",
	endNote: "C5",

	init: function() {
		this.loadNoteRanges();
		this.loadPiano();
		this.bindEvents();
	},

	updateRangesAndPiano: function() {
		this.loadNoteRanges();
		this.loadPiano();
	},

	bindEvents: function() {
		// Note range <select> options.
		document.getElementById('startRange').addEventListener('change', (e) => {
			this.startNote = e.target.value;
			this.updateRangesAndPiano();
		});

		document.getElementById('endRange').addEventListener('change', (e) => {
		  this.endNote = e.target.value;
			this.updateRangesAndPiano();
		});

		// Piano keys events for triggering and terminating sounds.
		document.getElementById('piano').addEventListener('mousedown', (e) => {
			if (e.target.id !== "piano") {
				synth.triggerAttack(e.target.id);
				console.log('Playing note: ' + e.target.id);
			}
		});

		document.getElementById('piano').addEventListener('mouseup', (e) => {
			// Needs another event to account for mouse leaving.
			if (e.target.id !== "piano") {
				synth.triggerRelease();
			}
		});

	},

	loadNoteRanges: function() {
		// startRange and endRange <select> DOM Elements.
		var startRangeSelect = document.getElementById('startRange'),
		    endRangeSelect = document.getElementById('endRange');

		setPianoRangeFields(this.startNote, this.endNote, startRangeSelect, endRangeSelect, this.musicalAlphabet);
	},

	loadPiano: function() {
		var pianoRange = [];

		// Builds the pianoRange array to capture all notes from the first to last.
		pianoRange = createPianoRangeArray(this.startNote, this.endNote, this.musicalAlphabet);
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
	}
}

PianoApp.init();


// var time = 0;
// setInterval(() => {
// 	time++;
// 	if (time === 5000) {
// 		console.log('5 sec is up');
// 	}
// }, 1);


var start = Date.now();
var millis;

setInterval(function() {
  millis = Date.now() - start;
  // console.log("ms elapsed = " + Math.floor(millis/1));
}, 1);



// class LoadNoteRanges {
// 	constructor() {
// 		if (!instance) {
// 			instance = this;
// 		}
//
// 		const musicalAlphabet = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
//
// 		// startRange and endRange <select> DOM Elements.
// 		var startRangeSelect = document.getElementById('startRange'),
// 		    endRangeSelect = document.getElementById('endRange');
//
// 		var startNote = 'C4',
// 		    endNote = 'D7',
// 				pianoRange = [];
//
// 		setPianoRangeFields(startNote, endNote, startRangeSelect, endRangeSelect, musicalAlphabet);
//
//
//
// 		this.mountPianoKeys(createPianoRangeArray(startNote, endNote, musicalAlphabet));
//
// 		return instance;
// 	}
//
// }
//
//
// // Builds the pianoRange array to capture all notes from the first to last.
// pianoRange = createPianoRangeArray(startNote, endNote, musicalAlphabet);
// console.log(pianoRange);
//
// var pianoKeys = ``;
//
// pianoRange.forEach((currentNote) => {
//   if (currentNote[1] === "#") {
//     pianoKeys += `<div class="blackKey pianoKeys" id="${currentNote}"></div> \n`;
//   } else {
//     pianoKeys += `<div class="whiteKey pianoKeys" id="${currentNote}"></div> \n`;
//   }
// });
//
// document.getElementById('piano').innerHTML = pianoKeys;
//
//
//
// document.getElementById('piano').addEventListener('mousedown', (e) => {
//   if (e.target.id !== "piano") {
//     synth.triggerAttack(e.target.id);
//     console.log('Playing note: ' + e.target.id);
//   }
// });
//
// document.getElementById('piano').addEventListener('mouseup', (e) => {
//   if (e.target.id !== "piano") {
//     synth.triggerRelease();
//   }
// });
//
//
//
//
//
// // function init() {
// // 	setPianoRangeFields(startNote, endNote, startRangeSelect, endRangeSelect, musicalAlphabet);
// // 	pianoRange = createPianoRangeArray(startNote, endNote, musicalAlphabet);
// // 	pianoRange.forEach((currentNote) => {
// // 	  if (currentNote[1] === "#") {
// // 	    pianoKeys += `<div class="blackKey pianoKeys" id="${currentNote}"></div> \n`;
// // 	  } else {
// // 	    pianoKeys += `<div class="whiteKey pianoKeys" id="${currentNote}"></div> \n`;
// // 	  }
// // 	});
// //
// // 	document.getElementById('piano').innerHTML = pianoKeys;
// // }
//
// class LoadPiano {
// 	constructor() {
// 		if (!instance) {
// 			instance = this;
// 		}
//
// 		const musicalAlphabet = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
//
// 		// startRange and endRange <select> DOM Elements.
// 		var startRangeSelect = document.getElementById('startRange'),
// 		    endRangeSelect = document.getElementById('endRange');
//
// 		this.mountPianoKeys(createPianoRangeArray(startNote, endNote, musicalAlphabet));
//
// 		return instance;
// 	}
//
// 	mountPianoKeys(pianoRange) {
// 		let pianoKeys = ``;
//
// 		pianoRange.forEach((currentNote) => {
// 			if (currentNote[1] === "#") {
// 				pianoKeys += `<div class="blackKey pianoKeys" id="${currentNote}"></div> \n`;
// 			} else {
// 				pianoKeys += `<div class="whiteKey pianoKeys" id="${currentNote}"></div> \n`;
// 			}
// 		});
//
// 		document.getElementById('piano').addEventListener('mousedown', (e) => {
// 		  if (e.target.id !== "piano") {
// 		    synth.triggerAttack(e.target.id);
// 		    console.log('Playing note: ' + e.target.id);
// 		  }
// 		});
//
// 		document.getElementById('piano').addEventListener('mouseup', (e) => {
// 		  if (e.target.id !== "piano") {
// 		    synth.triggerRelease();
// 		  }
// 		});
// 	}
// }


/*
TODO:
- We need both click and mousedown events to account for moving from one note to the next with the mouse button still held down.
- Need to add keyboard hotkeys for playing notes, using horizontal arrow keys to shift those hot keys...
- Continue modularizing.

MUCH LATER TODO:
- CSS for the piano needs fixing, needs to be responsive to smaller screens (need to decide how that will even work).
- Larger range for a desktop (tablet too) will need to allow horizontal scrolling of the keys to access others.
*/
