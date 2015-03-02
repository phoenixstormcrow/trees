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
