/*

  "setPianoRangeFields" function definition:

  Parameters:
    - startNote: Starting note to set as active option and indicate highlighting (Type: String).
    - endNote: Ending note to set as active option and indicate highlighting (Type: String).
    - startRangeSelect: DOM Element for <select> tag with id="startRange" (Type: DOM Element).
    - endRangeSelect: DOM Element for <select> tag with id="endRange" (Type: DOM Element).
    - musicalAlphabet: Standard musical alphabet from C --> B (Type: Array).

  Purpose:
    - Gets standard list of musical note options and updates the two select options with valid ranges to set the piano notes.

*/

export default function setPianoRangeFields(startNote, endNote, startRangeSelect, endRangeSelect, musicalAlphabet) {
  var musicalNoteOptions = [],
      octave = 0;

  // Creates array of musical note options for desired range.
  for (let i = 5; i < 7; i++) {
    // Increment octave everytime 'C' is reached.
    if (musicalAlphabet[i] === 'C')
      octave++;

    musicalNoteOptions.push(musicalAlphabet[i] + octave);

    // Stop at C8.
    if (octave === 8)
      break;

    // Reset the array index to continue for looping.
    if (i === 6)
      i = -1;
  }

  let afterStartNoteFlag = false;

  for (let i = 0; i < musicalNoteOptions.length; i++) {
    if (musicalNoteOptions[i] === endNote) {
      endRangeSelect.innerHTML += `<option selected="selected" value="${musicalNoteOptions[i]}">${musicalNoteOptions[i]}</option>`;
      for (let j = ++i; j < musicalNoteOptions.length; j++) {
        startRangeSelect.innerHTML += `<option disabled value="${musicalNoteOptions[j]}">${musicalNoteOptions[j]}</option>`;
      }
    }

    if (afterStartNoteFlag === true) {
      endRangeSelect.innerHTML += `<option value="${musicalNoteOptions[i]}">${musicalNoteOptions[i]}</option>`;
      continue;
    } else if (musicalNoteOptions[i] === startNote) {
      startRangeSelect.innerHTML += `<option selected="selected" value="${musicalNoteOptions[i]}">${musicalNoteOptions[i]}</option>`;
      afterStartNoteFlag = true;
      continue;
    } else {
      startRangeSelect.innerHTML += `<option value="${musicalNoteOptions[i]}">${musicalNoteOptions[i]}</option>`;
    }

    endRangeSelect.innerHTML += `<option disabled value="${musicalNoteOptions[i]}">${musicalNoteOptions[i]}</option>`;
  }
}
