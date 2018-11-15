/*
  "NoteRangeFields" Module:
    - initiates note ranges for selection fields.
    - updates selection fields and Piano upon a selection change occuring.
*/

import Piano from './Piano';


const NoteRangeFields = {
  settings: {
    startRangeSelect: document.getElementById('startRange'),
    endRangeSelect: document.getElementById('endRange'),
    musicalAlphabet: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    noteRangeOptions: [],
    startNote: 'C4',
    endNote: 'B6'
  },

  init: function() {
    this.setNoteRangeOptions();
    this.bindEvents();

    Piano.init(this.settings.startNote, this.settings.endNote);
  },

  // Creates array of musical note options for desired range.
  setNoteRangeOptions: function() {
    let octave = 0;

    for (let i = 5; i < 7; i++) {
      // Increment octave everytime 'C' is reached.
      if (this.settings.musicalAlphabet[i] === 'C')
        octave++;

      this.settings.noteRangeOptions.push(this.settings.musicalAlphabet[i] + octave);

      // Stop at C8.
      if (octave === 8)
        break;

      // Reset the array index to continue for looping.
      if (i === 6)
        i = -1;
    }

    this.render();
  },

  bindEvents: function() {
    // Note range <select> options.
    this.settings.startRangeSelect.addEventListener('change', function(e) {
    	this.settings.startNote = e.target.value;
      this.render();

      // Updates the piano with appropriate note range.
      Piano.init(this.settings.startNote, this.settings.endNote);
    }.bind(this));

    this.settings.endRangeSelect.addEventListener('change', function(e) {
      this.settings.endNote = e.target.value;
      this.render();

      // Updates the piano with appropriate note range.
      Piano.init(this.settings.startNote, this.settings.endNote);
    }.bind(this));
  },

  render: function() {
    let startNoteRangeOptionsHTML = ``,
        endNoteRangeOptionsHTML = ``;

    // Starting note range.
    let disableRestOfOptions = false;

    this.settings.noteRangeOptions.forEach(note => {
      if (note === this.settings.startNote) {
        startNoteRangeOptionsHTML += `
          <option selected="selected" value="${note}">${note}</option> \n`;

      } else if (note === this.settings.endNote || disableRestOfOptions) {
        startNoteRangeOptionsHTML += `
          <option disabled value="${note}">${note}</option> \n`;
        disableRestOfOptions = true;

      } else {
        startNoteRangeOptionsHTML += `
          <option value="${note}">${note}</option> \n`;
      }
    })

    // Ending note range.
    let enableRestOfOptions = false;

    this.settings.noteRangeOptions.forEach(note => {
      if (note === this.settings.endNote) {
        endNoteRangeOptionsHTML += `
          <option selected="selected" value="${note}">${note}</option> \n`;

      } else if (enableRestOfOptions) {
        endNoteRangeOptionsHTML += `
          <option value="${note}">${note}</option> \n`;

      } else {
        endNoteRangeOptionsHTML += `
          <option disabled value="${note}">${note}</option> \n`;
        if (note === this.settings.startNote)
          enableRestOfOptions = true;
      }
    });

    this.settings.startRangeSelect.innerHTML = startNoteRangeOptionsHTML;
    this.settings.endRangeSelect.innerHTML = endNoteRangeOptionsHTML;
  }

};

export default NoteRangeFields;
