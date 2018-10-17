import "./scss/main.scss";

import setPianoRangeFields from "./modules/setPianoRangeFields";
import renderPiano from "./modules/renderPiano";

import {
  handleKeyPress,
  handleRecord,
  handleKeyRelease
} from "./modules/events";


// Standard musical alphabet (C --> B).
const musicalAlphabet = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

let startNote = "C4";
let endNote = "C5";

const piano = document.getElementById('piano'),
			recordButton = document.getElementById('record'),
			startRangeSelect = document.getElementById('startRange'),
			endRangeSelect = document.getElementById('endRange');


const init = function() {
	updateRangesAndPiano();
	bindEvents();
}

const updateRangesAndPiano = function() {
	setPianoRangeFields(startNote, endNote, startRangeSelect, endRangeSelect, musicalAlphabet);
	renderPiano(startNote, endNote, musicalAlphabet);
}

const bindEvents = function() {
	// Note range <select> options.
	startRangeSelect.addEventListener('change', (e) => {
		startNote = e.target.value;
		updateRangesAndPiano();
	});
	endRangeSelect.addEventListener('change', (e) => {
	  endNote = e.target.value;
		updateRangesAndPiano();
	});

	// Piano keys events for triggering and terminating sounds.
	piano.addEventListener('mousedown', handleKeyPress);
	piano.addEventListener('mouseup', handleKeyRelease);

	recordButton.addEventListener('click', handleRecord);
}

init();





// function handleRecord() {
// 	recording = !recording;
//
// 	var start = Date.now(),
// 			millis = 0;
//
// 	let timer = setInterval(() => {
// 		millis = Date.now() - start;
// 		// console.log(millis);
// 		if (!recording || millis > 10000) {
// 			try {
// 				if (notesPlayed.length > 0)
// 					notesPlayedLoop = notesPlayed;
// 			} catch(e) {}
// 			clearInterval(timer);
// 			recording = false;
// 		}
// 	}, 1);
//
//
// 	if (recording) {
// 		recordButton.id = 'recording';
// 		recordButton.innerHTML = 'RECORDING';
//
// 		// Piano keys events for triggering and terminating sounds.
// 		piano.addEventListener('mousedown', (e) => recordKeying(e, millis));
//
// 	} else {
// 		recordButton.id = 'record';
// 		recordButton.innerHTML = 'RECORD';
//
// 		piano.removeEventListener('mousedown', recordKeying);
// 	}
//
// }


// function recordKeying(e, millis) {
// 	if (e.target.id !== "piano") {
// 		notesPlayed.push([millis, e.target.id]);
// 		console.log(notesPlayed);
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
