/*
  "Piano" Module:
    - lorem ipsum
*/

import createPianoRangeArray from "./createPianoRangeArray";
import {
  handleKeyPress,
  handleRecord,
  handleKeyRelease,
  notesPlayedLoop
} from "./events";


const Piano = {

  settings: {
    pianoRange: [],
		piano: document.getElementById('piano')
  },

  init: function(startNote, endNote) {
    this.settings.pianoRange = createPianoRangeArray(startNote, endNote);
		this.render();
		this.bindEvents();
  },

  bindEvents: function() {
		let mousedown = false;

		this.settings.piano.onmousedown = (e) => {
			mousedown = true;
			e.target.classList.add('active');
			handleKeyPress(e.target.id);
		};

		document.body.onmouseup = () => { mousedown = false; }

		this.settings.piano.onmouseup = (e) => {
			e.target.classList.remove('active');
			handleKeyRelease(e);
		}


		const pianoKeys = Array.from(document.getElementsByClassName('pianoKeys'));

		pianoKeys.forEach(pianoKey => {
			pianoKey.onmouseleave = (e) => {
				if (e.target.classList.contains('active')) {
					e.target.classList.remove('active');
					handleKeyRelease(e);
				}

				if (e.toElement && e.toElement.classList.contains('pianoKeys') && mousedown) {
					e.toElement.classList.add('active');
					handleKeyPress(e.toElement.id);
				}
			};
		});



	},

  render: function() {
		let pianoKeys = ``;

    this.settings.pianoRange.forEach(currentNote => {
      if (currentNote[1] === "#")
        pianoKeys += `<div class="blackKey pianoKeys" id="${currentNote}"></div> \n`;
      else
        pianoKeys += `<div class="whiteKey pianoKeys" id="${currentNote}"></div> \n`;
    });

		this.settings.piano.innerHTML = pianoKeys;
  }

}

export default Piano;
