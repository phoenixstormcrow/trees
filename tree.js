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
