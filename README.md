trees
=====

a visually appealing canvas animation displaying recursively drawn tree structures

being a port from a processing file to javascript

original processing file is recurse.pde

live demo of latest build is [http://bl.ocks.org/phoenixstormcrow/0d1faa46f230d941e184](http://bl.ocks.org/phoenixstormcrow/0d1faa46f230d941e184)
(you may have to refresh the page once or twice to view. not sure what's going on with bl.ocks.org)

### What is this?

This was originally a cute little one-off that I slapped together while learning processing for a MOOC. When it came time to code up an actual app using processing and processing.js, I found that the platform was somewhat limiting and was frankly terrible to debug. (I spent hours before deadline tracking down the cause of an indecipherable error message, which ultimately resulted from a missing semicolon; sourcemaps would have been helpful there.)

That experience, more than some, convinced me to learn JavaScript properly, which, as anyone browsing the code for this animation can probably tell, I haven't, quite. But porting this little thing, and tweaking it a bit, is part of my plan to do so. I welcome any feedback.

### What good is it?

None, probably, but I enjoyed learning about:

+ recursion
+ canvas animation techniques
+ HSL color space
+ the basics of using git and github
+ npm and browserify
+ markdown syntax

### Now what?

This animation still runs too slowly for my taste, especially when the value of MAX_ITERATIONS is greater than 11. I'd like it to run quickly and render smoothly with more iterations, but this is non-trivial to optimize. The performance killer is the great multitude of calls to stroke, and these are not simple to eliminate, because I'm changing color between each call. I could get around this by drawing to multiple canvases (one for each iteration), and then stroking each of these, but I can't imagine that the drawing logic would remain comprehensible to the reader of the code. That would probably be the best strategy, though, and I may implement it at some point.

An alternative would be to draw frames to a queue of in-memory canvases, and then blit them one by one to the screen. This would not obfuscate the tree module much, as the logic for the animation queue would be in the animation module, but would probably require a great deal more memory than either the un-optimized current version or the solution in the preceeding paragraph, and I can't be sure that the entries in the queue won't be consumed faster than they can be produced, assuming I want the best possible frame rate.

So I'm currently undecided about the path I should take with this. I'm going to move on to another project, and give it some time. Maybe I'll come up with something and push it here.
