/* main.js */

var canvas = document.getElementById('canvas-app-trees');
var tree = require('./tree')(null); // we'll set this later by calling tree.init() passing a hidden canvas
var animation = require('./animation')(canvas, tree);

animation.init();

/* exposed for testing */
global.animation = animation;
global.tree = tree;
