(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/phoenix/web/lorem-ipsum-component/index.js":[function(require,module,exports){
/* lorem-ipsum-components

   a custom html element that generates lorem ipsum.
*/

var lorem = require('lorem-ipsum');

var loremProto = Object.create(HTMLElement.prototype);

loremProto.createdCallback = function () {
  /* lorem-ipsum treats count===0 as count===1 */
  var count = parseInt(this.getAttribute('count'), 10);
  if (!count) {
    /* generate 0 units! */
    return;
  }
  var opts = {
    count: count,
    format : this.getAttribute('format') || 'plain',
    units : this.getAttribute('units') || 'sentences'
  }; // TODO: other attributes
  this.innerHTML = lorem(opts);
};


document.registerElement('lorem-ipsum', { prototype: loremProto });

},{"lorem-ipsum":"/home/phoenix/web/lorem-ipsum-component/node_modules/lorem-ipsum/lib/generator.js"}],"/home/phoenix/web/lorem-ipsum-component/node_modules/lorem-ipsum/lib/dictionary.js":[function(require,module,exports){
var dictionary = {
  words: [
    'ad',
    'adipisicing',
    'aliqua',
    'aliquip',
    'amet',
    'anim',
    'aute',
    'cillum',
    'commodo',
    'consectetur',
    'consequat',
    'culpa',
    'cupidatat',
    'deserunt',
    'do',
    'dolor',
    'dolore',
    'duis',
    'ea',
    'eiusmod',
    'elit',
    'enim',
    'esse',
    'est',
    'et',
    'eu',
    'ex',
    'excepteur',
    'exercitation',
    'fugiat',
    'id',
    'in',
    'incididunt',
    'ipsum',
    'irure',
    'labore',
    'laboris',
    'laborum',
    'Lorem',
    'magna',
    'minim',
    'mollit',
    'nisi',
    'non',
    'nostrud',
    'nulla',
    'occaecat',
    'officia',
    'pariatur',
    'proident',
    'qui',
    'quis',
    'reprehenderit',
    'sint',
    'sit',
    'sunt',
    'tempor',
    'ullamco',
    'ut',
    'velit',
    'veniam',
    'voluptate'  
  ]
};

module.exports = dictionary;
},{}],"/home/phoenix/web/lorem-ipsum-component/node_modules/lorem-ipsum/lib/generator.js":[function(require,module,exports){
var generator = function() {
  var options = (arguments.length) ? arguments[0] : {}
    , count = options.count || 1
    , units = options.units || 'sentences'
    , sentenceLowerBound = options.sentenceLowerBound || 5
    , sentenceUpperBound = options.sentenceUpperBound || 15
	  , paragraphLowerBound = options.paragraphLowerBound || 3
	  , paragraphUpperBound = options.paragraphUpperBound || 7
	  , format = options.format || 'plain'
    , words = options.words || require('./dictionary').words
    , random = options.random || Math.random;

  units = simplePluralize(units.toLowerCase());

  var randomInteger = function(min, max) {
    return Math.floor(random() * (max - min + 1) + min);
  };
  
  var randomWord = function(words) {
    return words[randomInteger(0, words.length - 1)];
  };
  
  var randomSentence = function(words, lowerBound, upperBound) {
    var sentence = ''
      , bounds = {min: 0, max: randomInteger(lowerBound, upperBound)};
    
    while (bounds.min < bounds.max) {
      sentence = sentence + ' ' + randomWord(words);
      bounds.min = bounds.min + 1;
    }
    
    if (sentence.length) {
      sentence = sentence.slice(1);
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    }
  
    return sentence;
  };

  var randomParagraph = function(words, lowerBound, upperBound, sentenceLowerBound, sentenceUpperBound) {
    var paragraph = ''
      , bounds = {min: 0, max: randomInteger(lowerBound, upperBound)};
      
    while (bounds.min < bounds.max) {
      paragraph = paragraph + '. ' + randomSentence(words, sentenceLowerBound, sentenceUpperBound);
      bounds.min = bounds.min + 1;
    }
    
    if (paragraph.length) {
      paragraph = paragraph.slice(2);
      paragraph = paragraph + '.';
    }
    
    return paragraph;
  }
  
  var iter = 0
    , bounds = {min: 0, max: count}
    , string = ''
    , prefix = ''
    , suffix = "\r\n";

  if (format == 'html') {
    prefix = '<p>';
    suffix = '</p>';
  }
      
  while (bounds.min < bounds.max) {
    switch (units.toLowerCase()) {
      case 'words':
        string = string + ' ' + randomWord(words);
        break;
      case 'sentences':
        string = string + '. ' + randomSentence(words, sentenceLowerBound, sentenceUpperBound);
        break;
      case 'paragraphs':
        string = string + prefix + randomParagraph(words, paragraphLowerBound, paragraphUpperBound, sentenceLowerBound, sentenceUpperBound) + suffix;
        break;
    }
    bounds.min = bounds.min + 1;
  }
    
  if (string.length) {
    var pos = 0;
    
    if (string.indexOf('. ') == 0) {
      pos = 2;
    } else if (string.indexOf('.') == 0 || string.indexOf(' ') == 0) {
      pos = 1;
    }
    
    string = string.slice(pos);
    
    if (units == 'sentences') {
      string = string + '.';
    }
  }  
  
  return string;
};

function simplePluralize(string) {
  if (string.indexOf('s', string.length - 1) === -1) {
    return string + 's';
  }
  return string;
}

module.exports = generator;

},{"./dictionary":"/home/phoenix/web/lorem-ipsum-component/node_modules/lorem-ipsum/lib/dictionary.js"}]},{},["/home/phoenix/web/lorem-ipsum-component/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb3JlbS1pcHN1bS9saWIvZGljdGlvbmFyeS5qcyIsIm5vZGVfbW9kdWxlcy9sb3JlbS1pcHN1bS9saWIvZ2VuZXJhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGxvcmVtLWlwc3VtLWNvbXBvbmVudHNcblxuICAgYSBjdXN0b20gaHRtbCBlbGVtZW50IHRoYXQgZ2VuZXJhdGVzIGxvcmVtIGlwc3VtLlxuKi9cblxudmFyIGxvcmVtID0gcmVxdWlyZSgnbG9yZW0taXBzdW0nKTtcblxudmFyIGxvcmVtUHJvdG8gPSBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSk7XG5cbmxvcmVtUHJvdG8uY3JlYXRlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAvKiBsb3JlbS1pcHN1bSB0cmVhdHMgY291bnQ9PT0wIGFzIGNvdW50PT09MSAqL1xuICB2YXIgY291bnQgPSBwYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnY291bnQnKSwgMTApO1xuICBpZiAoIWNvdW50KSB7XG4gICAgLyogZ2VuZXJhdGUgMCB1bml0cyEgKi9cbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG9wdHMgPSB7XG4gICAgY291bnQ6IGNvdW50LFxuICAgIGZvcm1hdCA6IHRoaXMuZ2V0QXR0cmlidXRlKCdmb3JtYXQnKSB8fCAncGxhaW4nLFxuICAgIHVuaXRzIDogdGhpcy5nZXRBdHRyaWJ1dGUoJ3VuaXRzJykgfHwgJ3NlbnRlbmNlcydcbiAgfTsgLy8gVE9ETzogb3RoZXIgYXR0cmlidXRlc1xuICB0aGlzLmlubmVySFRNTCA9IGxvcmVtKG9wdHMpO1xufTtcblxuXG5kb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoJ2xvcmVtLWlwc3VtJywgeyBwcm90b3R5cGU6IGxvcmVtUHJvdG8gfSk7XG4iLCJ2YXIgZGljdGlvbmFyeSA9IHtcbiAgd29yZHM6IFtcbiAgICAnYWQnLFxuICAgICdhZGlwaXNpY2luZycsXG4gICAgJ2FsaXF1YScsXG4gICAgJ2FsaXF1aXAnLFxuICAgICdhbWV0JyxcbiAgICAnYW5pbScsXG4gICAgJ2F1dGUnLFxuICAgICdjaWxsdW0nLFxuICAgICdjb21tb2RvJyxcbiAgICAnY29uc2VjdGV0dXInLFxuICAgICdjb25zZXF1YXQnLFxuICAgICdjdWxwYScsXG4gICAgJ2N1cGlkYXRhdCcsXG4gICAgJ2Rlc2VydW50JyxcbiAgICAnZG8nLFxuICAgICdkb2xvcicsXG4gICAgJ2RvbG9yZScsXG4gICAgJ2R1aXMnLFxuICAgICdlYScsXG4gICAgJ2VpdXNtb2QnLFxuICAgICdlbGl0JyxcbiAgICAnZW5pbScsXG4gICAgJ2Vzc2UnLFxuICAgICdlc3QnLFxuICAgICdldCcsXG4gICAgJ2V1JyxcbiAgICAnZXgnLFxuICAgICdleGNlcHRldXInLFxuICAgICdleGVyY2l0YXRpb24nLFxuICAgICdmdWdpYXQnLFxuICAgICdpZCcsXG4gICAgJ2luJyxcbiAgICAnaW5jaWRpZHVudCcsXG4gICAgJ2lwc3VtJyxcbiAgICAnaXJ1cmUnLFxuICAgICdsYWJvcmUnLFxuICAgICdsYWJvcmlzJyxcbiAgICAnbGFib3J1bScsXG4gICAgJ0xvcmVtJyxcbiAgICAnbWFnbmEnLFxuICAgICdtaW5pbScsXG4gICAgJ21vbGxpdCcsXG4gICAgJ25pc2knLFxuICAgICdub24nLFxuICAgICdub3N0cnVkJyxcbiAgICAnbnVsbGEnLFxuICAgICdvY2NhZWNhdCcsXG4gICAgJ29mZmljaWEnLFxuICAgICdwYXJpYXR1cicsXG4gICAgJ3Byb2lkZW50JyxcbiAgICAncXVpJyxcbiAgICAncXVpcycsXG4gICAgJ3JlcHJlaGVuZGVyaXQnLFxuICAgICdzaW50JyxcbiAgICAnc2l0JyxcbiAgICAnc3VudCcsXG4gICAgJ3RlbXBvcicsXG4gICAgJ3VsbGFtY28nLFxuICAgICd1dCcsXG4gICAgJ3ZlbGl0JyxcbiAgICAndmVuaWFtJyxcbiAgICAndm9sdXB0YXRlJyAgXG4gIF1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGljdGlvbmFyeTsiLCJ2YXIgZ2VuZXJhdG9yID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvcHRpb25zID0gKGFyZ3VtZW50cy5sZW5ndGgpID8gYXJndW1lbnRzWzBdIDoge31cbiAgICAsIGNvdW50ID0gb3B0aW9ucy5jb3VudCB8fCAxXG4gICAgLCB1bml0cyA9IG9wdGlvbnMudW5pdHMgfHwgJ3NlbnRlbmNlcydcbiAgICAsIHNlbnRlbmNlTG93ZXJCb3VuZCA9IG9wdGlvbnMuc2VudGVuY2VMb3dlckJvdW5kIHx8IDVcbiAgICAsIHNlbnRlbmNlVXBwZXJCb3VuZCA9IG9wdGlvbnMuc2VudGVuY2VVcHBlckJvdW5kIHx8IDE1XG5cdCAgLCBwYXJhZ3JhcGhMb3dlckJvdW5kID0gb3B0aW9ucy5wYXJhZ3JhcGhMb3dlckJvdW5kIHx8IDNcblx0ICAsIHBhcmFncmFwaFVwcGVyQm91bmQgPSBvcHRpb25zLnBhcmFncmFwaFVwcGVyQm91bmQgfHwgN1xuXHQgICwgZm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQgfHwgJ3BsYWluJ1xuICAgICwgd29yZHMgPSBvcHRpb25zLndvcmRzIHx8IHJlcXVpcmUoJy4vZGljdGlvbmFyeScpLndvcmRzXG4gICAgLCByYW5kb20gPSBvcHRpb25zLnJhbmRvbSB8fCBNYXRoLnJhbmRvbTtcblxuICB1bml0cyA9IHNpbXBsZVBsdXJhbGl6ZSh1bml0cy50b0xvd2VyQ2FzZSgpKTtcblxuICB2YXIgcmFuZG9tSW50ZWdlciA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IocmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICB9O1xuICBcbiAgdmFyIHJhbmRvbVdvcmQgPSBmdW5jdGlvbih3b3Jkcykge1xuICAgIHJldHVybiB3b3Jkc1tyYW5kb21JbnRlZ2VyKDAsIHdvcmRzLmxlbmd0aCAtIDEpXTtcbiAgfTtcbiAgXG4gIHZhciByYW5kb21TZW50ZW5jZSA9IGZ1bmN0aW9uKHdvcmRzLCBsb3dlckJvdW5kLCB1cHBlckJvdW5kKSB7XG4gICAgdmFyIHNlbnRlbmNlID0gJydcbiAgICAgICwgYm91bmRzID0ge21pbjogMCwgbWF4OiByYW5kb21JbnRlZ2VyKGxvd2VyQm91bmQsIHVwcGVyQm91bmQpfTtcbiAgICBcbiAgICB3aGlsZSAoYm91bmRzLm1pbiA8IGJvdW5kcy5tYXgpIHtcbiAgICAgIHNlbnRlbmNlID0gc2VudGVuY2UgKyAnICcgKyByYW5kb21Xb3JkKHdvcmRzKTtcbiAgICAgIGJvdW5kcy5taW4gPSBib3VuZHMubWluICsgMTtcbiAgICB9XG4gICAgXG4gICAgaWYgKHNlbnRlbmNlLmxlbmd0aCkge1xuICAgICAgc2VudGVuY2UgPSBzZW50ZW5jZS5zbGljZSgxKTtcbiAgICAgIHNlbnRlbmNlID0gc2VudGVuY2UuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzZW50ZW5jZS5zbGljZSgxKTtcbiAgICB9XG4gIFxuICAgIHJldHVybiBzZW50ZW5jZTtcbiAgfTtcblxuICB2YXIgcmFuZG9tUGFyYWdyYXBoID0gZnVuY3Rpb24od29yZHMsIGxvd2VyQm91bmQsIHVwcGVyQm91bmQsIHNlbnRlbmNlTG93ZXJCb3VuZCwgc2VudGVuY2VVcHBlckJvdW5kKSB7XG4gICAgdmFyIHBhcmFncmFwaCA9ICcnXG4gICAgICAsIGJvdW5kcyA9IHttaW46IDAsIG1heDogcmFuZG9tSW50ZWdlcihsb3dlckJvdW5kLCB1cHBlckJvdW5kKX07XG4gICAgICBcbiAgICB3aGlsZSAoYm91bmRzLm1pbiA8IGJvdW5kcy5tYXgpIHtcbiAgICAgIHBhcmFncmFwaCA9IHBhcmFncmFwaCArICcuICcgKyByYW5kb21TZW50ZW5jZSh3b3Jkcywgc2VudGVuY2VMb3dlckJvdW5kLCBzZW50ZW5jZVVwcGVyQm91bmQpO1xuICAgICAgYm91bmRzLm1pbiA9IGJvdW5kcy5taW4gKyAxO1xuICAgIH1cbiAgICBcbiAgICBpZiAocGFyYWdyYXBoLmxlbmd0aCkge1xuICAgICAgcGFyYWdyYXBoID0gcGFyYWdyYXBoLnNsaWNlKDIpO1xuICAgICAgcGFyYWdyYXBoID0gcGFyYWdyYXBoICsgJy4nO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcGFyYWdyYXBoO1xuICB9XG4gIFxuICB2YXIgaXRlciA9IDBcbiAgICAsIGJvdW5kcyA9IHttaW46IDAsIG1heDogY291bnR9XG4gICAgLCBzdHJpbmcgPSAnJ1xuICAgICwgcHJlZml4ID0gJydcbiAgICAsIHN1ZmZpeCA9IFwiXFxyXFxuXCI7XG5cbiAgaWYgKGZvcm1hdCA9PSAnaHRtbCcpIHtcbiAgICBwcmVmaXggPSAnPHA+JztcbiAgICBzdWZmaXggPSAnPC9wPic7XG4gIH1cbiAgICAgIFxuICB3aGlsZSAoYm91bmRzLm1pbiA8IGJvdW5kcy5tYXgpIHtcbiAgICBzd2l0Y2ggKHVuaXRzLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIGNhc2UgJ3dvcmRzJzpcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nICsgJyAnICsgcmFuZG9tV29yZCh3b3Jkcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2VudGVuY2VzJzpcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nICsgJy4gJyArIHJhbmRvbVNlbnRlbmNlKHdvcmRzLCBzZW50ZW5jZUxvd2VyQm91bmQsIHNlbnRlbmNlVXBwZXJCb3VuZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncGFyYWdyYXBocyc6XG4gICAgICAgIHN0cmluZyA9IHN0cmluZyArIHByZWZpeCArIHJhbmRvbVBhcmFncmFwaCh3b3JkcywgcGFyYWdyYXBoTG93ZXJCb3VuZCwgcGFyYWdyYXBoVXBwZXJCb3VuZCwgc2VudGVuY2VMb3dlckJvdW5kLCBzZW50ZW5jZVVwcGVyQm91bmQpICsgc3VmZml4O1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgYm91bmRzLm1pbiA9IGJvdW5kcy5taW4gKyAxO1xuICB9XG4gICAgXG4gIGlmIChzdHJpbmcubGVuZ3RoKSB7XG4gICAgdmFyIHBvcyA9IDA7XG4gICAgXG4gICAgaWYgKHN0cmluZy5pbmRleE9mKCcuICcpID09IDApIHtcbiAgICAgIHBvcyA9IDI7XG4gICAgfSBlbHNlIGlmIChzdHJpbmcuaW5kZXhPZignLicpID09IDAgfHwgc3RyaW5nLmluZGV4T2YoJyAnKSA9PSAwKSB7XG4gICAgICBwb3MgPSAxO1xuICAgIH1cbiAgICBcbiAgICBzdHJpbmcgPSBzdHJpbmcuc2xpY2UocG9zKTtcbiAgICBcbiAgICBpZiAodW5pdHMgPT0gJ3NlbnRlbmNlcycpIHtcbiAgICAgIHN0cmluZyA9IHN0cmluZyArICcuJztcbiAgICB9XG4gIH0gIFxuICBcbiAgcmV0dXJuIHN0cmluZztcbn07XG5cbmZ1bmN0aW9uIHNpbXBsZVBsdXJhbGl6ZShzdHJpbmcpIHtcbiAgaWYgKHN0cmluZy5pbmRleE9mKCdzJywgc3RyaW5nLmxlbmd0aCAtIDEpID09PSAtMSkge1xuICAgIHJldHVybiBzdHJpbmcgKyAncyc7XG4gIH1cbiAgcmV0dXJuIHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0b3I7XG4iXX0=
