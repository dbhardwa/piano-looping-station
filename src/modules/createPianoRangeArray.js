/*

  "createPianoRangeArray" function definition:

  Parameters:
    - startNote: Starting note for beginning of array (Type: String).
    - endNote: Ending note for end of array (Type: String).
    - musicalAlphabet: Standard musical alphabet from C --> B (Type: Array).

  Purpose:
    - Returns a pianoRange array which holds all notes (white and black) within the desired note range.

*/

export default function setPianoRangeSelectFields(startNote, endNote, musicalAlphabet) {
  var pianoRange = [startNote],
      lastIndex,
      currentNote, // This is the current note in the array (i.e. C#4, C4).
      currentOctave = startNote[1], // This is the current letter (i.e. C).
      currentLetter,
      updatedNote = '',
      updatedLetter = '';

  while (true) {
    lastIndex = pianoRange.length - 1;

    if (pianoRange[lastIndex] === endNote) {
      break;
    } else {
      currentNote = pianoRange[lastIndex];
      currentLetter = currentNote[0];

      // Finding the next letter (and octave).
      for (const [index, letter] of musicalAlphabet.entries()) {
        if (currentLetter === letter) {
          // Case for entering a new octave and starting back at C.
          if (currentLetter === 'B') {
            updatedLetter = 'C';
            currentOctave++;
          // Else, just shift to next letter, stay on the octave.
          } else {
            updatedLetter = musicalAlphabet[index + 1];
          }
          break;
        }
      }

      // Accounting for non-sharp notes.
      if (currentLetter !== 'E' && currentLetter !== 'B' && currentNote[1] !== "#") {
        updatedNote = currentLetter + '#' + currentOctave;
      } else {
        updatedNote = updatedLetter + currentOctave;
      }

      pianoRange.push(updatedNote);
    }
  }

  return pianoRange;
}
