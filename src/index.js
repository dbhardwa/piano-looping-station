import "./scss/main.scss";
import * as d3 from 'd3';

import setPianoRangeFields from "./modules/setPianoRangeFields";
import createPianoRangeArray from "./modules/createPianoRangeArray";
import renderPiano from "./modules/renderPiano";
import {
  handleKeyPress,
  handleRecord,
  handleKeyRelease,
  notesPlayedLoop
} from "./modules/events";


// Standard musical alphabet (C --> B).
const musicalAlphabet = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const whiteHotKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''];
const blackHotKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '['];

const startNote = 'C4',
        endNote = 'B5';

const piano = document.getElementById('piano'),
			recordButton = document.getElementById('record'),
			startRangeSelect = document.getElementById('startRange'),
			endRangeSelect = document.getElementById('endRange'),
      notesPlayedLoopButton = document.getElementById('notesPlayedLoop');


const init = function() {
	updateRangesAndPiano();
	bindEvents();
}

const updateRangesAndPiano = function() {
	setPianoRangeFields(startNote, endNote, startRangeSelect, endRangeSelect, musicalAlphabet);
	renderPiano(startNote, endNote, musicalAlphabet);
}

const bindEvents = function() {
	// Note range <select> options.
	startRangeSelect.addEventListener('change', (e) => {
		startNote = e.target.value;
		updateRangesAndPiano();
	});
	endRangeSelect.addEventListener('change', (e) => {
	  endNote = e.target.value;
		updateRangesAndPiano();
	});


  let mousedown = false;

  piano.onmousedown = (e) => {
    mousedown = true;
    e.target.classList.add('active');
    handleKeyPress(e.target.id);
  };

  document.body.onmouseup = () => {
    mousedown = false;
    // console.log(mousedown);
  }

  piano.onmouseup = (e) => {
    e.target.classList.remove('active');
    handleKeyRelease(e);
  }






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



  // piano.addEventListener('mouseleave', () => {console.log('test')});

	recordButton.addEventListener('click', handleRecord);
  notesPlayedLoopButton.addEventListener('click', () => {console.log(notesPlayedLoop)});

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
// const playButton = document.getElementById('play');
// let millis = 0;
//
// playButton.onclick = () => {
//   let start = Date.now();
//
//   let timer = setInterval(() => {
// 		// Gives time (ms) since the record button was pressed.
// 		millis = Date.now() - start;
//
// 		if (millis > 10000) {
// 			clearInterval(timer);
// 		}
//     //
//     // sampleData
//     // if
// 	}, 1);
// }
//
// function playSound(millis) {
//
// }

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
    timing: 2677,
    duration: 679
  },
  {
    note: "A4",
    timing: 4295,
    duration: 75
    // 4295 + 75 -> that is the time it turns off
  },
  {
    note: "B4",
    timing: 9100,
    duration: 1000
  }
];

// let sampleData = [];
// if (notesPlayedLoop.length > 0) {
//   sampleData = notesPlayedLoop;
// }

const pianoRangeArray = createPianoRangeArray(startNote, endNote, musicalAlphabet);

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

let timeScale = d3.scaleLinear()
					        .domain([0, 10000])
					        .range([padding, (svgWidth - padding)]);

let noteScale = d3.scaleBand()
					        .domain(pianoRangeArray)
					        .range([0, svgHeight]);

// console.log(timeScale.ticks().length);
// console.log(noteScale.tickValues());


svg.selectAll('rect')
   .data(sampleData)
   .enter()
   .append('rect')
   .attr('x', d => timeScale(d.timing))
   .attr('y', (d, i) => noteScale(d.note) - padding /* - (noteScale.bandwidth()/2) */)
   .attr('width', d => timeScale(d.duration) - padding)
   .attr('height', noteScale.bandwidth())
   .attr('fill', '#72A5FF');

let timeAxis = d3.axisBottom()
                 .scale(timeScale);

svg.append('g')
   .attr('class', 'axis')
   .attr('transform', 'translate(0, ' + (svgHeight - padding) + ')')
   // .tick(20)
   .call(timeAxis);

let noteAxis = d3.axisLeft()
                 .scale(noteScale);

// let noteAxisGrid = noteAxis.ticks(6)
// console.log(noteScale.ticks.length);

svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(' + padding + ',' + '-' + padding + ')')
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
