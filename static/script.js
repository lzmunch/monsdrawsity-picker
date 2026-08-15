// 4032 x 3024 

/*
requirements for python code:
- elements have "monsterImg" class
- hidden/visible classes are defined
*/


var monsterIdPrefix = 'block'
var monsterClass = 'monsterImg '

// 36 images
// var numImgs = 3;
var numImgs = document.getElementsByClassName(monsterClass).length;
console.log('monster images available: ' + numImgs)


function setElemVisible(elem, visible) {
	if (visible) {
		console.log('showing ', elem.id);
		elem.classList.add('visible');
		elem.classList.remove('hidden');
	} else {
		console.log('hiding ', elem.id);
		elem.classList.add('hidden');
		elem.classList.remove('visible');
	}
}

// swap monster img on click
document.getElementById("pickMonster").onclick = function () { 
	// hide old img
	// TODO save idx to make sure we get a new one
	var visibleElems = document.getElementsByClassName('visible');
	console.log(visibleElems);
	for (let i=0; i < visibleElems.length; i++) {
		setElemVisible(visibleElems[i], false);
	}

	// pick a new img and make it visible
	var imgIdx = Math.floor(Math.random() * numImgs) + 1;
	var newImgElem = document.getElementById(monsterIdPrefix + String(imgIdx));
	setElemVisible(newImgElem, true);

	// display label for monster
	var filename = newImgElem.src.replace(/^.*[\\/]/, '');
	document.getElementById('monsterLabel').innerHTML = filename;
};
