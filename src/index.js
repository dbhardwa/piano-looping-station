import "./scss/main.scss";
import * as d3 from 'd3';

import setPianoRangeFields from "./modules/setPianoRangeFields";
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

let startNote = "C4";
let endNote = "B6";

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
    console.log(mousedown);
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
svg 1000
1px width rectangle moving
It needs to cover 1190 px in 10 seconds (10000ms)

1000 px / 10,000 ms

0.1 px/ms
1 px / 10 ms

100 px / 1 sec

8.40 ms/px

*/





// const svgHeight = 372,
//       svgWidth = 1000,
//       margin = {
//         top: 0,
//         right: 0,
//         bottom: 0,
//         left: 0
//       }

// let svg = d3.select('#loopingStation')
//             .append('svg')
//             .attr('width', svgWidth + margin.left + margin.right)
//             .attr('height', svgHeight + margin.top + margin.bottom);


const width = 800, // Dimensions of svg
      height = 500,
      resolution = 20, // Size of grid

      rWidth = 100,
      rHeight = 20;
      // x = 20,
      // y = 20;

// This returns an array of objects with x, y coordinates for starting circle positions.
var points = d3.range(4).map(function() {
  return {
    x: Math.round(Math.random() * width, resolution),
    y: Math.round(Math.random() * height, resolution)
  };
});

// Adminstors a drag to an element.
var drag = d3.drag()
             .subject(d => d)
             .on('drag', dragged);

// This creates the main svg.
var svg = d3.select('#loopingStation')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

svg.selectAll('.horizontal')
    .data(d3.range(1, height / resolution))
    .enter().append('line')
    .attr('class', 'horizontal')
    .attr('x1', 0)
    .attr('y1', function(d) { return d * resolution; })
    .attr('x2', width)
    .attr('y2', function(d) { return d * resolution; })
    .attr('fill', 'black');

var rectangles = svg.selectAll('rect')
    .data(points) // The points are the objects with x and y coordinates
  .enter().append('rect')
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; })
    .attr('width', rWidth)
    .attr('height', rHeight)
    .call(drag); // Calls the d3 drag function to run by adding appropriate event listeners
//
function dragged(d) {
  var x = d3.event.x,
      y = d3.event.y,
      // gridX = round(Math.max(r, Math.min(width - r, x)), resolution),
      gridX = x;
      gridY = y;
      gridY = round(Math.max(rHeight, Math.min(height - rHeight, y)), resolution);
      // gridY = y;

  d3.select(this)
    // cx accounts for shifting on the x-axis.
    .attr('x', d.x = gridX)
    // cy accounts for shifting on the y-axis.
    .attr('y', d.y = gridY);
}

function round(p, n) {
  return p % n < n / 2 ? p - (p % n) : p + n - (p % n);
}








/*
TODO:
- We need both click and mousedown events to account for moving from one note to the next with the mouse button still held down.
- Need to add keyboard hotkeys for playing notes, using horizontal arrow keys to shift those hot keys...
- Continue modularizing.

MUCH LATER TODO:
- CSS for the piano needs fixing, needs to be responsive to smaller screens (need to decide how that will even work).
- Larger range for a desktop (tablet too) will need to allow horizontal scrolling of the keys to access others.
*/
