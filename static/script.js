// 4032 x 3024 

// -----------------------------------------------------------------------
// shared config with python
// -----------------------------------------------------------------------
const MONSTER_ID_PREFIX = 'monster'
const MONSTER_CLASS = 'monsterImg'

// -----------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------
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

function zeroFill2(n) {
	return ('00'+n).slice(-2);
}

function indexFromId(eid) {
	return parseInt(eid.replace(MONSTER_ID_PREFIX, ''));
}

function arrayContains(arr, elem) {
	return (arr.indexOf(elem) >= 0);
}

// -----------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------
let numImgs = document.getElementsByClassName(MONSTER_CLASS).length;
console.log('monster images available: ' + numImgs)
document.getElementById('numMonsters').innerHTML = numImgs;

// swap monster img on click
document.getElementById("pickMonster").onclick = function () { 
	// hide old img
	// TODO save idx to make sure we get a new one
	let visibleElems = document.getElementsByClassName('visible');
	console.log(visibleElems);
	// should be able to assume there is only 1 visible elem
	// at any given time but for robustness, this code also handles
	// the case where multiple are visible for some reason
	let prevIndexes = [];
	for (let i=0; i < visibleElems.length; i++) {
		let visElem = visibleElems[i];
		setElemVisible(visElem, false);
		prevIndexes.push(indexFromId(visElem.id));
	}
	console.log(prevIndexes);

	// pick a new img and make it visible
	let imgIdx = Math.floor(Math.random() * numImgs);

	// hacky way to avoid repeats, true randomness is not important
	if (arrayContains(prevIndexes, imgIdx)) {
		console.log('fix repeated idx')
		imgIdx = (imgIdx + 1) % numImgs;
	}
	 

	let elemId = MONSTER_ID_PREFIX + zeroFill2(imgIdx);
	console.log('looking for elem with id:' + elemId);
	let newImgElem = document.getElementById(elemId);
	setElemVisible(newImgElem, true);

	// DEV USE
	// display label for monster
	// let filename = newImgElem.src.replace(/^.*[\\/]/, '');
	// document.getElementById('monsterLabel').innerHTML = filename;
};
