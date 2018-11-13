/*
  "Piano" Module:
    - creates piano and attaches appropriate events to produce sound.
		- imports Recording for when recording state is active.
*/

import Recording from './Recording';
import util from "../util";


const Piano = {

  settings: {
    piano: document.getElementById('piano'),
    pianoRange: [],
    mousedown: false
  },

  init: function(startNote, endNote) {
    this.settings.pianoRange = util.createPianoRangeArray(startNote, endNote);
		this.render();
		this.bindEvents();
  },

  bindEvents: function() {
    document.body.onmouseup = () => { this.settings.mousedown = false };
    piano.onmousedown = () => { this.settings.mousedown = true };

    this.settings.piano.addEventListener('mousedown', (e) => this.handleKeyPress(e.target));
		this.settings.piano.addEventListener('mouseup', this.handleKeyRelease);

		let pianoKeys = Array.from(document.getElementsByClassName('pianoKeys'));

		pianoKeys.forEach(pianoKey => {
			pianoKey.onmouseleave = (e) => {
				if (e.target.classList.contains('active')) {
					e.target.classList.remove('active');
					this.handleKeyRelease(e);
				}

				if (e.toElement && e.toElement.classList.contains('pianoKeys') && this.settings.mousedown)
					this.handleKeyPress(e.toElement);
			};
		});
	},

  handleKeyPress: function(target) {
    target.classList.add('active');
		util.synth.triggerAttack(target.id);

    Recording.startTime();
  },

  handleKeyRelease: function(e) {
    e.target.classList.remove('active');
		util.synth.triggerRelease();

    Recording.endTime(e);
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
