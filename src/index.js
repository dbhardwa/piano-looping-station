import "./scss/main.scss";
import Tone from "tone";
import * as d3 from 'd3';

import NoteRangeFields from "./modules/NoteRangeFields";
import createPianoRangeArray from "./modules/createPianoRangeArray";
import renderPiano from "./modules/renderPiano";
import {
  handleKeyPress,
  handleRecord,
  handleKeyRelease,
  notesPlayedLoop
} from "./modules/events";


export {
  musicalAlphabet
}



const synth = new Tone.Synth({
			"oscillator" : {
				"type" : "amtriangle",
				"harmonicity" : 0.5,
				"modulationType" : "sine"
			},
			"envelope" : {
				"attackCurve" : 'exponential',
				"attack" : 0.05,
				"decay" : 0.2,
				"sustain" : 0.2,
				"release" : 1.5,
			},
			"portamento" : 0.05
}).toMaster();


// synth.triggerAttackRelease('C4', 0.5, 1);
// synth.triggerAttackRelease('E4', 0.5, 2);
// synth.triggerAttackRelease('G4', 0.5, 3);
// synth.triggerAttackRelease('B4', 0.5, 4);





// Standard musical alphabet (C --> B).
const musicalAlphabet = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const whiteHotKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''];
const blackHotKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '['];

let startNote = 'C4',
    endNote = 'B5';

const piano = document.getElementById('piano'),
			recordButton = document.getElementById('record'),
      notesPlayedLoopButton = document.getElementById('notesPlayedLoop');


// const init = function() {
// 	updateRangesAndPiano();
// 	bindEvents();
// }

const init = function() {
  NoteRangeFields.init();
  bindEvents();
}

// const updateRangesAndPiano = function() {
// 	NoteRangeFields.init();
// 	renderPiano(startNote, endNote)
// }

const bindEvents = function() {
	// Note range <select> options.
	// startRangeSelect.addEventListener('change', (e) => {
	// 	startNote = e.target.value;
	// 	updateRangesAndPiano();
	// });
  //
	// endRangeSelect.addEventListener('change', (e) => {
	//   endNote = e.target.value;
	// 	updateRangesAndPiano();
	// });


  // let mousedown = false;
  //
  // piano.onmousedown = (e) => {
  //   mousedown = true;
  //   e.target.classList.add('active');
  //   handleKeyPress(e.target.id);
  // };
  //
  // document.body.onmouseup = () => {
  //   mousedown = false;
  //   // console.log(mousedown);
  // }
  //
  // piano.onmouseup = (e) => {
  //   e.target.classList.remove('active');
  //   handleKeyRelease(e);
  // }


  // Hard coded for testing key bindings.
  // document.body.addEventListener('keypress', (e) => {
  //   console.log(e);
  //   if (e.key === 'a') {
  //     handleKeyPress('C4');
  //
  //   }
  //   if (e.key === 'b') {
  //     handleKeyPress('D4');
  //   }
  // });






	// Piano keys events for triggering and terminating sounds.
	// piano.addEventListener('mousedown', e => {
  //   e.target.classList.add('active');
  //   handleKeyPress(e.target.id);
  // });
  //
  // piano.addEventListener('mouseup', e => {
  //   e.target.classList.remove('active');
  //   handleKeyRelease(e);
  // });


  // const pianoKeys = Array.from(document.getElementsByClassName('pianoKeys'));
  //
  // pianoKeys.forEach(pianoKey => {
  //   pianoKey.onmouseleave = (e) => {
  //     if (e.target.classList.contains('active')) {
  //       e.target.classList.remove('active');
  //       handleKeyRelease(e);
  //     }
  //
  //     if (e.toElement && e.toElement.classList.contains('pianoKeys') && mousedown) {
  //       e.toElement.classList.add('active');
  //       handleKeyPress(e.toElement.id);
  //     }
  //   };
  // });



  // piano.addEventListener('mouseleave', () => {console.log('test')});

	recordButton.addEventListener('click', handleRecord);
  // notesPlayedLoopButton.addEventListener('click', () => {console.log(notesPlayedLoop)});

}

init();


// console.log(d3.drag());

/*

How to make the moving line for playback... (to be done later)
svg 1000
1px width rectangle moving
It needs to cover 1190 px in 10 seconds (10000ms)

1000 px / 10,000 ms

0.1 px/ms
1 px / 10 ms

100 px / 1 sec

8.40 ms/px

*/


// notesPlayedLoop
const playButton = document.getElementById('play');
let millis = 0;


// document.getElementById('time').textContent = Tone.now().toFixed(3);


function updateTime() {
	requestAnimationFrame(updateTime)
	// document.querySelector('span').textContent = Tone.now().toFixed(3)
  document.getElementById('time').textContent = Tone.now().toFixed(3);
}
// updateTime()

// part.loop = 3;

playButton.onclick = () => {

  var part = new Tone.Part((time, event) => {
    synth.triggerAttackRelease(event.note, event.duration, time)
  }, [
    {note: 'C4', time: 0,  duration: 2},
    {note: 'C5', time: 3.563, duration: 2},
    {note: 'C6', time: 6, duration: 2},
  ]);

  part.start(0);

  Tone.Transport.start('+0.1');





  // var part = new Tone.Part((time, event) => {
  //   const durationInSeconds = event.duration/1000,
  //         timingInSeconds = event.timing/1000;
  //
  //   console.log('what');
  //   synth.triggerAttackRelease(event.note, durationInSeconds, timingInSeconds)
  // }, sampleData);



  // var synth = new Tone.FMSynth().toMaster();

  // synth.triggerAttackRelease('C4', 0.5, 0);
  // synth.triggerAttackRelease('E4', 0.5, 1);
  // synth.triggerAttackRelease('G4', 0.5, 2);
  // synth.triggerAttackRelease('B4', 0.5, 3);

  // sampleData.forEach(logKey => {
  //   console.log(logKey);
  //   const durationInSeconds = logKey.duration/1000,
  //         timingInSeconds = logKey.timing/1000;
  //
  //   synth.triggerAttackRelease(logKey.note, durationInSeconds, timingInSeconds);
  // });
}
  // let start = Date.now();
  // //
  // let timer = setInterval(() => {
	// 	// Gives time (ms) since the record button was pressed.
	// 	millis = Date.now() - start;
  //   // console.log(millis);
  //
	// 	// if (millis > 10000) {
	// 	// 	clearInterval(timer);
	// 	// }
  //
  //   // let i = 0;
  //   //
  //   // console.log('go')
  //   //
  //   // sampleData.forEach( (el, i, array) => {
  //   //   console.log(el)
  //   //   if (el.timing === millis) {
  //   //     synth.triggerAttack(sampleData[i].note);
  //   //   }
  //   //
  //   //   if (el.timing + el.duration === millis) {
  //   //     synth.triggerRelease();
  //   //   }
  //   // })
  //   //
  //   // if (sampleData[i].timing === millis) {
  //   //   console.log(sampleData[i].timing);
  //   //   // i++;
  //   // }
  //   //
  //   // let endOfNoteTiming = sampleData[i].timing + sampleData[i].duration;
  //   // console.log(endOfNoteTiming);
  //   //
  //   //
  //   // if (endOfNoteTiming === millis) {
  //   //
  //   //   console.log('end that');
  //   //   synth.triggerRelease();
  //   //   i++;
  //   // }
  //   // if
	// }, 1);








/*
TODO:
- Need to add keyboard hotkeys for playing notes, using horizontal arrow keys to shift those hot keys...
- Continue modularizing.

MUCH LATER TODO:
- CSS for the piano needs fixing, needs to be responsive to smaller screens (need to decide how that will even work).

How the playback will work:
- On pressing the playback button, it should start millis from 0 to 10 seconds.
- As millis runs, it compares it's current value to the timing of the logKey data.
- When timing === millis, trigger the synth.
- Add duration to that timing, and when millis reaches that sum it should turn that synth trigger off.
*/


var sampleData = [
  // {
  //   note: "F4",
  //   timing: 0,
  //   duration: 9000
  // },
  {
    note: "F#4",
    time: 4000,
    duration: 679
  },
  {
    note: "A4",
    time: 6295,
    duration: 75
    // 4295 + 75 -> that is the time it turns off
  },
  {
    note: "B4",
    time: 9000,
    duration: 1000
  }
];

// let sampleData = [];
// if (notesPlayedLoop.length > 0) {
//   sampleData = notesPlayedLoop;
// }

const pianoRangeArray = createPianoRangeArray(startNote, endNote, musicalAlphabet);
let flippedPianoRangeArray = pianoRangeArray.map((el, i, array) => {
  return(array[array.length - i - 1]);
});
console.log(pianoRangeArray);
console.log(flippedPianoRangeArray);


const svgHeight = 800,
      svgWidth = 800,
      // margin = {
      //   top: 100,
      //   right: 150,
      //   bottom: 100,
      //   left: 150
      // }
      padding = 30;

let svg = d3.select('#loopingStation')
            .append('svg')
            .attr('width', svgWidth /* + margin.left + margin.right */)
            .attr('height', svgHeight /* + margin.top + margin.bottom */);
            // .attr('viewBox', '0 0 '+ svgWidth + ' ' + svgHeight)
            // .attr('preserveAspectRatio', 'xMidYMid meet');

let timeScale = d3.scaleLinear()
					        .domain([0, 10000])
					        .range([padding, (svgWidth - padding)]);

let noteScale = d3.scaleBand()
					        .domain(flippedPianoRangeArray)
					        .range([0, svgHeight]);

// console.log(timeScale.ticks().length);
// console.log(noteScale.tickValues());


svg.selectAll('rect')
   .data(sampleData)
   .enter()
   .append('rect')
   .attr('x', d => timeScale(d.time))
   .attr('y', (d, i) => noteScale(d.note) - padding /* - (noteScale.bandwidth()/2) */)
   .attr('width', d => timeScale(d.duration) - padding)
   .attr('height', noteScale.bandwidth())
   .attr('fill', '#72A5FF');

let timeAxis = d3.axisBottom()
                 .scale(timeScale);

svg.append('g')
   .attr('class', 'axis')
   .attr('transform', 'translate(0, ' + (svgHeight - padding + 10) + ')')
   // .tick(20)
   .call(timeAxis);

let noteAxis = d3.axisLeft()
                 .scale(noteScale);

// let noteAxisGrid = noteAxis.ticks(6)
// console.log(noteScale.ticks.length);

svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(' + padding + ',' + '-' + (padding - 15) + ')')
  // .tick(20)
  .call(noteAxis);


// function noteAxisGrid() {
//   return d3.axisLeft(noteScale);
// }
// svg.append("g")
//     .attr("class", "grid")
//     .call(noteAxisGrid()
//         .tickSize(-svgWidth)
//         // .tickFormat("")
//     )




// const width = 800, // Dimensions of svg
//       height = 500,
//       resolution = 20, // Size of grid
//
//       rWidth = 100,
//       rHeight = 20;
//       // x = 20,
//       // y = 20;
//
// // This returns an array of objects with x, y coordinates for starting circle positions.
// var points = d3.range(4).map(function() {
//   return {
//     x: Math.round(Math.random() * width, resolution),
//     y: Math.round(Math.random() * height, resolution)
//   };
// });
//
// // Adminstors a drag to an element.
// var drag = d3.drag()
//              .subject(d => d)
//              .on('drag', dragged);
//
// // This creates the main svg.
// var svg = d3.select('#loopingStation')
//             .append('svg')
//             .attr('width', width)
//             .attr('height', height);
//
// svg.selectAll('.horizontal')
//     .data(d3.range(1, height / resolution))
//     .enter().append('line')
//     .attr('class', 'horizontal')
//     .attr('x1', 0)
//     .attr('y1', function(d) { return d * resolution; })
//     .attr('x2', width)
//     .attr('y2', function(d) { return d * resolution; })
//     .attr('fill', 'black');
//
// var rectangles = svg.selectAll('rect')
//     .data(points) // The points are the objects with x and y coordinates
//   .enter().append('rect')
//     .attr('x', function(d) { return d.x; })
//     .attr('y', function(d) { return d.y; })
//     .attr('width', rWidth)
//     .attr('height', rHeight)
//     .call(drag); // Calls the d3 drag function to run by adding appropriate event listeners
// //
// function dragged(d) {
//   var x = d3.event.x,
//       y = d3.event.y,
//       // gridX = round(Math.max(r, Math.min(width - r, x)), resolution),
//       gridX = x;
//       gridY = y;
//       gridY = round(Math.max(rHeight, Math.min(height - rHeight, y)), resolution);
//       // gridY = y;
//
//   d3.select(this)
//     // cx accounts for shifting on the x-axis.
//     .attr('x', d.x = gridX)
//     // cy accounts for shifting on the y-axis.
//     .attr('y', d.y = gridY);
// }

// function round(p, n) {
//   return p % n < n / 2 ? p - (p % n) : p + n - (p % n);
// }
