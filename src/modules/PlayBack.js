/*
  "PlayBack" Module:
    - handles playback for recorded notes.
*/

import Tone from "tone";
import util from "../util";


const PlayBack = {

  settings: {
    playButton: document.getElementById('play'),
    timeDisplay: document.getElementById('time'),
    notesPlayedLoop: []
  },

  init: function() {
    this.bindEvents();
    // this.handleTimer();
    // this.render()
  },

  bindEvents: function() {
    this.settings.playButton.addEventListener('click', this.handlePlayBack.bind(this));
  },

  getData: function(notesPlayedLoop) {
    notesPlayedLoop.forEach(recordedNote => {
      this.settings.notesPlayedLoop.push({
        note: recordedNote.note,
        time: recordedNote.time / 1000,
        duration: recordedNote.duration / 1000
      });
    });
  },

  handleTimer: function() {
    requestAnimationFrame(updateTime)
    this.settings.timeDisplay.textContent = Tone.now().toFixed(3); // This should be in render.
  },

  handlePlayBack: function() {



    let notesPlayedLoop = this.settings.notesPlayedLoop;
    let part = new Tone.Part((time, event) => {
      util.synth.triggerAttackRelease(event.note, event.duration, time)
    }, notesPlayedLoop);

    // [
    //   {note: 'C4', time: 0,  duration: 2},
    //   {note: 'C5', time: 3.563, duration: 2},
    //   {note: 'C6', time: 6, duration: 2},
    // ]);

    part.start(0);

    Tone.Transport.start('+0.1');

    // part.loop = 3;


    // var part = new Tone.Part((time, event) => {
    //   const durationInSeconds = event.duration/1000,
    //         timingInSeconds = event.timing/1000;
    //
    //   console.log('what');
    //   util.synth.triggerAttackRelease(event.note, durationInSeconds, timingInSeconds)
    // }, sampleData);
  },

  render: function() {}

};

export default PlayBack;


// const playButton = document.getElementById('play');

// function updateTime() {
// 	requestAnimationFrame(updateTime)
//   document.getElementById('time').textContent = Tone.now().toFixed(3);
// }
// updateTime()

// part.loop = 3;

// playButton.onclick = () => {
//
//   var part = new Tone.Part((time, event) => {
//     synth.triggerAttackRelease(event.note, event.duration, time)
//   }, [
//     {note: 'C4', time: 0,  duration: 2},
//     {note: 'C5', time: 3.563, duration: 2},
//     {note: 'C6', time: 6, duration: 2},
//   ]);
//
//   part.start(0);
//
//   Tone.Transport.start('+0.1');
//
//
//   // var part = new Tone.Part((time, event) => {
//   //   const durationInSeconds = event.duration/1000,
//   //         timingInSeconds = event.timing/1000;
//   //
//   //   console.log('what');
//   //   synth.triggerAttackRelease(event.note, durationInSeconds, timingInSeconds)
//   // }, sampleData);
// }


/*
How the playback will work:
- On pressing the playback button, it should start millis from 0 to 10 seconds.
- As millis runs, it compares it's current value to the timing of the logKey data.
- When timing === millis, trigger the synth.
- Add duration to that timing, and when millis reaches that sum it should turn that synth trigger off.

How to make the moving line for playback... (to be done later):
- svg 1000
- 1px width rectangle moving
- It needs to cover 1190 px in 10 seconds (10000ms)
- 1000 px / 10,000 ms
- 0.1 px/ms
- 1 px / 10 ms
- 100 px / 1 sec
- 8.40 ms/px
*/
