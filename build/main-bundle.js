(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/* main.js */

var canvas = document.getElementById('canvas-app-trees');
var tree = require('./tree')(null); // we'll set this later by calling tree.init() passing a hidden canvas
var animation = require('./animation')(canvas, tree);

animation.init();

/* exposed for testing */
global.animation = animation;
global.tree = tree;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./animation":2,"./tree":4}],2:[function(require,module,exports){
/* animation.js
   the animation logic for our trees animation
*/

module.exports = function animation(canvas, model) {
    return {
        model: model,
        displayCanvas: canvas,
        displayContext: canvas.getContext('2d'),
        init: function () {
            this.paused = true;

            /* set up the canvas */
            this.displayCanvas.width = window.innerWidth;
            this.displayCanvas.height = window.innerHeight;

            this.canvas = document.createElement('canvas'); // off-screen canvas
            this.context = this.canvas.getContext('2d');
            this.canvas.width = this.displayCanvas.width;
            this.canvas.height = this.displayCanvas.height;

            /* we want the tree drawn to the off-screen canvas */
            this.model.init(this.canvas);

            this.displayCanvas.addEventListener('click', (function (e) {
                this.toggle();
            }).bind(this));

            this.context.save(); // save here to clear later
            this.reset();

            /* display instructions */
            this.instructions();
        },
        toggle: function () {
            if (this.paused) {
                this.start();
            } else {
                this.pause();
            }
        },
        clear: function () {
            this.displayContext.clearRect(0, 0, this.displayCanvas.width, this.displayCanvas.height);
            /* I'm assuming we're one transform from the bottom
               of the stack. This seems dangerous. Unfortunately,
               I don't have access to either the current transformation matrix,
               or the stack of transforms, so until I decide to extend the canvas
               with transform tracking, I'll let this go, because it's working.
            */
            this.context.restore();
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.save(); // save here to clear later

        },
        reset: function () {
            this.clear();
            /* + 0.5 translation ensures we get crisp lines */
            this.context.translate(Math.floor(this.canvas.width / 2) + 0.5,
                Math.floor(this.canvas.height / 2) + 0.5);
            this.context.rotate(-Math.PI / 2);
        },
        instructions: function () {
            /* write some words */
            this.displayContext.save();
            this.displayContext.translate(this.displayCanvas.width / 2, this.displayCanvas.height / 2);
            this.displayContext.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.displayContext.font = '48px sans';
            this.displayContext.textAlign = 'center';
            this.displayContext.fillText('click', 0, 0);
            this.displayContext.restore();
        },
        start: function () {
            // these could be private
            this.paused = false;
            this.reqId = window.requestAnimationFrame(this.tick.bind(this));
        },
        pause: function () {
            this.paused = true;
            window.cancelAnimationFrame(this.reqId);
        },
        blit: function () {
            /* throw it all up on screen */
            this.displayContext.drawImage(this.canvas, 0, 0);
        },
        tick: function () {
            this.reset();
            model.draw(); // this draws to the off-screen canvas
            this.blit();
            this.reqId = window.requestAnimationFrame(this.tick.bind(this));
        },
    };
};

},{}],3:[function(require,module,exports){
/* graphics.js

helper functions for 2d canvas graphics

*/

/* The following conversion functions hslToRgb and rgbToHsl were found in
*  Ken Fyrstenberg's answer here: http://stackoverflow.com/a/18803483/668335
*/

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l){
    var r, g, b;

    function hue2rgb(p, q, t){
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if(s === 0){
        r = g = b = l; // achromatic
    }else{

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r, g, b].map(function (val) { return Math.floor(val * 255); });
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b){
    /* jshint ignore:start */
    r /= 255, g /= 255, b /= 255;
    /* jshint ignore:end */
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

module.exports = {
    hslToRgb: hslToRgb,
    rgbToHsl: rgbToHsl,
};

},{}],4:[function(require,module,exports){
//tree.js

var graphics = require('./graphics'),
    /* useful constants */
    MAX_RECURSIONS = 10,
    SCALE_FACTOR = 0.66;

function initialLength(canvas) {
/* calculates the length of the longest branch (trunk)
   of our tree, such that the entire tree should fit on the canvas
*/
    var maxLength = Math.floor(Math.min(canvas.width, canvas.height) / 2),
        x = 0;
    for (var i = 0; i <= MAX_RECURSIONS; ++i) {
        x += Math.pow(SCALE_FACTOR, i);
    }
    return Math.floor(maxLength / x);

}

module.exports = function tree(canvas) {

    var t = {
        canvas: canvas,

        rotL: 0,
        rotR: 0,

        init: function init(canvas) {
            /* we can set the canvas here, if it wasn't set
               during construction
            */
            this.canvas = canvas || this.canvas;
            this.context = this.canvas.getContext('2d');
            this.trunkLength = initialLength(this.canvas);
            this.hue0 = 0.0;
        },

        set strokeStyle(hsl) {
            var rgb = graphics.hslToRgb.apply(null, hsl);
            this.context.strokeStyle = 'rgb(' + rgb.join(', ') + ')';
        },
        get strokeStyle() {
            return this.context.strokeStyle;
        },

        draw: function draw() {
        /* called for every frame of the animation */
            this.branchLength = this.trunkLength;
            this.rotR += 0.07;  // values chosen by experiment
            this.rotL -= 0.033; // the ratio yields pleasing effect
            this.hue0 += 0.01 % 1; // ??? so many magic numbers
            this.drawTree(0);
        },

        drawTree: function drawTree(level) {
        /* here we draw an entire tree recursively */
            if (level > MAX_RECURSIONS || this.branchLength < 1) {
                return;
            }

            /* set stroke color */
            var hue = (this.hue0 + level/(6.5 * MAX_RECURSIONS)) % 1,
                bright = (level/MAX_RECURSIONS % 0.25) + 0.5;
            this.strokeStyle = [hue, 1.0, bright];

            /* left branch */
            this.context.save();
            this.branch(this.rotL, level);
            this.drawTree(level + 1);
            this.context.restore();

            /* right branch */
            this.context.save();
            this.branch(this.rotR, level);
            this.drawTree(level + 1);
            this.context.restore();

        },

        branch: function branch(angle, level) {
        /* here we draw a single branch */

            this.context.rotate(angle);
            this.branchLength = this.trunkLength * Math.pow(SCALE_FACTOR, level);
            this.context.beginPath();
            this.context.moveTo(0, 0);
            this.context.lineTo(this.branchLength, 0);
            this.context.stroke();
            this.context.translate(this.branchLength, 0);
        },
    };


    return t;
};

},{"./graphics":3}]},{},[1]);
