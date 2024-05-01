const buildings = document.querySelectorAll('.scene__building');
const windows = document.querySelectorAll('.scene__window');
const scene = document.querySelector('.scene');
const secondScene = document.querySelector('.scene__second');
const trees = document.querySelectorAll('.forest__tree');
const sceneOne = document.querySelector('.scene__one');
const bulldozer = document.querySelector('.bulldozer__svg');
const patches = document.querySelectorAll('.forest__patch');
const leftPatchVal = document.querySelector('.forest__patch--left');
const parOne = document.querySelector('.scene__paragraph--one');
const headline = document.querySelector('.scene__headline');
let activeParOpacity = 0, forestPatchPosition = 0, paragraphOnePosition = 0;
let activeParagraph, secondSceneInitiation = false;

scene.removeChild(secondScene);

function InitiatesecondSceneCss() {
    //removes and appends second/city-scene
    scene[secondSceneInitiation ? 'append' : 'removeChild'](secondScene);
    sceneOne.classList[secondSceneInitiation ? 'add' : 'remove']('scene__one--dark');
    buildings.forEach(building => building.classList.toggle(building.id));
    //initiates windows: adds/removes name in classlist.
    windows.forEach(window => window.classList[secondSceneInitiation ? 'add' : 'remove'](window.getAttribute('data-windows')));
}

function sceneOnePhaseTwo(event) {
    !parOne.classList.contains('scene__paragraph--active') ? parOne.classList.add('scene__paragraph--active') : null;
    activeParagraph = document.querySelector('.scene__paragraph--active');
    //DONT modify below line: Very hard to figure out! Calculation value used in scss for paragraph opacity.
    activeParOpacity = ((((window.innerHeight / window.innerHeight * 100) - (activeParagraph.getBoundingClientRect().top / window.innerHeight * 100 + activeParagraph.getBoundingClientRect().height / window.innerHeight * 100)) / 120) * 2) * 2;
    //gives value to variables used in scssso position is done in css: To allow for scrolling without scrolling the webpage or having overflow
    event.deltaY < 0 ? paragraphOnePosition++ : paragraphOnePosition--;
    activeParagraph.style.setProperty('--paragraph-pos', `${paragraphOnePosition.toString() * 15}px`);
    activeParagraph.style.setProperty('--paragraph-opacity', `${activeParOpacity.toString()}`);
    headline.style.setProperty('--paragraph-opacity', [headline.getBoundingClientRect().top >= parOne.getBoundingClientRect().top ? 1 : 0]);
}

document.addEventListener('wheel', (event) => {
    const patchPosition = (forestPatchPosition = forestPatchPosition > 0 ? 0 : forestPatchPosition).toString() * 25;
    leftPatchVal.getBoundingClientRect().left < -10 ? (event.deltaY < 0 ? forestPatchPosition++ : forestPatchPosition--) : sceneOnePhaseTwo(event);
    //creating variables to be used in scss
    patches.forEach(patch => patch.style.setProperty('--patch-pos', `${patchPosition}px`));
    //calls function "InitiatesecondSceneCss" and sets "secondSceneInitiation" to false depending on paragraph one position
    ((parOne.getBoundingClientRect().top + parOne.getBoundingClientRect().height) / window.innerHeight * 100) > 0 && secondSceneInitiation === true ? (secondSceneInitiation = false) + InitiatesecondSceneCss() : null;
});

const paragraphObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.target.classList.contains('scene__paragraph') && !entry.isIntersecting && entry.target.getBoundingClientRect().top < 0) {
            bulldozer.classList.add('bulldozer__svg--active');
            trees.forEach(tree => tree.classList.add(tree.getAttribute('data-tree')));
        }
        (bulldozer.getBoundingClientRect().left / window.innerWidth) * 100 > 100 ? bulldozer.classList.remove('bulldozer__svg--active') +
            (parOne.getBoundingClientRect().top < 0 ? (secondSceneInitiation = true) + InitiatesecondSceneCss() : null) : null;
    });
},
    {
        root: null,
        rootMargin: '0px',
        threshold: 0
    });

paragraphObserver.observe(parOne);
paragraphObserver.observe(bulldozer);