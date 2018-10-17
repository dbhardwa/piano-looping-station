import createPianoRangeArray from "./createPianoRangeArray";

export default function renderPiano(startNote, endNote, musicalAlphabet) {
	// Builds the pianoRange array to capture all notes from the first to last.
	let pianoRange = createPianoRangeArray(startNote, endNote, musicalAlphabet),
			pianoKeys = ``;

	pianoRange.forEach((currentNote) => {
	  if (currentNote[1] === "#")
	    pianoKeys += `<div class="blackKey pianoKeys" id="${currentNote}"></div> \n`;
	  else
	    pianoKeys += `<div class="whiteKey pianoKeys" id="${currentNote}"></div> \n`;
	});

	piano.innerHTML = pianoKeys;
}
