import "./scss/main.scss";

import NoteRangeFields from "./modules/NoteRangeFields";
import Recording from "./modules/Recording";
import MIDIVisualizer from "./modules/MIDIVisualizer";
import PlayBack from "./modules/PlayBack";


// Key-binding hotkey variables.
const whiteHotKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''];
const blackHotKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '['];

// Initializes modules.
const init = function() {
  NoteRangeFields.init(/* startNote, endNote */);
  Recording.init();
  MIDIVisualizer.init();
  PlayBack.init();
}

init();
