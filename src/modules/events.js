import Tone from "tone";
import * as d3 from "d3";

const recordButton = document.getElementById('record');
let keyLapseTime = 0;
let mouseDownStartTime = 0;
let recording = false;
let notesPlayedLoop = [];
let timing = 0;

const synth = new Tone.Synth({
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


let millis = 0;

const recordIcon = document.querySelector('#record svg');

const handleRecord = function() {
	recording = !recording;

	if (recording) {
		notesPlayedLoop = [];
		recordIcon.classList.add('blinking');
	}

	let start = Date.now();
			// millis = 0;

	let timer = setInterval(() => {
		// Gives time (ms) since the record button was pressed.
		millis = Date.now() - start;
  
		if (millis % 1000 === 0) {}

		if (!recording || millis > 10000) {
			clearInterval(timer);
			recording = false;
			recordIcon.classList.remove('blinking');
			console.log(notesPlayedLoop);
		}
	}, 1);

	// piano.addEventListener('mousedown', (e) => {
	// 	timing = millis;
	// });
}

const handleKeyPress = function(keyPressed) {
	if (keyPressed !== "piano") {
		synth.triggerAttack(keyPressed);
		// console.log('Playing note: ' + keyPressed);

		if (recording) {
			// Sets time when key was pressed for recording.
			timing = millis;
			mouseDownStartTime = Date.now();
		}
	}
}

const handleKeyRelease = function(e) {
	// Needs another event to account for mouse leaving.
	if (e.target.id !== "piano") {
		synth.triggerRelease();

		if (recording) {
		  let duration = Date.now() - mouseDownStartTime;
			logKey(e.target.id, timing, duration)
		}
	}
}

const logKey = (note, timing, duration) => {
	notesPlayedLoop.push({
		note,
		timing,
		duration
	});
}


export {
  handleKeyPress,
  handleRecord,
  handleKeyRelease,
	notesPlayedLoop
}
