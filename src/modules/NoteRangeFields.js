/*
  "NoteRangeFields" Module:
    - initiates note ranges for selection fields.
    - updates selection fields and piano upon a selection change occuring.
*/

import { musicalAlphabet } from "../index";
import Piano from './Piano';


const NoteRangeFields = {

  settings: {
    startRangeSelect: document.getElementById('startRange'),
    endRangeSelect: document.getElementById('endRange'),
    noteRangeOptions: [],
    // octave: 0
    startNote: 'C4',
    endNote: 'B5'
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
      if (musicalAlphabet[i] === 'C')
        octave++;

      this.settings.noteRangeOptions.push(musicalAlphabet[i] + octave);

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
    // Starting note range.
    let disableRestOfOptions = false;
    for (let i = 0; i < this.settings.noteRangeOptions.length; i++) {

      if (this.settings.noteRangeOptions[i] === this.settings.startNote) {
        this.settings.startRangeSelect.innerHTML += `
          <option selected="selected" value="${this.settings.noteRangeOptions[i]}">
            ${this.settings.noteRangeOptions[i]}
          </option>`;

      } else if (this.settings.noteRangeOptions[i] === this.settings.endNote || disableRestOfOptions) {
        this.settings.startRangeSelect.innerHTML += `
          <option disabled value="${this.settings.noteRangeOptions[i]}">
            ${this.settings.noteRangeOptions[i]}
          </option>`;
        disableRestOfOptions = true;

      } else {
        this.settings.startRangeSelect.innerHTML += `
          <option value="${this.settings.noteRangeOptions[i]}">
            ${this.settings.noteRangeOptions[i]}
          </option>`;
      }
    }

    // Ending note range.
    let enableRestOfOptions = false;
    for (let i = 0; i < this.settings.noteRangeOptions.length; i++) {

      if (this.settings.noteRangeOptions[i] === this.settings.endNote) {
        this.settings.endRangeSelect.innerHTML += `
          <option selected="selected" value="${this.settings.noteRangeOptions[i]}">
            ${this.settings.noteRangeOptions[i]}
          </option>`;

      } else if (enableRestOfOptions) {
        this.settings.endRangeSelect.innerHTML += `
          <option value="${this.settings.noteRangeOptions[i]}">
            ${this.settings.noteRangeOptions[i]}
          </option>`;

      } else {
        this.settings.endRangeSelect.innerHTML += `
          <option disabled value="${this.settings.noteRangeOptions[i]}">
            ${this.settings.noteRangeOptions[i]}
          </option>`;
        if (this.settings.noteRangeOptions[i] === this.settings.startNote)
          enableRestOfOptions = true;
      }
    }
  }

};

export default NoteRangeFields;


// export default function setPianoRangeFields(startNote, endNote) {
//   startRangeSelect.innerHTML = '';
//   endRangeSelect.innerHTML = '';
//
//   let musicalNoteOptions = [],
//       octave = 0;
//
//   // Creates array of musical note options for desired range.
//   for (let i = 5; i < 7; i++) {
//     // Increment octave everytime 'C' is reached.
//     if (musicalAlphabet[i] === 'C')
//       octave++;
//
//     musicalNoteOptions.push(musicalAlphabet[i] + octave);
//
//     // Stop at C8.
//     if (octave === 8)
//       break;
//
//     // Reset the array index to continue for looping.
//     if (i === 6)
//       i = -1;
//   }
//
//   // Starting note range.
//   let disableRestOfOptions = false;
//   for (let i = 0; i < this.settings.musicalNoteOptions.length; i++) {
//     if (this.settings.musicalNoteOptions[i] === startNote) {
//       this.settings.startRangeSelect.innerHTML += `<option selected="selected" value="${this.settings.musicalNoteOptions[i]}">${this.settings.musicalNoteOptions[i]}</option>`;
//     } else if (this.settings.musicalNoteOptions[i] === endNote || disableRestOfOptions) {
//       this.settings.startRangeSelect.innerHTML += `<option disabled value="${this.settings.musicalNoteOptions[i]}">${this.settings.musicalNoteOptions[i]}</option>`;
//       disableRestOfOptions = true;
//     } else {
//       this.settings.startRangeSelect.innerHTML += `<option value="${this.settings.musicalNoteOptions[i]}">${this.settings.musicalNoteOptions[i]}</option>`;
//     }
//   }
//
//   // Ending note range.
//   let enableRestOfOptions = false;
//   for (let i = 0; i < this.settings.musicalNoteOptions.length; i++) {
//     if (this.settings.musicalNoteOptions[i] === endNote) {
//       endRangeSelect.innerHTML += `<option selected="selected" value="${this.settings.musicalNoteOptions[i]}">${this.settings.musicalNoteOptions[i]}</option>`;
//     } else if (enableRestOfOptions) {
//       endRangeSelect.innerHTML += `<option value="${this.settings.musicalNoteOptions[i]}">${this.settings.musicalNoteOptions[i]}</option>`;
//     } else {
//       endRangeSelect.innerHTML += `<option disabled value="${this.settings.musicalNoteOptions[i]}">${this.settings.musicalNoteOptions[i]}</option>`;
//       if (this.settings.musicalNoteOptions[i] === startNote)
//         enableRestOfOptions = true;
//     }
//   }
// }
