/*
  "Recording" Module:
    - handles logging of keys pressed based on note, time, and duration when recording state is active.
*/

import MIDIVisualizer from "./MIDIVisualizer";
import PlayBack from "./PlayBack";

const Recording = {

  settings: {
    recordButton: document.getElementById('record'),
    recordIcon: document.querySelector('#record svg'),

    // notesPlayedLoopButton = document.getElementById('notesPlayedLoop');

    isRecording: false,
    notesPlayedLoop: [],
    millis: 0,

    time: 0,

    // Edge case variables
    note: '',
    mousedown: false
  },

  init: function() {
    this.bindEvents();
    this.handleRecord.bind(this);
  },

  bindEvents: function() {
    this.settings.recordButton.addEventListener('click', this.handleRecord.bind(this));
	},

  handleRecord: function() {
  	this.settings.isRecording = !this.settings.isRecording;

  	if (this.settings.isRecording) {
  		this.settings.notesPlayedLoop = [];
  		this.settings.recordIcon.classList.add('blinking');
  	}

  	let start = Date.now();

  	let timer = setInterval(() => {
  		// Gives time (ms) since the record button was pressed.
  		this.settings.millis = Date.now() - start;
    
  		// if (this.settings.millis % 1000 === 0) {}
      // console.log(this.settings.millis);

  		if (!this.settings.isRecording || this.settings.millis > 10000) {
  			clearInterval(timer);
  			this.settings.isRecording = false;
  			this.settings.recordIcon.classList.remove('blinking');
        this.handleNotesPlayedLoop();
  		}
  	}, 1);
  },

  startTime: function() {
    if (this.settings.isRecording)
      this.settings.time = this.settings.millis;
  },

  endTime: function(e) {
    if (this.settings.isRecording) {
      let duration = this.settings.millis - this.settings.time;
      this.logKey(e.target.id, this.settings.time, duration);
    }
  },

  logKey: function(note, time, duration) {
    this.settings.notesPlayedLoop.push({
      note,
      time,
      duration
    });
  },

  handleNotesPlayedLoop: function() {
    // console.log(this.settings.notesPlayedLoop);

    MIDIVisualizer.getData(this.settings.notesPlayedLoop);
    PlayBack.getData(this.settings.notesPlayedLoop)
  },

  render: function() {}
}

export default Recording;
