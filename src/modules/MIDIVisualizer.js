/*
  "MIDIVisualizer" Module:
    - Data visualization of recorded notes using D3.
*/

import * as d3 from 'd3';

import util from "../util";


const sampleData = [
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


const MIDIVisualizer = {

  settings: {
    pianoRangeArray: [],

    svgWidth: 800,
    svgHeight: 1200,
    padding: 30,
  },

  init: function() {
    // Create piano range array from very beginning piano key to end.
    let pianoRangeArray = util.createPianoRangeArray('A0', 'C8');
    let flippedPianoRangeArray = pianoRangeArray.map((note, i, array) => {
      return(array[array.length - i - 1]);
    });

    this.settings.pianoRangeArray = flippedPianoRangeArray;
    this.render();
  },

  bindEvents: function() {},

  render: function() {
    let svgWidth = this.settings.svgWidth,
        svgHeight = this.settings.svgHeight,
        padding = this.settings.padding;

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
    					        .domain(this.settings.pianoRangeArray)
    					        .range([0, svgHeight]);

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


    svg.append('g')
       .attr('class', 'axis')
       .attr('transform', 'translate(' + padding + ',' + '-' + (padding - 15) + ')')
       // .tick(20)
       .call(noteAxis);

  }

};

export default MIDIVisualizer;


// NOTE: START OF MIDIVisualizer code: (OLD CODE)
//
//
// var sampleData = [
//   // {
//   //   note: "F4",
//   //   timing: 0,
//   //   duration: 9000
//   // },
//   {
//     note: "F#4",
//     time: 4000,
//     duration: 679
//   },
//   {
//     note: "A4",
//     time: 6295,
//     duration: 75
//     // 4295 + 75 -> that is the time it turns off
//   },
//   {
//     note: "B4",
//     time: 9000,
//     duration: 1000
//   }
// ];
//
// // let sampleData = [];
// // if (notesPlayedLoop.length > 0) {
// //   sampleData = notesPlayedLoop;
// // }
//
// const pianoRangeArray = util.createPianoRangeArray(startNote, endNote);
// let flippedPianoRangeArray = pianoRangeArray.map((el, i, array) => {
//   return(array[array.length - i - 1]);
// });
// console.log(pianoRangeArray);
// console.log(flippedPianoRangeArray);
//
//
// const svgHeight = 800,
//       svgWidth = 800,
//       // margin = {
//       //   top: 100,
//       //   right: 150,
//       //   bottom: 100,
//       //   left: 150
//       // }
//       padding = 30;
//
// let svg = d3.select('#loopingStation')
//             .append('svg')
//             .attr('width', svgWidth /* + margin.left + margin.right */)
//             .attr('height', svgHeight /* + margin.top + margin.bottom */);
//             // .attr('viewBox', '0 0 '+ svgWidth + ' ' + svgHeight)
//             // .attr('preserveAspectRatio', 'xMidYMid meet');
//
// let timeScale = d3.scaleLinear()
// 					        .domain([0, 10000])
// 					        .range([padding, (svgWidth - padding)]);
//
// let noteScale = d3.scaleBand()
// 					        .domain(flippedPianoRangeArray)
// 					        .range([0, svgHeight]);
//
// // console.log(timeScale.ticks().length);
// // console.log(noteScale.tickValues());
//
//
// svg.selectAll('rect')
//    .data(sampleData)
//    .enter()
//    .append('rect')
//    .attr('x', d => timeScale(d.time))
//    .attr('y', (d, i) => noteScale(d.note) - padding /* - (noteScale.bandwidth()/2) */)
//    .attr('width', d => timeScale(d.duration) - padding)
//    .attr('height', noteScale.bandwidth())
//    .attr('fill', '#72A5FF');
//
// let timeAxis = d3.axisBottom()
//                  .scale(timeScale);
//
// svg.append('g')
//    .attr('class', 'axis')
//    .attr('transform', 'translate(0, ' + (svgHeight - padding + 10) + ')')
//    // .tick(20)
//    .call(timeAxis);
//
// let noteAxis = d3.axisLeft()
//                  .scale(noteScale);
//
// // let noteAxisGrid = noteAxis.ticks(6)
// // console.log(noteScale.ticks.length);
//
// svg.append('g')
//   .attr('class', 'axis')
//   .attr('transform', 'translate(' + padding + ',' + '-' + (padding - 15) + ')')
//   // .tick(20)
//   .call(noteAxis);
//
//
// // function noteAxisGrid() {
// //   return d3.axisLeft(noteScale);
// // }
// // svg.append("g")
// //     .attr("class", "grid")
// //     .call(noteAxisGrid()
// //         .tickSize(-svgWidth)
// //         // .tickFormat("")
// //     )
